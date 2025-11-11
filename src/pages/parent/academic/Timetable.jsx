import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar, Clock, User, Download, MapPin, Printer } from "lucide-react";

const Timetable = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedWeek, setSelectedWeek] = useState("current");

  // Mock data for timetables
  const timetables = {
    1: {
      // Sarah Johnson - JSS 2A
      name: "Sarah Johnson",
      class: "JSS 2A",
      schedule: {
        Monday: [
          {
            time: "08:00-08:40",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:40-09:20",
            subject: "Mathematics",
            teacher: "Mr. Adebayo",
            venue: "Class JSS2A",
          },
          {
            time: "09:20-10:00",
            subject: "English Language",
            teacher: "Mrs. Oluwaseun",
            venue: "Class JSS2A",
          },
          {
            time: "10:00-10:20",
            subject: "Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "10:20-11:00",
            subject: "Physics",
            teacher: "Dr. Emeka",
            venue: "Physics Lab",
          },
          {
            time: "11:00-11:40",
            subject: "Chemistry",
            teacher: "Mr. Taiwo",
            venue: "Chemistry Lab",
          },
          {
            time: "11:40-12:20",
            subject: "Biology",
            teacher: "Mrs. Kemi",
            venue: "Biology Lab",
          },
          {
            time: "12:20-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:40",
            subject: "Geography",
            teacher: "Mr. John",
            venue: "Class JSS2A",
          },
          {
            time: "13:40-14:20",
            subject: "Computer Studies",
            teacher: "Mrs. Bisi",
            venue: "ICT Lab",
          },
        ],
        Tuesday: [
          {
            time: "08:00-08:40",
            subject: "Morning Devotion",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:40-09:20",
            subject: "English Language",
            teacher: "Mrs. Oluwaseun",
            venue: "Class JSS2A",
          },
          {
            time: "09:20-10:00",
            subject: "Mathematics",
            teacher: "Mr. Adebayo",
            venue: "Class JSS2A",
          },
          {
            time: "10:00-10:20",
            subject: "Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "10:20-11:00",
            subject: "History",
            teacher: "Mr. Dayo",
            venue: "Class JSS2A",
          },
          {
            time: "11:00-11:40",
            subject: "Civic Education",
            teacher: "Mrs. Shade",
            venue: "Class JSS2A",
          },
          {
            time: "11:40-12:20",
            subject: "Fine Arts",
            teacher: "Mrs. Nike",
            venue: "Art Studio",
          },
          {
            time: "12:20-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:40",
            subject: "Physical Education",
            teacher: "Mr. Tunde",
            venue: "Sports Field",
          },
          {
            time: "13:40-14:20",
            subject: "Music",
            teacher: "Mrs. Lola",
            venue: "Music Room",
          },
        ],
        Wednesday: [
          {
            time: "08:00-08:40",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:40-09:20",
            subject: "Chemistry",
            teacher: "Mr. Taiwo",
            venue: "Chemistry Lab",
          },
          {
            time: "09:20-10:00",
            subject: "Physics",
            teacher: "Dr. Emeka",
            venue: "Physics Lab",
          },
          {
            time: "10:00-10:20",
            subject: "Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "10:20-11:00",
            subject: "Biology",
            teacher: "Mrs. Kemi",
            venue: "Biology Lab",
          },
          {
            time: "11:00-11:40",
            subject: "Mathematics",
            teacher: "Mr. Adebayo",
            venue: "Class JSS2A",
          },
          {
            time: "11:40-12:20",
            subject: "English Language",
            teacher: "Mrs. Oluwaseun",
            venue: "Class JSS2A",
          },
          {
            time: "12:20-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:40",
            subject: "French",
            teacher: "Mrs. Celine",
            venue: "Language Lab",
          },
          {
            time: "13:40-14:20",
            subject: "Library Period",
            teacher: "Mrs. Funke",
            venue: "Library",
          },
        ],
        Thursday: [
          {
            time: "08:00-08:40",
            subject: "Morning Devotion",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:40-09:20",
            subject: "Mathematics",
            teacher: "Mr. Adebayo",
            venue: "Class JSS2A",
          },
          {
            time: "09:20-10:00",
            subject: "Geography",
            teacher: "Mr. John",
            venue: "Class JSS2A",
          },
          {
            time: "10:00-10:20",
            subject: "Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "10:20-11:00",
            subject: "English Language",
            teacher: "Mrs. Oluwaseun",
            venue: "Class JSS2A",
          },
          {
            time: "11:00-11:40",
            subject: "Computer Studies",
            teacher: "Mrs. Bisi",
            venue: "ICT Lab",
          },
          {
            time: "11:40-12:20",
            subject: "Agricultural Science",
            teacher: "Mr. Wale",
            venue: "Farm Site",
          },
          {
            time: "12:20-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:40",
            subject: "Home Economics",
            teacher: "Mrs. Remi",
            venue: "Home Econ Lab",
          },
          {
            time: "13:40-14:20",
            subject: "Study Period",
            teacher: "Class Teacher",
            venue: "Class JSS2A",
          },
        ],
        Friday: [
          {
            time: "08:00-08:40",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:40-09:20",
            subject: "Religious Studies",
            teacher: "Rev. Peter",
            venue: "Class JSS2A",
          },
          {
            time: "09:20-10:00",
            subject: "Mathematics",
            teacher: "Mr. Adebayo",
            venue: "Class JSS2A",
          },
          {
            time: "10:00-10:20",
            subject: "Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "10:20-11:00",
            subject: "English Language",
            teacher: "Mrs. Oluwaseun",
            venue: "Class JSS2A",
          },
          {
            time: "11:00-11:40",
            subject: "Business Studies",
            teacher: "Mr. Kola",
            venue: "Class JSS2A",
          },
          {
            time: "11:40-12:20",
            subject: "Yoruba Language",
            teacher: "Mrs. Ayo",
            venue: "Class JSS2A",
          },
          {
            time: "12:20-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:40",
            subject: "Social Studies",
            teacher: "Mr. Gbenga",
            venue: "Class JSS2A",
          },
          {
            time: "13:40-14:20",
            subject: "Games/Sports",
            teacher: "Mr. Tunde",
            venue: "Sports Field",
          },
        ],
      },
    },
    2: {
      // Michael Johnson - Primary 5B
      name: "Michael Johnson",
      class: "Primary 5B",
      schedule: {
        Monday: [
          {
            time: "08:00-08:30",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:30-09:15",
            subject: "Mathematics",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "09:15-10:00",
            subject: "English Language",
            teacher: "Mr. Segun",
            venue: "Class Primary 5B",
          },
          {
            time: "10:00-10:15",
            subject: "Break",
            teacher: "",
            venue: "Playground",
          },
          {
            time: "10:15-11:00",
            subject: "Basic Science",
            teacher: "Mrs. Bola",
            venue: "Science Corner",
          },
          {
            time: "11:00-11:45",
            subject: "Social Studies",
            teacher: "Mr. Ade",
            venue: "Class Primary 5B",
          },
          {
            time: "11:45-12:30",
            subject: "Yoruba Language",
            teacher: "Mrs. Kike",
            venue: "Class Primary 5B",
          },
          {
            time: "12:30-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:45",
            subject: "Creative Arts",
            teacher: "Mrs. Nike",
            venue: "Art Room",
          },
          {
            time: "13:45-14:30",
            subject: "Physical Education",
            teacher: "Mr. Tunde",
            venue: "Sports Field",
          },
        ],
        Tuesday: [
          {
            time: "08:00-08:30",
            subject: "Morning Devotion",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:30-09:15",
            subject: "English Language",
            teacher: "Mr. Segun",
            venue: "Class Primary 5B",
          },
          {
            time: "09:15-10:00",
            subject: "Mathematics",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "10:00-10:15",
            subject: "Break",
            teacher: "",
            venue: "Playground",
          },
          {
            time: "10:15-11:00",
            subject: "Computer Studies",
            teacher: "Mr. Tobi",
            venue: "Computer Lab",
          },
          {
            time: "11:00-11:45",
            subject: "Religious Studies",
            teacher: "Mrs. Grace",
            venue: "Class Primary 5B",
          },
          {
            time: "11:45-12:30",
            subject: "Handwriting",
            teacher: "Mrs. Yemi",
            venue: "Class Primary 5B",
          },
          {
            time: "12:30-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:45",
            subject: "Music",
            teacher: "Mrs. Lola",
            venue: "Music Room",
          },
          {
            time: "13:45-14:30",
            subject: "Library Time",
            teacher: "Mrs. Funke",
            venue: "Library",
          },
        ],
        Wednesday: [
          {
            time: "08:00-08:30",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:30-09:15",
            subject: "Basic Science",
            teacher: "Mrs. Bola",
            venue: "Science Corner",
          },
          {
            time: "09:15-10:00",
            subject: "Mathematics",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "10:00-10:15",
            subject: "Break",
            teacher: "",
            venue: "Playground",
          },
          {
            time: "10:15-11:00",
            subject: "English Language",
            teacher: "Mr. Segun",
            venue: "Class Primary 5B",
          },
          {
            time: "11:00-11:45",
            subject: "Social Studies",
            teacher: "Mr. Ade",
            venue: "Class Primary 5B",
          },
          {
            time: "11:45-12:30",
            subject: "Agricultural Science",
            teacher: "Mr. Wale",
            venue: "School Garden",
          },
          {
            time: "12:30-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:45",
            subject: "French",
            teacher: "Mrs. Celine",
            venue: "Class Primary 5B",
          },
          {
            time: "13:45-14:30",
            subject: "Games",
            teacher: "Mr. Tunde",
            venue: "Sports Field",
          },
        ],
        Thursday: [
          {
            time: "08:00-08:30",
            subject: "Morning Devotion",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:30-09:15",
            subject: "Mathematics",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "09:15-10:00",
            subject: "Phonics",
            teacher: "Mrs. Bukky",
            venue: "Class Primary 5B",
          },
          {
            time: "10:00-10:15",
            subject: "Break",
            teacher: "",
            venue: "Playground",
          },
          {
            time: "10:15-11:00",
            subject: "Creative Arts",
            teacher: "Mrs. Nike",
            venue: "Art Room",
          },
          {
            time: "11:00-11:45",
            subject: "Quantitative Reasoning",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "11:45-12:30",
            subject: "Verbal Reasoning",
            teacher: "Mr. Segun",
            venue: "Class Primary 5B",
          },
          {
            time: "12:30-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:45",
            subject: "Home Economics",
            teacher: "Mrs. Remi",
            venue: "Home Econ Room",
          },
          {
            time: "13:45-14:30",
            subject: "Study Period",
            teacher: "Class Teacher",
            venue: "Class Primary 5B",
          },
        ],
        Friday: [
          {
            time: "08:00-08:30",
            subject: "Morning Assembly",
            teacher: "All Staff",
            venue: "School Hall",
          },
          {
            time: "08:30-09:15",
            subject: "Religious Studies",
            teacher: "Mrs. Grace",
            venue: "Class Primary 5B",
          },
          {
            time: "09:15-10:00",
            subject: "English Language",
            teacher: "Mr. Segun",
            venue: "Class Primary 5B",
          },
          {
            time: "10:00-10:15",
            subject: "Break",
            teacher: "",
            venue: "Playground",
          },
          {
            time: "10:15-11:00",
            subject: "Mathematics",
            teacher: "Mrs. Funmi",
            venue: "Class Primary 5B",
          },
          {
            time: "11:00-11:45",
            subject: "Yoruba Language",
            teacher: "Mrs. Kike",
            venue: "Class Primary 5B",
          },
          {
            time: "11:45-12:30",
            subject: "Cultural Arts",
            teacher: "Mrs. Deola",
            venue: "Cultural Hall",
          },
          {
            time: "12:30-13:00",
            subject: "Lunch Break",
            teacher: "",
            venue: "Cafeteria",
          },
          {
            time: "13:00-13:45",
            subject: "Swimming",
            teacher: "Coach John",
            venue: "Swimming Pool",
          },
          {
            time: "13:45-14:30",
            subject: "Free Play",
            teacher: "All Staff",
            venue: "Playground",
          },
        ],
      },
    },
  };

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const weekOptions = [
    { value: "current", label: "Current Week" },
    { value: "next", label: "Next Week" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const selectedChildData = timetables[selectedChild];

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-800",
      "English Language": "bg-green-100 text-green-800",
      Physics: "bg-purple-100 text-purple-800",
      Chemistry: "bg-red-100 text-red-800",
      Biology: "bg-emerald-100 text-emerald-800",
      "Basic Science": "bg-teal-100 text-teal-800",
      "Social Studies": "bg-orange-100 text-orange-800",
      "Computer Studies": "bg-indigo-100 text-indigo-800",
      "Physical Education": "bg-pink-100 text-pink-800",
      "Creative Arts": "bg-purple-100 text-purple-800",
      Music: "bg-yellow-100 text-yellow-800",
      Break: "bg-gray-100 text-gray-800",
      "Lunch Break": "bg-gray-100 text-gray-800",
      "Morning Assembly": "bg-blue-100 text-blue-800",
      "Morning Devotion": "bg-blue-100 text-blue-800",
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Timetable</h1>
          <p className="text-gray-600 mt-1">
            View your child&apos;s weekly class schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Child</label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your child" />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {child.name} - {child.class}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Week</label>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger>
              <SelectValue placeholder="Choose week" />
            </SelectTrigger>
            <SelectContent>
              {weekOptions.map((week) => (
                <SelectItem key={week.value} value={week.value}>
                  {week.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && (
        <>
          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedChildData.name} - {selectedChildData.class}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Timetable Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-1 min-w-[800px]">
                  {/* Header row */}
                  <div className="font-bold p-3 bg-gray-100 text-center">
                    Time
                  </div>
                  {days.map((day) => (
                    <div
                      key={day}
                      className="font-bold p-3 bg-gray-100 text-center"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Generate rows for each time slot */}
                  {selectedChildData.schedule.Monday.map((slot, index) => (
                    <div key={index}>
                      <div className="p-2 text-sm font-medium bg-gray-50 text-center border">
                        {slot.time}
                      </div>
                      {days.map((day) => {
                        const daySchedule = selectedChildData.schedule[day];
                        const currentSlot = daySchedule[index];
                        return (
                          <div
                            key={`${day}-${index}`}
                            className="p-2 border min-h-[80px]"
                          >
                            {currentSlot && (
                              <div
                                className={`p-2 rounded-lg h-full ${getSubjectColor(
                                  currentSlot.subject
                                )}`}
                              >
                                <div className="font-semibold text-sm mb-1">
                                  {currentSlot.subject}
                                </div>
                                {currentSlot.teacher && (
                                  <div className="text-xs flex items-center gap-1 mb-1">
                                    <User className="h-3 w-3" />
                                    {currentSlot.teacher}
                                  </div>
                                )}
                                {currentSlot.venue && (
                                  <div className="text-xs flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {currentSlot.venue}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedChildData.schedule.Monday.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {slot.time}
                      </div>
                      <div>
                        <h4 className="font-semibold">{slot.subject}</h4>
                        {slot.teacher && (
                          <p className="text-sm text-gray-600">
                            {slot.teacher} • {slot.venue}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getSubjectColor(
                        slot.subject
                      )}`}
                    >
                      {slot.subject === "Break" ||
                      slot.subject === "Lunch Break"
                        ? "Break"
                        : "Class"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Timetable;
