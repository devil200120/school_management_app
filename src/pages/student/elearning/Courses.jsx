import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  BookOpen,
  Clock,
  DollarSign,
  Filter,
  Search,
  Star,
  TrendingUp,
  Calendar,
  Bookmark,
  FileText,
  MonitorPlay,
  Users
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { toast } from '../../hooks/use-toast';

// Courses array here...

const categories = Array.from(
  courses.reduce((acc, course) => {
    const existingCategory = acc.get(course.category);
    acc.set(course.category, existingCategory ? existingCategory + 1 : 1);
    return acc;
  }, new Map())
).map(([name, count]) => ({ name, count }));

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const handleSearch = () => {
    let filtered = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term)
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(course => course.category === activeFilter);
    }

    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.price === 'Free');
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => course.price !== 'Free');
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level.toLowerCase() === levelFilter);
    }

    setFilteredCourses(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
    setPriceFilter('all');
    setLevelFilter('all');
    setFilteredCourses(courses);
  };

  const handleEnroll = (courseId) => {
    toast({
      title: "Enrollment Successful",
      description: "You have successfully enrolled in this course."
    });
  };

  const getFearturedCourses = () => courses.filter(course => course.featured);
  const getLatestCourses = () => courses.filter(course => course.latest);
  const getUpcomingCourses = () => courses.filter(course => course.upcoming);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* [Rest of the UI remains the same, no type annotations needed] */}

      {/* Course tabs and rendering */}
      <Tabs defaultValue="featured" className="w-full">
        {/* Tabs List and Select */}
        {/* TabsContent blocks for featured, latest, upcoming, and all */}
        {/* Replace <CourseCard /> usage with the JSX version below */}
      </Tabs>
    </div>
  );
};

const CourseCard = ({ course, onEnroll }) => {
  const renderPrice = () => {
    return course.price === 'Free'
      ? <span className="text-green-600 font-medium">Free</span>
      : <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{course.price}</span>;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
          />
        ))}
        <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg group animate-fade-in">
      <div className="relative overflow-hidden h-48">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <Badge className={`absolute top-3 left-3 ${
          course.upcoming ? 'bg-amber-500' :
          course.price === 'Free' ? 'bg-green-500' : 'bg-eduos-primary'}`}>
          {course.upcoming ? 'Coming Soon' : course.price === 'Free' ? 'Free' : 'Featured'}
        </Badge>
        <div className="absolute bottom-3 left-3 text-white flex items-center">
          <Badge className="bg-black/60 hover:bg-black/70">{course.level}</Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">{course.category}</Badge>
          {renderStars(course.rating)}
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-eduos-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</div>
          <div className="flex items-center gap-1"><FileText className="h-4 w-4" />{course.lessons} lessons</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
          </div>
          <div className="font-medium">{renderPrice()}</div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 mt-auto">
        <Button
          className="w-full bg-eduos-primary hover:bg-eduos-secondary flex items-center gap-2"
          onClick={() => onEnroll(course.id)}
          disabled={course.upcoming}
        >
          {course.upcoming ? (
            <>
              <Bookmark className="h-4 w-4" /> Notify Me
            </>
          ) : (
            <>
              <MonitorPlay className="h-4 w-4" /> Enroll Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Courses;
