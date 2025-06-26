
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { 
  X,
  CalendarDays,
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '../../../components/ui/calendar';

// Sample leave data
const leaveApplications = [
  {
    id: '1',
    teacherId: 'T001',
    startDate: '2025-05-05',
    endDate: '2025-05-06',
    leaveType: 'sick',
    reason: 'Medical appointment',
    status: 'approved',
    appliedOn: '2025-05-01',
    approvedBy: 'Principal',
    approvedOn: '2025-05-02',
  },
  {
    id: '2',
    teacherId: 'T001',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    leaveType: 'casual',
    reason: 'Family function',
    status: 'approved',
    appliedOn: '2025-04-10',
    approvedBy: 'Vice Principal',
    approvedOn: '2025-04-11',
  },
  {
    id: '3',
    teacherId: 'T001',
    startDate: '2025-05-20',
    endDate: '2025-05-21',
    leaveType: 'casual',
    reason: 'Personal work',
    status: 'pending',
    appliedOn: '2025-05-15',
  },
  {
    id: '4',
    teacherId: 'T001',
    startDate: '2025-03-10',
    endDate: '2025-03-12',
    leaveType: 'emergency',
    reason: 'Family emergency',
    status: 'rejected',
    appliedOn: '2025-03-09',
  },
];

const TeacherLeaveManagement = () => {
  const [selectedTab, setSelectedTab] = useState<'apply' | 'history'>('history');
  const [leaveType, setLeaveType] = useState<'sick' | 'casual' | 'emergency' | 'other'>('casual');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reason, setReason] = useState('');
  
  // Handle leave application submission
  const handleSubmitLeaveApplication = (e) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Here you would typically send the data to your API
    console.log({
      leaveType,
      startDate,
      endDate,
      reason
    });
    
    toast.success('Leave application submitted successfully');
    
    // Reset form fields
    setLeaveType(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setReason('');
    
    // Switch to history tab
    setSelectedTab('history');
  };
  
  // Format the date string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get leave type display text
  const getLeaveTypeText = (type) => {
    switch (type) {
      case 'sick':
        return 'Sick Leave';
      case 'casual':
        return 'Casual Leave';
      case 'emergency':
        return 'Emergency Leave';
      default:
        return 'Other Leave';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">View your leave history and apply for new leaves</p>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200 mb-4">
        <Button 
          variant={selectedTab === 'history' ? 'default' : 'ghost'}
          className={`rounded-none ${selectedTab === 'history' ? '' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('history')}
        >
          Leave History
        </Button>
        <Button 
          variant={selectedTab === 'apply' ? 'default' : 'ghost'}
          className={`rounded-none ${selectedTab === 'apply' ? '' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('apply')}
        >
          Apply For Leave
        </Button>
      </div>
      
      {selectedTab === 'apply' ? (
        <Card>
          <CardHeader>
            <CardTitle>New Leave Application</CardTitle>
            <CardDescription>Fill out the form below to submit a new leave request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitLeaveApplication} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Leave Type</label>
                  <Select value={leaveType} onValueChange={(value) => setLeaveType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="emergency">Emergency Leave</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Leave</label>
                <Textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide details for your leave application"
                  rows={4}
                />
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> Leave applications are subject to approval by the administration. 
                  Please submit your request at least 2 days in advance for proper arrangements.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedTab('history')}>Cancel</Button>
            <Button onClick={handleSubmitLeaveApplication}>Submit Application</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveApplications.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <div className="font-medium">{formatDate(leave.startDate)}</div>
                        {leave.startDate !== leave.endDate && (
                          <div className="text-xs text-gray-500">to {formatDate(leave.endDate)}</div>
                        )}
                      </TableCell>
                      <TableCell>{getLeaveTypeText(leave.leaveType)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                      <TableCell>{formatDate(leave.appliedOn)}</TableCell>
                      <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={leave.status !== 'pending'}>
                          {leave.status === 'pending' ? <X className="h-4 w-4" /> : null}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
          <CardDescription>Your current leave entitlements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <div className="text-sm text-green-600">Casual Leave</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-green-700">8</span>
                <span className="text-sm text-green-500 ml-1">/ 12</span>
              </div>
              <div className="text-xs text-green-500 mt-1">4 days used</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="text-sm text-blue-600">Sick Leave</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-blue-700">10</span>
                <span className="text-sm text-blue-500 ml-1">/ 12</span>
              </div>
              <div className="text-xs text-blue-500 mt-1">2 days used</div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
              <div className="text-sm text-amber-600">Emergency Leave</div>
              <div className="text-2xl font-bold mt-1">
                <span className="text-amber-700">2</span>
                <span className="text-sm text-amber-500 ml-1">/ 3</span>
              </div>
              <div className="text-xs text-amber-500 mt-1">1 day used</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherLeaveManagement;
