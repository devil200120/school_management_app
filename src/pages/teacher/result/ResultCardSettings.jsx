import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Settings, Users, GraduationCap, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const ResultCardSettings = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);

  const classes = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['Section A', 'Section B', 'Section C', 'Section D'];
  const levels = ['Nursery Level', 'Primary Level', 'JSS Secondary Level', 'SSS Secondary Level'];
  const commentLevels = ['Primary Level', 'JSS Secondary Level', 'Nursery Level', 'SSS Secondary Level', 'Summer Lesson'];

  // Mock student data
  const mockStudents = [
    { id: '1', name: 'John Doe', admissionNumber: 'ST001', score: 0, grade: '', remark: '', termlyComment: '', commentLevel: '' },
    { id: '2', name: 'Jane Smith', admissionNumber: 'ST002', score: 0, grade: '', remark: '', termlyComment: '', commentLevel: '' },
    { id: '3', name: 'Mike Johnson', admissionNumber: 'ST003', score: 0, grade: '', remark: '', termlyComment: '', commentLevel: '' },
  ];

  const getGradeAndRemark = (score) => {
    if (score === 100) {
      return { grade: 'A1', remark: 'Excellent' };
    } else if (score > 85) {
      return { grade: 'A2', remark: 'Very Good' };
    } else if (score > 60) {
      return { grade: 'B3', remark: 'Good' };
    } else if (score >= 50) {
      return { grade: 'C4', remark: 'You are Pass' };
    } else {
      return { grade: 'F9', remark: 'You are Fail' };
    }
  };

  const handleScoreChange = (studentId, score) => {
    const { grade, remark } = getGradeAndRemark(score);
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, score, grade, remark }
        : student
    ));
  };

  const handleCommentChange = (studentId, field, value) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, [field]: value }
        : student
    ));
  };

  const loadStudents = () => {
    if (!selectedClass || !selectedSection || !selectedLevel) {
      toast.error('Please select Class, Section, and Level first');
      return;
    }
    
    setStudents(mockStudents);
    setShowStudents(true);
    toast.success(`Loaded students for ${selectedClass} - ${selectedSection} - ${selectedLevel}`);
  };

  const saveResults = () => {
    toast.success('Result card settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Result Card Settings</h1>
          <p className="text-muted-foreground">Configure result cards and manage student grades</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <Settings className="h-4 w-4 mr-1" />
          Teacher Panel
        </Badge>
      </div>

      {/* Class, Section, Level Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Select Class, Section & Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section *</Label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level *</Label>
              <select
                id="level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={loadStudents} className="bg-eduos-primary hover:bg-eduos-secondary">
              <Users className="h-4 w-4 mr-2" />
              Load Students
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      {showStudents && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Result Card Management
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Class: {selectedClass} | Section: {selectedSection} | Level: {selectedLevel}
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Admission No.</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Remark</TableHead>
                    <TableHead>Comment Level</TableHead>
                    <TableHead>Termly Comment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.admissionNumber}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.score || ''}
                          onChange={(e) => handleScoreChange(student.id, parseInt(e.target.value) || 0)}
                          className="w-20"
                          placeholder="0"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={student.grade === 'A1' || student.grade === 'A2' ? 'default' : 
                                  student.grade === 'B3' ? 'secondary' : 
                                  student.grade === 'C4' ? 'outline' : 'destructive'}
                        >
                          {student.grade || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm ${
                          student.remark === 'Excellent' || student.remark === 'Very Good' ? 'text-green-600' :
                          student.remark === 'Good' ? 'text-blue-600' :
                          student.remark === 'You are Pass' ? 'text-orange-600' :
                          student.remark === 'You are Fail' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {student.remark || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <select
                          value={student.commentLevel}
                          onChange={(e) => handleCommentChange(student.id, 'commentLevel', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Select Level</option>
                          {commentLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          value={student.termlyComment}
                          onChange={(e) => handleCommentChange(student.id, 'termlyComment', e.target.value)}
                          placeholder="Enter termly comment..."
                          className="min-h-20 w-64"
                          rows={2}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
              <Button onClick={saveResults} className="bg-eduos-primary hover:bg-eduos-secondary">
                <Save className="h-4 w-4 mr-2" />
                Save Result Cards
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grading System Info */}
      <Card>
        <CardHeader>
          <CardTitle>Grading System Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-3 border rounded-lg bg-green-50">
              <div className="font-semibold text-green-800">A1 - Excellent</div>
              <div className="text-sm text-green-600">Score: 100</div>
            </div>
            <div className="p-3 border rounded-lg bg-green-50">
              <div className="font-semibold text-green-800">A2 - Very Good</div>
              <div className="text-sm text-green-600">Score: 86-99</div>
            </div>
            <div className="p-3 border rounded-lg bg-blue-50">
              <div className="font-semibold text-blue-800">B3 - Good</div>
              <div className="text-sm text-blue-600">Score: 61-85</div>
            </div>
            <div className="p-3 border rounded-lg bg-orange-50">
              <div className="font-semibold text-orange-800">C4 - Pass</div>
              <div className="text-sm text-orange-600">Score: 50-60</div>
            </div>
            <div className="p-3 border rounded-lg bg-red-50">
              <div className="font-semibold text-red-800">F9 - Fail</div>
              <div className="text-sm text-red-600">Score: 0-49</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultCardSettings;
