import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import {
  FileText,
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  Filter,
  Download,
  BookOpen
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

// Sample data
const completedAssessments = [
  { id: "1", subject: "Mathematics", submittedDate: "2025-04-25", marksObtained: 18, totalMarks: 20, passStatus: "Pass", percentage: 90 },
  { id: "2", subject: "Physics", submittedDate: "2025-04-22", marksObtained: 16, totalMarks: 20, passStatus: "Pass", percentage: 80 },
  { id: "3", subject: "Chemistry", submittedDate: "2025-04-20", marksObtained: 14, totalMarks: 20, passStatus: "Pass", percentage: 70 },
  { id: "4", subject: "Biology", submittedDate: "2025-04-18", marksObtained: 19, totalMarks: 20, passStatus: "Pass", percentage: 95 },
  { id: "5", subject: "Computer Science", submittedDate: "2025-04-15", marksObtained: 17, totalMarks: 20, passStatus: "Pass", percentage: 85 },
  { id: "6", subject: "English Literature", submittedDate: "2025-04-10", marksObtained: 15, totalMarks: 20, passStatus: "Pass", percentage: 75 },
  { id: "7", subject: "History", submittedDate: "2025-04-05", marksObtained: 13, totalMarks: 20, passStatus: "Pass", percentage: 65 },
  { id: "8", subject: "Geography", submittedDate: "2025-04-01", marksObtained: 12, totalMarks: 20, passStatus: "Pass", percentage: 60 },
  { id: "9", subject: "Economics", submittedDate: "2025-03-28", marksObtained: 10, totalMarks: 20, passStatus: "Pass", percentage: 50 },
  { id: "10", subject: "Civics", submittedDate: "2025-03-25", marksObtained: 8, totalMarks: 20, passStatus: "Fail", percentage: 40 }
];

const AssessmentScore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filteredAssessments, setFilteredAssessments] = useState(completedAssessments);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const handleSearch = () => {
    const filtered = completedAssessments.filter(assessment =>
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSubject === 'all' || assessment.subject === filterSubject)
    );
    setFilteredAssessments(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterSubject('all');
    setFilteredAssessments(completedAssessments);
  };

  const subjects = Array.from(new Set(completedAssessments.map(a => a.subject)));

  const averageScore = completedAssessments.reduce((acc, curr) => acc + curr.marksObtained, 0) / completedAssessments.length;
  const highestScore = Math.max(...completedAssessments.map(a => a.marksObtained));
  const passedCount = completedAssessments.filter(a => a.passStatus === "Pass").length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div className="space-y-8" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent mb-1">
            My Assessment Scores
          </h1>
          <p className="text-gray-500">View and analyze your assessment results</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export Results
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-eduos-primary" />
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-3xl font-bold text-eduos-primary">
              {averageScore.toFixed(1)}<span className="text-lg text-gray-500">/20</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-gray-600">Highest Score</p>
            </div>
            <div className="text-3xl font-bold text-amber-600">
              {highestScore}<span className="text-lg text-gray-500">/20</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-emerald-500" />
              <p className="text-sm text-gray-600">Pass Rate</p>
            </div>
            <div className="text-3xl font-bold text-emerald-600">
              {Math.round((passedCount / completedAssessments.length) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-blue-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center text-eduos-primary">
                <FileText className="mr-2 h-5 w-5" />
                Assessment History
              </CardTitle>
              <CardDescription>
                View all your completed assessments and scores
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by subject..."
                  className="pl-8 h-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="secondary" size="sm" onClick={handleSearch}>
                <Filter className="h-4 w-4 mr-2" />
                Apply
              </Button>

              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length > 0 ? (
                  filteredAssessments.map((assessment) => (
                    <motion.tr key={assessment.id} variants={item} className="border-b hover:bg-gray-50">
                      <TableCell className="font-medium">{assessment.subject}</TableCell>
                      <TableCell>{formatDate(assessment.submittedDate)}</TableCell>
                      <TableCell>{assessment.marksObtained}/{assessment.totalMarks}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              assessment.percentage >= 80 ? 'bg-green-500' :
                              assessment.percentage >= 60 ? 'bg-blue-500' :
                              assessment.percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${assessment.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 inline-block">
                          {assessment.percentage}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={assessment.passStatus === "Pass" ? "bg-green-500" : "bg-red-500"}>
                          {assessment.passStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Report</DropdownMenuItem>
                            <DropdownMenuItem>Print Result</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No assessments found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between py-4">
          <div className="text-sm text-gray-500">
            Showing {filteredAssessments.length} out of {completedAssessments.length} assessments
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AssessmentScore;
