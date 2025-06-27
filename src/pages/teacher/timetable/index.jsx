import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import { useToast } from '../../../components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  Plus,
  Trash,
  Check,
  X,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { Badge } from '../../../components/ui/badge';

// Define types for our timetable data
//type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

// interface TimeTableEvent {
//   id: string;
//   day: Day;
//   startTime: string;
//   endTime: string;
//   subject: string;
//   class: string;
//   section: string;
//   room: string;
// }

// Sample timetable data
const timetableData = [
  {
    id: '1',
    day: "Monday",
    startTime: '08:00',
    endTime: '09:00',
    subject: 'Mathematics',
    class: 'Class 10',
    section: 'A',
    room: 'Room 101',
  },
  {
    id: '2',
    day: "Monday",
    startTime: '09:15',
    endTime: '10:15',
    subject: 'Physics',
    class: 'Class 11',
    section: 'B',
    room: 'Lab 2',
  },
  {
    id: '3',
    day: "Tuesday",
    startTime: '10:30',
    endTime: '11:30',
    subject: 'Chemistry',
    class: 'Class 10',
    section: 'A',
    room: 'Lab 1',
  },
  {
    id: '4',
    day: "Wednesday",
    startTime: '13:00',
    endTime: '14:00',
    subject: 'Biology',
    class: 'Class 12',
    section: 'C',
    room: 'Lab 3',
  },
  {
    id: '5',
    day: "Thursday",
    startTime: '08:00',
    endTime: '09:00',
    subject: 'English',
    class: 'Class 9',
    section: 'D',
    room: 'Room 105',
  },
  {
    id: '6',
    day: "Friday",
    startTime: '14:15',
    endTime: '15:15',
    subject: 'History',
    class: 'Class 11',
    section: 'A',
    room: 'Room 202',
  },
  {
    id: '7',
    day: "Saturday",
    startTime: '10:30',
    endTime: '11:30',
    subject: 'Computer Science',
    class: 'Class 12',
    section: 'B',
    room: 'Computer Lab',
  },
];

const TeacherTimetable = () => {
  const [activeTab, setActiveTab] = useState("Monday");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    day: "Monday",
    startTime: '',
    endTime: '',
    subject: '',
    class: '',
    section: '',
    room: '',
  });
  const { toast } = useToast();

  // Filter timetable data by day
  const filteredTimetable = timetableData.filter((event) => event.day === activeTab);

  const handleAddEvent = () => {
    // Validation
    if (
      !newEvent.day ||
      !newEvent.startTime ||
      !newEvent.endTime ||
      !newEvent.subject ||
      !newEvent.class ||
      !newEvent.section ||
      !newEvent.room
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Here you'd typically send the data to your API
    console.log('Adding new event:', newEvent);
    toast({
      title: 'Success',
      description: 'Timetable event added successfully',
    });

    // Reset form and close dialog
    setNewEvent({
      day: "Monday",
      startTime: '',
      endTime: '',
      subject: '',
      class: '',
      section: '',
      room: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditEvent = () => {
    if (!selectedEvent) return;

    // Validation
    if (
      !selectedEvent.day ||
      !selectedEvent.startTime ||
      !selectedEvent.endTime ||
      !selectedEvent.subject ||
      !selectedEvent.class ||
      !selectedEvent.section ||
      !selectedEvent.room
    ) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Here you'd typically send the data to your API
    console.log('Editing event:', selectedEvent);
    toast({
      title: 'Success',
      description: 'Timetable event updated successfully',
    });

    // Reset and close dialog
    setSelectedEvent(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    // Here you'd typically send the data to your API
    console.log('Deleting event:', selectedEvent.id);
    toast({
      title: 'Success',
      description: 'Timetable event deleted successfully',
    });

    // Reset and close dialog
    setSelectedEvent(null);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (event) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Timetable</h1>
          <p className="text-muted-foreground">
            Manage your weekly teaching schedule
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Timetable Event</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new class/event in your timetable.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">
                    Day
                  </Label>
                  <Select
                    value={newEvent.day}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, day: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                      <SelectItem value="Saturday">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={newEvent.subject}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, subject: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Class
                  </Label>
                  <Input
                    id="class"
                    value={newEvent.class}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, class: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section" className="text-right">
                    Section
                  </Label>
                  <Input
                    id="section"
                    value={newEvent.section}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, section: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Input
                    id="room"
                    value={newEvent.room}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, room: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddEvent}>
                  Save Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="Monday" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="Monday">Monday</TabsTrigger>
          <TabsTrigger value="Tuesday">Tuesday</TabsTrigger>
          <TabsTrigger value="Wednesday">Wednesday</TabsTrigger>
          <TabsTrigger value="Thursday">Thursday</TabsTrigger>
          <TabsTrigger value="Friday">Friday</TabsTrigger>
          <TabsTrigger value="Saturday">Saturday</TabsTrigger>
        </TabsList>

        {/* Content for all days - same layout but different data */}
        {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]).map(
          (day) => (
            <TabsContent key={day} value={day} className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{day}'s Schedule</CardTitle>
                  <CardDescription>
                    Your teaching schedule for {day}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredTimetable.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">
                        No classes scheduled for {day}.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setNewEvent({ ...newEvent, day });
                          setIsAddDialogOpen(true);
                        }}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Class
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTimetable
                            .sort((a, b) => a.startTime.localeCompare(b.startTime))
                            .map((event) => (
                              <TableRow key={event.id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {event.startTime} - {event.endTime}
                                  </div>
                                </TableCell>
                                <TableCell>{event.subject}</TableCell>
                                <TableCell>{event.class}</TableCell>
                                <TableCell>{event.section}</TableCell>
                                <TableCell>{event.room}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openEditDialog(event)}
                                          >
                                            <Edit size={16} />
                                            <span className="sr-only">Edit</span>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Edit event</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => openDeleteDialog(event)}
                                          >
                                            <Trash size={16} />
                                            <span className="sr-only">Delete</span>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Delete event</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )
        )}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Timetable Event</DialogTitle>
            <DialogDescription>
              Update the details for this class/event in your timetable.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editDay" className="text-right">
                  Day
                </Label>
                <Select
                  value={selectedEvent.day}
                  onValueChange={(value) =>
                    setSelectedEvent({ ...selectedEvent, day: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editStartTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="editStartTime"
                  type="time"
                  value={selectedEvent.startTime}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      startTime: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editEndTime" className="text-right">
                  End Time
                </Label>
                <Input
                  id="editEndTime"
                  type="time"
                  value={selectedEvent.endTime}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      endTime: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editSubject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="editSubject"
                  value={selectedEvent.subject}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      subject: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editClass" className="text-right">
                  Class
                </Label>
                <Input
                  id="editClass"
                  value={selectedEvent.class}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      class: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editSection" className="text-right">
                  Section
                </Label>
                <Input
                  id="editSection"
                  value={selectedEvent.section}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      section: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editRoom" className="text-right">
                  Room
                </Label>
                <Input
                  id="editRoom"
                  value={selectedEvent.room}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      room: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleEditEvent}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this timetable event? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="py-4">
              <p className="mb-2">
                <strong>Day:</strong> {selectedEvent.day}
              </p>
              <p className="mb-2">
                <strong>Time:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p className="mb-2">
                <strong>Subject:</strong> {selectedEvent.subject}
              </p>
              <p className="mb-2">
                <strong>Class:</strong> {selectedEvent.class} {selectedEvent.section}
              </p>
              <p className="mb-2">
                <strong>Room:</strong> {selectedEvent.room}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteEvent}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherTimetable;
