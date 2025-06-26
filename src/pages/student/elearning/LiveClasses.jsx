import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '../../components/ui/card';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useForm } from 'react-hook-form';
import { Video, Play, Clock, User, Calendar } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table';

const ELearning = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      class: '',
      section: '',
      rollNumber: ''
    }
  });

  const [showClasses, setShowClasses] = useState(false);

  const liveClasses = [
    {
      id: '1',
      subject: 'Mathematics',
      teacher: 'Mr. Johnson',
      startTime: '2025-04-25T09:30:00',
      endTime: '2025-04-25T10:30:00',
      duration: '1 hour',
      link: 'https://meet.eduos.com/math-class',
      status: 'upcoming'
    },
    {
      id: '2',
      subject: 'Science',
      teacher: 'Mrs. Williams',
      startTime: '2025-04-25T11:00:00',
      endTime: '2025-04-25T12:00:00',
      duration: '1 hour',
      link: 'https://meet.eduos.com/science-class',
      status: 'live'
    },
    {
      id: '3',
      subject: 'English',
      teacher: 'Ms. Davis',
      startTime: '2025-04-25T13:30:00',
      endTime: '2025-04-25T14:30:00',
      duration: '1 hour',
      link: 'https://meet.eduos.com/english-class',
      status: 'upcoming'
    },
    {
      id: '4',
      subject: 'History',
      teacher: 'Mr. Brown',
      startTime: '2025-04-25T08:00:00',
      endTime: '2025-04-25T09:00:00',
      duration: '1 hour',
      link: 'https://meet.eduos.com/history-class',
      status: 'completed'
    }
  ];

  const onSubmit = (data) => {
    console.log(data);
    setShowClasses(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'live':
        return <Badge className="bg-green-500">Live Now</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Video className="h-6 w-6 text-eduos-primary" />
        <h1 className="text-2xl font-bold">E-Learning Live Classes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Your Live Classes</CardTitle>
          <CardDescription>
            Enter your details to view your scheduled live classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rollNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your roll number" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="primary1">Primary 1</SelectItem>
                          <SelectItem value="primary2">Primary 2</SelectItem>
                          <SelectItem value="primary3">Primary 3</SelectItem>
                          <SelectItem value="primary4">Primary 4</SelectItem>
                          <SelectItem value="primary5">Primary 5</SelectItem>
                          <SelectItem value="primary6">Primary 6</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="mt-2 bg-eduos-primary hover:bg-eduos-secondary"
              >
                Find Classes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showClasses && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold">Your Live Classes</h2>

          {liveClasses.filter(cls => cls.status === 'live').length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {liveClasses
                .filter(cls => cls.status === 'live')
                .map(liveClass => (
                  <Card key={liveClass.id} className="border-l-4 border-l-green-500">
                    <CardHeader className="bg-green-50 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{liveClass.subject}</CardTitle>
                        {getStatusBadge(liveClass.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{liveClass.teacher}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{liveClass.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(liveClass.startTime)} - {formatDate(liveClass.endTime)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t">
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Join Live Class
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No live classes currently in session.</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming & Past Classes</h2>

            <Table>
              <TableHeader>
                <TableRow className="bg-eduos-primary text-white">
                  <TableHead className="text-white">Subject</TableHead>
                  <TableHead className="text-white">Teacher</TableHead>
                  <TableHead className="text-white">Time</TableHead>
                  <TableHead className="text-white">Duration</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveClasses
                  .filter(cls => cls.status !== 'live')
                  .map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.subject}</TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell>{formatDate(cls.startTime)}</TableCell>
                      <TableCell>{cls.duration}</TableCell>
                      <TableCell>{getStatusBadge(cls.status)}</TableCell>
                      <TableCell>
                        {cls.status === 'upcoming' ? (
                          <Button variant="outline" size="sm" className="text-blue-500">
                            Set Reminder
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled={cls.status === 'completed'}>
                            {cls.status === 'completed' ? 'Ended' : 'Join'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ELearning;
