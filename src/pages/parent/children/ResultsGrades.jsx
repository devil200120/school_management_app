import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  GraduationCap,
  User,
  Download,
  FileText,
  Star,
  Trophy,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const ResultsGrades = () => {
  const [selectedChild, setSelectedChild] = useState("1");
  const [selectedSession, setSelectedSession] = useState("2023-2024");
  const [selectedTerm, setSelectedTerm] = useState("1");

  // Mock data for children's results and grades
  const children = [
    {
      id: "1",
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNo: "EDU2023001",
      profileImg: "/profile_photo.png",
      currentGPA: 3.8,
      classRank: 3,
      totalStudents: 45,
      sessions: {
        "2023-2024": {
          terms: {
            1: {
              name: "First Term 2023/2024",
              gpa: 3.8,
              position: 3,
              totalStudents: 45,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 92,
                  grade: "A",
                  position: 2,
                  teacher: "Mr. Adebayo",
                  remarks: "Excellent performance",
                },
                {
                  name: "English Language",
                  score: 88,
                  grade: "B+",
                  position: 5,
                  teacher: "Mrs. Oluwaseun",
                  remarks: "Very good improvement",
                },
                {
                  name: "Physics",
                  score: 85,
                  grade: "A-",
                  position: 4,
                  teacher: "Dr. Emeka",
                  remarks: "Good understanding",
                },
                {
                  name: "Chemistry",
                  score: 82,
                  grade: "B",
                  position: 8,
                  teacher: "Mr. Taiwo",
                  remarks: "Needs more practice",
                },
                {
                  name: "Biology",
                  score: 90,
                  grade: "A",
                  position: 1,
                  teacher: "Mrs. Kemi",
                  remarks: "Outstanding work",
                },
                {
                  name: "Geography",
                  score: 87,
                  grade: "B+",
                  position: 3,
                  teacher: "Mr. John",
                  remarks: "Very good progress",
                },
              ],
              examDetails: {
                firstCA: 30,
                secondCA: 30,
                exam: 40,
                total: 100,
              },
              principalRemarks:
                "Sarah has shown excellent academic performance this term. She demonstrates strong analytical skills and good study habits.",
              teacherRemarks:
                "Sarah is a dedicated student who participates actively in class discussions. She shows great potential in sciences.",
              nextTermResumes: "2024-01-08",
            },
            2: {
              name: "Second Term 2023/2024",
              gpa: 3.9,
              position: 2,
              totalStudents: 45,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 94,
                  grade: "A",
                  position: 1,
                  teacher: "Mr. Adebayo",
                  remarks: "Exceptional performance",
                },
                {
                  name: "English Language",
                  score: 90,
                  grade: "A-",
                  position: 3,
                  teacher: "Mrs. Oluwaseun",
                  remarks: "Significant improvement",
                },
                {
                  name: "Physics",
                  score: 88,
                  grade: "B+",
                  position: 3,
                  teacher: "Dr. Emeka",
                  remarks: "Steady progress",
                },
                {
                  name: "Chemistry",
                  score: 85,
                  grade: "A-",
                  position: 6,
                  teacher: "Mr. Taiwo",
                  remarks: "Good improvement",
                },
                {
                  name: "Biology",
                  score: 92,
                  grade: "A",
                  position: 1,
                  teacher: "Mrs. Kemi",
                  remarks: "Consistently excellent",
                },
                {
                  name: "Geography",
                  score: 89,
                  grade: "B+",
                  position: 2,
                  teacher: "Mr. John",
                  remarks: "Excellent understanding",
                },
              ],
            },
            3: {
              name: "Third Term 2023/2024",
              gpa: 3.7,
              position: 4,
              totalStudents: 45,
              status: "In Progress",
            },
          },
        },
      },
      achievements: [
        {
          title: "Best Student in Mathematics",
          term: "Second Term",
          year: "2023/2024",
        },
        {
          title: "Most Improved Student",
          term: "First Term",
          year: "2023/2024",
        },
        {
          title: "Science Quiz Champion",
          term: "First Term",
          year: "2023/2024",
        },
      ],
    },
    {
      id: "2",
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNo: "EDU2023002",
      profileImg: "/profile_photo.png",
      currentGPA: 3.2,
      classRank: 12,
      totalStudents: 38,
      sessions: {
        "2023-2024": {
          terms: {
            1: {
              name: "First Term 2023/2024",
              gpa: 3.2,
              position: 12,
              totalStudents: 38,
              status: "Completed",
              subjects: [
                {
                  name: "Mathematics",
                  score: 78,
                  grade: "B",
                  position: 15,
                  teacher: "Mrs. Funmi",
                  remarks: "Good effort",
                },
                {
                  name: "English Language",
                  score: 75,
                  grade: "B-",
                  position: 18,
                  teacher: "Mr. Segun",
                  remarks: "Needs improvement",
                },
                {
                  name: "Basic Science",
                  score: 83,
                  grade: "B+",
                  position: 8,
                  teacher: "Mrs. Bola",
                  remarks: "Very good performance",
                },
                {
                  name: "Social Studies",
                  score: 88,
                  grade: "B+",
                  position: 5,
                  teacher: "Mr. Ade",
                  remarks: "Excellent work",
                },
                {
                  name: "Creative Arts",
                  score: 92,
                  grade: "A",
                  position: 2,
                  teacher: "Mrs. Nike",
                  remarks: "Outstanding creativity",
                },
              ],
            },
          },
        },
      },
      achievements: [
        {
          title: "Art Competition Winner",
          term: "First Term",
          year: "2023/2024",
        },
        { title: "Best Handwriting", term: "First Term", year: "2023/2024" },
      ],
    },
  ];

  const sessions = [
    { value: "2023-2024", label: "2023/2024 Academic Session" },
    { value: "2022-2023", label: "2022/2023 Academic Session" },
  ];

  const terms = [
    { value: "1", label: "First Term" },
    { value: "2", label: "Second Term" },
    { value: "3", label: "Third Term" },
  ];

  const getSelectedChildData = () =>
    children.find((child) => child.id === selectedChild);

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "bg-green-100 text-green-800";
    if (grade.includes("B")) return "bg-blue-100 text-blue-800";
    if (grade.includes("C")) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getPositionSuffix = (position) => {
    const j = position % 10;
    const k = position % 100;
    if (j === 1 && k !== 11) return position + "st";
    if (j === 2 && k !== 12) return position + "nd";
    if (j === 3 && k !== 13) return position + "rd";
    return position + "th";
  };

  // Handle report card download
  const handleDownloadReportCard = async () => {
    try {
      toast.success("Generating report card...");
      
      const selectedChildData = getSelectedChildData();
      const termData = selectedChildData?.sessions?.[selectedSession]?.terms?.[selectedTerm];
      const sessionName = sessions.find(s => s.value === selectedSession)?.label || selectedSession;
      const termName = terms.find(t => t.value === selectedTerm)?.label || `Term ${selectedTerm}`;
      
      if (!termData) {
        toast.error("No data available for the selected term");
        return;
      }

      // Calculate overall statistics
      const subjects = termData.subjects || [];
      const totalMarks = subjects.reduce((sum, subject) => sum + subject.score, 0);
      const averageScore = subjects.length > 0 ? (totalMarks / subjects.length).toFixed(1) : 0;
      
      // Generate report card content
      const reportContent = `ACADEMIC REPORT CARD
=====================================

Student Information:
- Name: ${selectedChildData?.name || 'N/A'}
- Class: ${selectedChildData?.class || 'N/A'}
- Admission Number: ${selectedChildData?.admissionNo || 'N/A'}
- Session: ${sessionName}
- Term: ${termName}

Academic Performance Summary:
- Overall GPA: ${termData.gpa || 'N/A'}
- Class Position: ${getPositionSuffix(termData.position || 0)} out of ${termData.totalStudents || 0} students
- Average Score: ${averageScore}%
- Status: ${termData.status || 'N/A'}

Subject Breakdown:
=====================================
${subjects.map(subject => {
  const percentage = ((subject.score / subject.total) * 100).toFixed(1);
  const performance = percentage >= 80 ? 'Excellent' :
                     percentage >= 70 ? 'Very Good' :
                     percentage >= 60 ? 'Good' :
                     percentage >= 50 ? 'Fair' : 'Poor';
  
  return `${subject.name}:
  Score: ${subject.score}/${subject.total} (${percentage}%)
  Grade: ${subject.grade}
  Performance: ${performance}
  Teacher: ${subject.teacher}
  Remarks: ${subject.remarks || 'Good effort'}
  `;
}).join('\n')}

Performance Analysis:
=====================================
Strengths:
${subjects
  .filter(s => ((s.score / s.total) * 100) >= 80)
  .map(s => `✅ ${s.name} - ${s.grade} (${((s.score / s.total) * 100).toFixed(1)}%)`)
  .join('\n') || '- Work on improving performance across subjects'}

Areas for Improvement:
${subjects
  .filter(s => ((s.score / s.total) * 100) < 60)
  .map(s => `⚠️ ${s.name} - ${s.grade} (${((s.score / s.total) * 100).toFixed(1)}%)`)
  .join('\n') || '- Maintain current excellent performance'}

Overall Assessment:
${termData.gpa >= 3.5 ? '🏆 OUTSTANDING PERFORMANCE - Keep up the excellent work!' :
  termData.gpa >= 3.0 ? '⭐ GOOD PERFORMANCE - Continue working hard!' :
  termData.gpa >= 2.5 ? '📈 FAIR PERFORMANCE - More effort needed!' :
  '📚 NEEDS IMPROVEMENT - Please seek additional support'}

Teacher's Comments:
"${termData.teacherComment || 'Continue to work hard and maintain good study habits. Well done!'}"

Next Term Expectations:
- Maintain current strengths
- Focus on improving weaker subjects
- Participate actively in class discussions
- Complete all assignments on time

Report Generated: ${new Date().toLocaleString()}
Generated by: School Management System - Parent Portal

END OF REPORT
=====================================`;

      // Create and download the file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedChildData?.name?.replace(/\s+/g, '_')}_Report_Card_${selectedSession.replace('/', '-')}_${termName.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Report card downloaded successfully!");
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download report card. Please try again.");
    }
  };

  const selectedChildData = getSelectedChildData();
  const termData =
    selectedChildData?.sessions?.[selectedSession]?.terms?.[selectedTerm];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Results & Grades</h1>
          <p className="text-gray-600 mt-1">
            View your child&apos;s academic results, report cards, and
            achievements
          </p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleDownloadReportCard}
        >
          <Download className="h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <label className="text-sm font-medium">Academic Session</label>
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger>
              <SelectValue placeholder="Choose session" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((session) => (
                <SelectItem key={session.value} value={session.value}>
                  {session.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Term</label>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger>
              <SelectValue placeholder="Choose term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term.value} value={term.value}>
                  {term.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedChildData && (
        <>
          {/* Student Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Student Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <img
                  src={selectedChildData.profileImg}
                  alt={selectedChildData.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedChildData.name}
                  </h3>
                  <p className="text-gray-600">
                    Class: {selectedChildData.class}
                  </p>
                  <p className="text-gray-600">
                    Admission No: {selectedChildData.admissionNo}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedChildData.currentGPA}
                    </div>
                    <div className="text-sm text-gray-600">Current GPA</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {getPositionSuffix(selectedChildData.classRank)}
                    </div>
                    <div className="text-sm text-gray-600">Class Rank</div>
                    <div className="text-xs text-gray-500">
                      of {selectedChildData.totalStudents}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Term Results */}
          {termData && (
            <>
              {/* Term Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {termData.name} - Result Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {termData.gpa}
                      </div>
                      <div className="text-sm text-gray-600">Term GPA</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {getPositionSuffix(termData.position)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Class Position
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {termData.totalStudents}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Students
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Badge
                        className={
                          termData.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {termData.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-2">Status</div>
                    </div>
                  </div>

                  {/* Subject Results */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-4">
                      Subject Performance
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left p-3 border font-semibold">
                              Subject
                            </th>
                            <th className="text-center p-3 border font-semibold">
                              Score
                            </th>
                            <th className="text-center p-3 border font-semibold">
                              Grade
                            </th>
                            <th className="text-center p-3 border font-semibold">
                              Position
                            </th>
                            <th className="text-left p-3 border font-semibold">
                              Teacher
                            </th>
                            <th className="text-left p-3 border font-semibold">
                              Remarks
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {termData.subjects.map((subject, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="p-3 border font-medium">
                                {subject.name}
                              </td>
                              <td className="p-3 border text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="font-bold">
                                    {subject.score}%
                                  </span>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full"
                                      style={{ width: `${subject.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 border text-center">
                                <Badge className={getGradeColor(subject.grade)}>
                                  {subject.grade}
                                </Badge>
                              </td>
                              <td className="p-3 border text-center font-medium">
                                {getPositionSuffix(subject.position)}
                              </td>
                              <td className="p-3 border">{subject.teacher}</td>
                              <td className="p-3 border text-sm text-gray-600">
                                {subject.remarks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Exam Structure */}
                  {termData.examDetails && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-3">
                        Assessment Structure
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {termData.examDetails.firstCA}%
                          </div>
                          <div className="text-sm text-gray-600">First CA</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {termData.examDetails.secondCA}%
                          </div>
                          <div className="text-sm text-gray-600">Second CA</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">
                            {termData.examDetails.exam}%
                          </div>
                          <div className="text-sm text-gray-600">
                            Final Exam
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {termData.examDetails.total}%
                          </div>
                          <div className="text-sm text-gray-600">Total</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  {(termData.teacherRemarks || termData.principalRemarks) && (
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold">
                        Teacher&apos;s and Principal&apos;s Comments
                      </h4>
                      {termData.teacherRemarks && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-2">
                            Class Teacher&apos;s Remarks:
                          </h5>
                          <p className="text-gray-700">
                            {termData.teacherRemarks}
                          </p>
                        </div>
                      )}
                      {termData.principalRemarks && (
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-2">
                            Principal&apos;s Remarks:
                          </h5>
                          <p className="text-gray-700">
                            {termData.principalRemarks}
                          </p>
                        </div>
                      )}
                      {termData.nextTermResumes && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Next term resumes:{" "}
                            {new Date(
                              termData.nextTermResumes
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Academic Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedChildData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Star className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {achievement.term}, {achievement.year}
                        </p>
                      </div>
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

export default ResultsGrades;
