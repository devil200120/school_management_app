import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from '../../components/ui/badge';
import {
  Search,
  Award,
  CheckCircle2,
  Filter,
  Calendar,
  BarChart3,
  Play,
  BarChart,
  Trophy,
  Timer,
  BookOpen
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from '../../hooks/use-toast';
//import { Quiz } from '../../types';

// Sample quiz data
const quizzes = [
  {
    id: "1",
    title: "Mathematics Fundamentals",
    description: "Test your knowledge of basic math concepts",
    subject: "Mathematics",
    class: "Class 10",
    duration: "20 minutes",
    totalQuestions: 15,
    startDate: "2025-04-01",
    endDate: "2025-05-20",
    status: "active",
    timeLimit: 20,
    questions: [],
    category: "Mathematics",
    difficulty: "Easy",
    attempted: true,
    completedDate: "2025-04-15",
    score: 85
  },
  {
    id: "2",
    title: "Physics Principles",
    description: "Explore your understanding of physics laws",
    subject: "Physics",
    class: "Class 11",
    duration: "30 minutes",
    totalQuestions: 20,
    startDate: "2025-04-05",
    endDate: "2025-05-25",
    status: "active",
    timeLimit: 30,
    questions: [],
    category: "Physics",
    difficulty: "Medium",
    attempted: true,
    completedDate: "2025-04-10",
    score: 92
  },
  {
    id: "3",
    title: "Chemistry Basics",
    description: "Test your knowledge of chemistry fundamentals",
    subject: "Chemistry",
    class: "Class 11",
    duration: "25 minutes",
    totalQuestions: 18,
    startDate: "2025-03-28",
    endDate: "2025-05-15",
    status: "active",
    timeLimit: 25,
    questions: [],
    category: "Chemistry",
    difficulty: "Medium",
    attempted: true,
    completedDate: "2025-04-05",
    score: 78
  },
  {
    id: "4",
    title: "Biology Concepts",
    description: "Check your understanding of biological principles",
    subject: "Biology",
    class: "Class 9",
    duration: "20 minutes",
    totalQuestions: 15,
    startDate: "2025-03-20",
    endDate: "2025-05-10",
    status: "active",
    timeLimit: 20,
    questions: [],
    category: "Biology",
    difficulty: "Easy",
    attempted: true,
    completedDate: "2025-03-25",
    score: 88
  },
  {
    id: "5",
    title: "World History",
    description: "Test your knowledge of major historical events",
    subject: "History",
    class: "Class 10",
    duration: "15 minutes",
    totalQuestions: 12,
    startDate: "2025-04-25",
    endDate: "2025-06-10",
    status: "active",
    timeLimit: 15,
    questions: [],
    category: "History",
    difficulty: "Hard",
    attempted: false
  },
  {
    id: "6",
    title: "Geography Challenge",
    description: "Test your knowledge of world geography",
    subject: "Geography",
    class: "Class 9",
    duration: "20 minutes",
    totalQuestions: 15,
    startDate: "2025-04-20",
    endDate: "2025-06-05",
    status: "active",
    timeLimit: 20,
    questions: [],
    category: "Geography",
    difficulty: "Medium",
    attempted: false
  },
  {
    id: "7",
    title: "Programming Basics",
    description: "Test your knowledge of programming concepts",
    subject: "Computer Science",
    class: "Class 12",
    duration: "30 minutes",
    totalQuestions: 20,
    startDate: "2025-04-22",
    endDate: "2025-06-15",
    status: "active",
    timeLimit: 30,
    questions: [],
    category: "Computer Science",
    difficulty: "Medium",
    attempted: false
  },
  {
    id: "8",
    title: "Literary Analysis",
    description: "Check your understanding of literary works",
    subject: "Literature",
    class: "Class 11",
    duration: "25 minutes",
    totalQuestions: 18,
    startDate: "2025-04-18",
    endDate: "2025-06-08",
    status: "active",
    timeLimit: 25,
    questions: [],
    category: "Literature",
    difficulty: "Hard",
    attempted: false
  }
];

const QuizPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);

  // Animation variants
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

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const handleSearch = () => {
    let filtered = quizzes;

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (quiz.category && quiz.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all' && difficultyFilter) {
      filtered = filtered.filter(quiz => quiz.difficulty === difficultyFilter);
    }

    // Apply category filter
    if (categoryFilter !== 'all' && categoryFilter) {
      filtered = filtered.filter(quiz => quiz.category === categoryFilter);
    }

    setFilteredQuizzes(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('all');
    setCategoryFilter('all');
    setFilteredQuizzes(quizzes);
  };

  const handleStartQuiz = (quizId) => {
    toast({
      title: "Quiz Started",
      description: "Your quiz has been started. Good luck!",
    });
  };

  // Get unique categories
  const categories = Array.from(new Set(quizzes.map(q => q.category).filter(Boolean)));

  // Get attempted and unattempted quizzes
  const attemptedQuizzes = quizzes.filter(q => q.attempted);
  const newQuizzes = quizzes.filter(q => !q.attempted);

  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent mb-0">
            Quiz Center
          </h1>
          <p className="text-gray-500">Challenge yourself with interactive quizzes</p>
        </div>

        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-gray-50 flex items-center gap-1">
            <Calendar className="h-4 w-4 text-eduos-primary" />
            <span>Daily Quiz Available</span>
          </Badge>

          <Button className="bg-eduos-primary hover:bg-eduos-secondary">
            <Award className="mr-2 h-4 w-4" /> Leaderboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-0">
              <Trophy className="h-5 w-5 text-eduos-primary" />
              <p className="text-sm text-gray-600 ">Total Completed</p>
            </div>
            <div className="text-3xl font-bold text-eduos-primary">{attemptedQuizzes.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-0">
              <BarChart className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-3xl font-bold text-amber-600">
              {(attemptedQuizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0) / attemptedQuizzes.length || 0).toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100">
          <CardContent className="pt-3">
            <div className="flex items-center gap-2 mb-0">
              <BookOpen className="h-5 w-5 text-emerald-500" />
              <p className="text-sm text-gray-600 ">Available Quizzes</p>
            </div>
            <div className="text-3xl font-bold text-emerald-600">{newQuizzes.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-blue-100 overflow-hidden">
        <CardHeader className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
            <div>
              <CardTitle className="flex items-center text-eduos-primary">
                <Award className="mr-2 h-5 w-5" />
                Quizzes
              </CardTitle>
              <CardDescription>
                Test your knowledge with our interactive quizzes
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  className="pl-10 pr-4 h-9 w-full rounded-md border border-gray-300 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

              </div>



              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[150px] h-9">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="" size="sm" onClick={handleSearch} className="h-9 btnSearchQuiz">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9">
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="new" className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                <span>New Quizzes</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span>Completed</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {newQuizzes.length > 0 ? (
                  newQuizzes.map(quiz => (
                    <QuizCard
                      key={quiz.id}
                      quiz={quiz}
                      onStart={() => handleStartQuiz(quiz.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    <Award className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-lg">No new quizzes available at the moment</p>
                    <p>Check back later for new challenges</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {attemptedQuizzes.length > 0 ? (
                  attemptedQuizzes.map(quiz => (
                    <QuizCard
                      key={quiz.id}
                      quiz={quiz}
                      onStart={() => handleStartQuiz(quiz.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-lg">You haven't completed any quizzes yet</p>
                    <p>Start a quiz to track your progress</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map(quiz => (
                    <QuizCard
                      key={quiz.id}
                      quiz={quiz}
                      onStart={() => handleStartQuiz(quiz.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-8 text-center text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-lg">No quizzes match your search criteria</p>
                    <p>Try adjusting your filters or try a different search term</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const QuizCard = ({ quiz, onStart }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return "bg-blue-500";

    switch (difficulty) {
      case "Easy": return "bg-green-500";
      case "Medium": return "bg-amber-500";
      case "Hard": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      className={`border ${quiz.attempted ? 'border-green-200' : 'border-blue-200'} rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-sm hover:shadow-md`}
    >
      <div className={`py-2 px-4 ${quiz.attempted ? 'bg-green-50' : 'bg-blue-50'} flex justify-between items-center border-b ${quiz.attempted ? 'border-green-100' : 'border-blue-100'}`}>
        <Badge className={`${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty || 'Mixed'}
        </Badge>

        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <Timer className="h-4 w-12" />
          <span>{quiz.timeLimit} mins</span>
        </div>
      </div>

      <div className="p-3">
        <h3 className={`font-medium text-lg mb-2 ${quiz.attempted ? 'text-green-700' : 'text-eduos-primary'}`}>
          {quiz.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{quiz.description}</p>

        <div className="flex justify-between items-center">
          {quiz.attempted ? (
            <div className="text-sm">
              <div className="text-gray-500">Completed on {formatDate(quiz.completedDate)}</div>
              <div className="font-medium text-green-600 flex items-center gap-1 mt-1">
                <Trophy className="h-4 w-4" />
                Score: {quiz.score}%
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <Badge variant="outline" className={`${quiz.category ? 'border-blue-200' : ''}`}>
                {quiz.category || 'Mixed'}
              </Badge>
            </div>
          )}

          <Button
            className={quiz.attempted ? 'bg-green-600 hover:bg-green-700' : 'bg-eduos-primary hover:bg-eduos-secondary'}
            size="sm"
            onClick={onStart}
          >
            {quiz.attempted ? (
              <>
                <BarChart3 className="mr-1 h-4 w-4" /> View Results
              </>
            ) : (
              <>
                <Play className="mr-1 h-4 w-4" /> Start Quiz
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizPage;
