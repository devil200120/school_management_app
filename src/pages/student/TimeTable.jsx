import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  Calendar,
  Clock,
  Download,
  BookOpen,
  User,
  MapPin,
  Bell,
  FilterX
} from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const sampleTimetable = [
  { period: 1, day: "Monday", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
  { period: 2, day: "Monday", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab 2" },
  { period: 3, day: "Monday", subject: "English Literature", teacher: "Emma Williams", room: "Room 105" },
  { period: 4, day: "Monday", subject: "Computer Science", teacher: "Jake Thompson", room: "IT Lab" },
  { period: 5, day: "Monday", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab 1" },
  { period: 1, day: "Tuesday", subject: "Biology", teacher: "Dr. Lisa Green", room: "Lab 3" },
  { period: 2, day: "Tuesday", subject: "History", teacher: "Prof. Robert Adams", room: "Room 202" },
  { period: 3, day: "Tuesday", subject: "Geography", teacher: "Morgan Stanley", room: "Room 204" },
  { period: 4, day: "Tuesday", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
  { period: 5, day: "Tuesday", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab 2" },
  { period: 1, day: "Wednesday", subject: "Computer Science", teacher: "Jake Thompson", room: "IT Lab" },
  { period: 2, day: "Wednesday", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab 1" },
  { period: 3, day: "Wednesday", subject: "English Literature", teacher: "Emma Williams", room: "Room 105" },
  { period: 4, day: "Wednesday", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
  { period: 5, day: "Wednesday", subject: "Biology", teacher: "Dr. Lisa Green", room: "Lab 3" },
  { period: 1, day: "Thursday", subject: "Physics", teacher: "Prof. Michael Chen", room: "Lab 2" },
  { period: 2, day: "Thursday", subject: "Geography", teacher: "Morgan Stanley", room: "Room 204" },
  { period: 3, day: "Thursday", subject: "History", teacher: "Prof. Robert Adams", room: "Room 202" },
  { period: 4, day: "Thursday", subject: "Computer Science", teacher: "Jake Thompson", room: "IT Lab" },
  { period: 5, day: "Thursday", subject: "Chemistry", teacher: "Dr. James Wilson", room: "Lab 1" },
  { period: 1, day: "Friday", subject: "Mathematics", teacher: "Dr. Sarah Johnson", room: "Room 101" },
  { period: 2, day: "Friday", subject: "English Literature", teacher: "Emma Williams", room: "Room 105" },
  { period: 3, day: "Friday", subject: "Biology", teacher: "Dr. Lisa Green", room: "Lab 3" },
  { period: 4, day: "Friday", subject: "History", teacher: "Prof. Robert Adams", room: "Room 202" },
  { period: 5, day: "Friday", subject: "Geography", teacher: "Morgan Stanley", room: "Room 204" }
];

const subjects = Array.from(new Set(sampleTimetable.map(entry => entry.subject)));
const teachers = Array.from(new Set(sampleTimetable.map(entry => entry.teacher)));

const TimeTable = () => {
  const [view, setView] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [teacherFilter, setTeacherFilter] = useState('all');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const tableContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const tableRow = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const cardHover = {
    rest: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.12)" },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const filteredTimetable = sampleTimetable.filter(entry => {
    if (view === 'daily' && entry.day !== selectedDay) return false;
    if (subjectFilter !== 'all' && entry.subject !== subjectFilter) return false;
    if (teacherFilter !== 'all' && entry.teacher !== teacherFilter) return false;
    return true;
  });

  const handleResetFilters = () => {
    setSubjectFilter('all');
    setTeacherFilter('all');
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent mb-1">
            Class Timetable
          </h1>
          <p className="text-gray-500">View your weekly and daily class schedule</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-eduos-primary hover:bg-eduos-secondary flex items-center gap-2">
            <Bell className="h-4 w-4" /> Set Reminders
          </Button>
        </div>
      </div>
      
      <Card className="shadow-md border-blue-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex flex-col lg:flex-row justify-between gap-0 items-center">
            <div>
              <CardTitle className="flex items-center text-eduos-primary">
                <Calendar className="mr-2 h-5 w-5" />
                Class Schedule
              </CardTitle>
              <CardDescription>
                Your weekly class timetable for current semester
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-0 w-full lg:w-auto">
              <div className="flex gap-0 flex-wrap">
                <Select value={view} onValueChange={(value) => setView(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly View</SelectItem>
                    <SelectItem value="daily">Daily View</SelectItem>
                  </SelectContent>
                </Select>
                
                {view === 'daily' && (
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {weekdays.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={teacherFilter} onValueChange={setTeacherFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teachers</SelectItem>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="ghost" onClick={handleResetFilters} className="flex items-center gap-1">
                  <FilterX className="h-4 w-4" /> Clear
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          {view === 'weekly' ? (
            <div className="overflow-x-auto">
              <motion.table 
                className="w-full border-collapse"
                variants={tableContainer}
              >
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Period</th>
                    {weekdays.map(day => (
                      <th key={day} className="p-3 text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }, (_, i) => i + 1).map(period => (
                    <motion.tr 
                      key={period}
                      className="border-b"
                      variants={tableRow}
                    >
                      <td className="p-3 text-left font-medium text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-eduos-primary" />
                          Period {period}
                        </div>
                        <div className="text-xs text-gray-500">
                          {period === 1 ? '8:00 - 9:00 AM' :
                           period === 2 ? '9:15 - 10:15 AM' :
                           period === 3 ? '10:30 - 11:30 AM' :
                           period === 4 ? '12:00 - 1:00 PM' :
                           '1:15 - 2:15 PM'}
                        </div>
                      </td>
                      {weekdays.map(day => {
                        const classEntry = sampleTimetable.find(
                          entry => entry.day === day && entry.period === period &&
                          (subjectFilter === 'all' || entry.subject === subjectFilter) &&
                          (teacherFilter === 'all' || entry.teacher === teacherFilter)
                        );
                        
                        return (
                          <td key={day} className="p-2">
                            {classEntry ? (
                              <motion.div
                                className="p-2 rounded-lg bg-white border"
                                initial="rest"
                                whileHover="hover"
                                variants={cardHover}
                              >
                                <div className="font-medium text-eduos-primary">{classEntry.subject}</div>
                                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{classEntry.teacher.split(' ').pop()}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{classEntry.room}</span>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                                No Class
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDay}
                className="grid gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-medium text-eduos-primary mb-2">{selectedDay}'s Schedule</h3>
                
                {filteredTimetable.length > 0 ? (
                  filteredTimetable
                    .filter(entry => entry.day === selectedDay)
                    .sort((a, b) => a.period - b.period)
                    .map((entry, index) => (
                      <motion.div
                        key={`${entry.day}-${entry.period}`}
                        className="bg-white rounded-lg border p-4 flex items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.1 }
                        }}
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-eduos-light text-eduos-primary rounded-full w-12 h-12 flex items-center justify-center font-bold">
                            P{entry.period}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-lg flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-eduos-primary" />
                              {entry.subject}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 text-gray-500" />
                                <span>{entry.teacher}</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{entry.room}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-gray-500">
                            {entry.period === 1 ? '8:00 - 9:00 AM' :
                             entry.period === 2 ? '9:15 - 10:15 AM' :
                             entry.period === 3 ? '10:30 - 11:30 AM' :
                             entry.period === 4 ? '12:00 - 1:00 PM' :
                             '1:15 - 2:15 PM'}
                          </div>
                          <Badge className="mt-1 bg-eduos-primary">Current</Badge>
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-lg">No classes match your filter criteria</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={handleResetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TimeTable;
