
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Clock } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';

export const TodayAttendance = ({ todayRecord }) => {
  // Helper function for attendance status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-500">Late</Badge>;
      case 'leave':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">On Leave</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle check-in
  const handleCheckIn = () => {
    // Here you would typically send the data to your API
    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);
    
    console.log(`Checking in at ${formattedTime}`);
    toast.success(`You have successfully checked in at ${formattedTime}`);
  };
  
  // Handle check-out
  const handleCheckOut = () => {
    // Here you would typically send the data to your API
    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);
    
    console.log(`Checking out at ${formattedTime}`);
    toast.success(`You have successfully checked out at ${formattedTime}`);
  };

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center text-center p-6 border rounded-md">
          <Clock size={48} className="text-eduos-primary mb-3" />
          <div className="text-3xl font-bold" id="current-time">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          
          {todayRecord ? (
            <div className="w-full space-y-4">
              {getStatusBadge(todayRecord.status)}
              
              {todayRecord.status === 'present' || todayRecord.status === 'late' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-sm text-gray-500">Check-in</div>
                    <div className="font-medium">{todayRecord.checkInTime}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-center">
                    <div className="text-sm text-gray-500">Check-out</div>
                    <div className="font-medium">{todayRecord.checkOutTime || '—'}</div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">Reason</div>
                  <div className="font-medium">{todayRecord.reason}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full space-y-4">
              <Button onClick={handleCheckIn} className="w-full">Check In</Button>
              <Button onClick={handleCheckOut} className="w-full" variant="outline">Check Out</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
