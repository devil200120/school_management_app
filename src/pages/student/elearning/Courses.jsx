
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
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
  SelectValue,
} from "../../../components/ui/select";
import { toast } from '../../../hooks/use-toast';


const courses = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    description: 'Master advanced mathematical concepts including calculus, linear algebra, and probability theory',
    category: 'Mathematics',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    students: 1245,
    price: 49.99,
    duration: '24 hours',
    level: 'Advanced',
    featured: true,
    latest: false,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3',
    lessons: 24
  },
  {
    id: '2',
    title: 'Introduction to Physics',
    description: 'Learn the fundamental principles of physics including mechanics, waves, and thermodynamics',
    category: 'Physics',
    instructor: 'Prof. Michael Chen',
    rating: 4.6,
    students: 986,
    price: 39.99,
    duration: '18 hours',
    level: 'Beginner',
    featured: true,
    latest: false,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3',
    lessons: 18
  },
  {
    id: '3',
    title: 'Creative Writing Workshop',
    description: 'Develop your creative writing skills through guided exercises and professional feedback',
    category: 'Literature',
    instructor: 'Emma Williams',
    rating: 4.9,
    students: 756,
    price: 'Free',
    duration: '12 hours',
    level: 'Intermediate',
    featured: true,
    latest: false,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3',
    lessons: 15
  },
  {
    id: '4',
    title: 'Biology and Ecosystems',
    description: 'Explore the fascinating world of biology and understand complex ecosystem interactions',
    category: 'Biology',
    instructor: 'Dr. James Wilson',
    rating: 4.7,
    students: 1089,
    price: 44.99,
    duration: '20 hours',
    level: 'Intermediate',
    featured: false,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-4.0.3',
    lessons: 20
  },
  {
    id: '5',
    title: 'Introduction to Computer Programming',
    description: 'Learn the basics of programming using Python with hands-on projects and exercises',
    category: 'Computer Science',
    instructor: 'Alex Thompson',
    rating: 4.5,
    students: 2345,
    price: 'Free',
    duration: '15 hours',
    level: 'Beginner',
    featured: true,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3',
    lessons: 16
  },
  {
    id: '6',
    title: 'World History: Ancient Civilizations',
    description: 'Discover the rich history of ancient civilizations from around the world',
    category: 'History',
    instructor: 'Prof. Robert Adams',
    rating: 4.6,
    students: 879,
    price: 34.99,
    duration: '22 hours',
    level: 'Beginner',
    featured: false,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3',
    lessons: 22
  },
  {
    id: '7',
    title: 'Digital Art Masterclass',
    description: 'Master digital art techniques using industry-standard software and tools',
    category: 'Art',
    instructor: 'Sophia Martinez',
    rating: 4.9,
    students: 1564,
    price: 59.99,
    duration: '30 hours',
    level: 'Advanced',
    featured: true,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3',
    lessons: 30
  },
  {
    id: '8',
    title: 'Quantum Computing Fundamentals',
    description: 'Understanding the principles of quantum computing and its potential applications',
    category: 'Computer Science',
    instructor: 'Dr. David Quantum',
    rating: 4.7,
    students: 567,
    price: 69.99,
    duration: '18 hours',
    level: 'Advanced',
    featured: false,
    latest: false,
    upcoming: true,
    thumbnail: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?ixlib=rb-4.0.3',
    lessons: 18
  },
  {
    id: '9',
    title: 'Environmental Science and Sustainability',
    description: 'Learn about environmental challenges and sustainable solutions for our planet',
    category: 'Environmental Science',
    instructor: 'Dr. Lisa Green',
    rating: 4.8,
    students: 923,
    price: 'Free',
    duration: '16 hours',
    level: 'Intermediate',
    featured: false,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3',
    lessons: 16
  },
  {
    id: '10',
    title: 'Artificial Intelligence: Machine Learning',
    description: 'Dive into AI and machine learning algorithms and applications',
    category: 'Computer Science',
    instructor: 'Prof. Alan Turner',
    rating: 4.9,
    students: 2876,
    price: 79.99,
    duration: '28 hours',
    level: 'Advanced',
    featured: true,
    latest: false,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3',
    lessons: 28
  },
  {
    id: '11',
    title: 'Introduction to Psychology',
    description: 'Understanding human behavior and mental processes',
    category: 'Psychology',
    instructor: 'Dr. Maria Rodriguez',
    rating: 4.7,
    students: 1543,
    price: 49.99,
    duration: '20 hours',
    level: 'Beginner',
    featured: false,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3',
    lessons: 20
  },
  {
    id: '12',
    title: 'Advanced Web Development',
    description: 'Master modern web development techniques and frameworks',
    category: 'Computer Science',
    instructor: 'Jake Thompson',
    rating: 4.8,
    students: 3254,
    price: 69.99,
    duration: '32 hours',
    level: 'Advanced',
    featured: true,
    latest: true,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3',
    lessons: 32
  },
  {
    id: '13',
    title: 'Space Exploration and Astronomy',
    description: 'Journey through the cosmos and learn about the wonders of space',
    category: 'Astronomy',
    instructor: 'Dr. Neil Cosmos',
    rating: 4.9,
    students: 1876,
    price: 59.99,
    duration: '24 hours',
    level: 'Intermediate',
    featured: false,
    latest: false,
    upcoming: true,
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3',
    lessons: 24
  },
  {
    id: '14',
    title: 'Financial Literacy for Students',
    description: 'Learn essential financial skills for managing money and planning for the future',
    category: 'Finance',
    instructor: 'Morgan Stanley',
    rating: 4.6,
    students: 2154,
    price: 'Free',
    duration: '10 hours',
    level: 'Beginner',
    featured: true,
    latest: false,
    upcoming: false,
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3',
    lessons: 10
  },
  {
    id: '15',
    title: 'Blockchain Technology Fundamentals',
    description: 'Understanding blockchain and its applications beyond cryptocurrency',
    category: 'Computer Science',
    instructor: 'Dr. Satoshi Blocks',
    rating: 4.7,
    students: 1432,
    price: 64.99,
    duration: '18 hours',
    level: 'Intermediate',
    featured: false,
    latest: false,
    upcoming: true,
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3',
    lessons: 18
  }
];

// Group courses into categories with counts
const categories = Array.from(
  courses.reduce((acc, course) => {
    const existingCategory = acc.get(course.category);
    if (existingCategory) {
      acc.set(course.category, existingCategory + 1);
    } else {
      acc.set(course.category, 1);
    }
    return acc;
  }, new Map)
).map(([name, count]) => ({ name, count }));

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  
  const handleSearch = () => {
    let filtered = courses;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(course => course.category === activeFilter);
    }
    
    // Apply price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.price === 'Free');
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => course.price !== 'Free');
    }
    
    // Apply level filter
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
      description: "You have successfully enrolled in this course.",
    });
  };
  
  const getFearturedCourses = () => courses.filter(course => course.featured);
  const getLatestCourses = () => courses.filter(course => course.latest);
  const getUpcomingCourses = () => courses.filter(course => course.upcoming);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-eduos-primary mb-1">Online Courses</h1>
          <p className="text-gray-500">Explore our extensive library of courses to enhance your knowledge</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex-1">My Courses</Button>
          <Button className="bg-eduos-primary hover:bg-eduos-secondary flex-1">
            <BookOpen className="mr-2 h-4 w-4" /> Browse Catalog
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-eduos-primary/80 to-eduos-secondary">
        <CardContent className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expand Your Knowledge and Skills</h2>
            <p className="text-lg opacity-90 mb-8">
              Access world-class education with our curated collection of courses taught by expert instructors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type='text' 
                  placeholder="Search for courses..." 
                  className="flex h-10 w-full rounded-md border border-input bg-background py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm px-5 bg-white/95 border-0 text-black placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                className="bg-white text-eduos-primary hover:bg-white/90"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar with categories and filters */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'ghost'} 
                className={`w-full justify-between ${activeFilter === 'all' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}`}
                onClick={() => {
                  setActiveFilter('all');
                  handleSearch();
                }}
              >
                <span>All Categories</span>
                <Badge className="ml-2 bg-primary-new">{courses.length}</Badge>
              </Button>
              
              {categories.map(category => (
                <Button 
                  key={category.name}
                  variant={activeFilter === category.name ? 'default' : 'ghost'} 
                  className={`w-full justify-between ${activeFilter === category.name ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}`}
                  onClick={() => {
                    setActiveFilter(category.name);
                    handleSearch();
                  }}
                >
                  <span>{category.name}</span>
                  <Badge className="ml-2 bg-primary-new">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
          
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price</h3>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant={priceFilter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    className={priceFilter === 'all' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setPriceFilter('all');
                      handleSearch();
                    }}
                  >
                    All Prices
                  </Button>
                  <Button 
                    variant={priceFilter === 'free' ? 'default' : 'outline'} 
                    size="sm"
                    className={priceFilter === 'free' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setPriceFilter('free');
                      handleSearch();
                    }}
                  >
                    Free
                  </Button>
                  <Button 
                    variant={priceFilter === 'paid' ? 'default' : 'outline'} 
                    size="sm"
                    className={priceFilter === 'paid' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setPriceFilter('paid');
                      handleSearch();
                    }}
                  >
                    Paid
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Level</h3>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant={levelFilter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    className={levelFilter === 'all' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setLevelFilter('all');
                      handleSearch();
                    }}
                  >
                    All Levels
                  </Button>
                  <Button 
                    variant={levelFilter === 'beginner' ? 'default' : 'outline'} 
                    size="sm"
                    className={levelFilter === 'beginner' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setLevelFilter('beginner');
                      handleSearch();
                    }}
                  >
                    Beginner
                  </Button>
                  <Button 
                    variant={levelFilter === 'intermediate' ? 'default' : 'outline'} 
                    size="sm"
                    className={levelFilter === 'intermediate' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setLevelFilter('intermediate');
                      handleSearch();
                    }}
                  >
                    Intermediate
                  </Button>
                  <Button 
                    variant={levelFilter === 'advanced' ? 'default' : 'outline'} 
                    size="sm"
                    className={levelFilter === 'advanced' ? 'bg-eduos-primary hover:bg-eduos-secondary' : ''}
                    onClick={() => {
                      setLevelFilter('advanced');
                      handleSearch();
                    }}
                  >
                    Advanced
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={resetFilters} 
                variant="outline" 
                className="w-full mt-4"
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="featured" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Featured</span>
                </TabsTrigger>
                <TabsTrigger value="latest" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Latest</span>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Upcoming</span>
                </TabsTrigger>
                <TabsTrigger value="all" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">All Courses</span>
                </TabsTrigger>
              </TabsList>
              
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="featured" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFearturedCourses().map(course => (
                  <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="latest" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getLatestCourses().map(course => (
                  <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getUpcomingCourses().map(course => (
                  <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-50 border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No courses found</h3>
                    <p className="text-gray-500 text-center max-w-md mb-4">
                      We couldn't find any courses matching your search criteria. Try adjusting your filters or search term.
                    </p>
                    <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};


const CourseCard = ({ course, onEnroll }) => {
  const renderPrice = () => {
    if (course.price === 'Free') {
      return <span className="text-green-600 font-medium">Free</span>;
    } else {
      return <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{course.price}</span>;
    }
  };
  
  const renderStars = (rating) => {
    return (
      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
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
        <Badge 
          className={`absolute top-3 left-3 ${course.upcoming ? 'bg-amber-500' : 
            course.price === 'Free' ? 'bg-green-500' : 'bg-eduos-primary'}`}
        >
          {course.upcoming ? 'Coming Soon' : course.price === 'Free' ? 'Free' : 'Featured'}
        </Badge>
        <div className="absolute bottom-3 left-3 text-white flex items-center">
          <Badge className="bg-black/60 hover:bg-black/70">
            {course.level}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2">
            {course.category}
          </Badge>
          {renderStars(course.rating)}
        </div>
        <CardTitle className="line-clamp-2 group-hover:text-eduos-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {course.lessons} lessons
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
          </div>
          <div className="font-medium">
            {renderPrice()}
          </div>
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
              <Bookmark className="h-4 w-4" />
              Notify Me
            </>
          ) : (
            <>
              <MonitorPlay className="h-4 w-4" />
              Enroll Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Courses;
