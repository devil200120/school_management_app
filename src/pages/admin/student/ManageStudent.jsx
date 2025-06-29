
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/ui/table';
import { motion } from 'framer-motion';
import { Search, FileDown, FileUp, UserPlus, Filter } from 'lucide-react';
import { toast } from 'sonner';

const ManageStudent = () => {
  const [level, setLevel] = useState('');
  const [session, setSession] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample student data for demonstration
  const studentsData = [
    { id: 1, name: "John Doe", admissionId: "STU-2023-001", level: "Primary", class: "Primary One", gender: "Male", status: "Active" },
    { id: 2, name: "Jane Smith", admissionId: "STU-2023-002", level: "Primary", class: "Primary One", gender: "Female", status: "Active" },
    { id: 3, name: "Peter Johnson", admissionId: "STU-2023-003", level: "Primary", class: "Primary One", gender: "Male", status: "Inactive" },
    { id: 4, name: "Mary Wilson", admissionId: "STU-2023-004", level: "Primary", class: "Primary Two", gender: "Female", status: "Active" },
    { id: 5, name: "David Brown", admissionId: "STU-2023-005", level: "Primary", class: "Primary Two", gender: "Male", status: "Active" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!level) {
      toast.error("Please select a level");
      return;
    }
    
    if (!session) {
      toast.error("Please select a session");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowStudents(true);
      toast.success(`Students loaded for ${level} level, ${session} session`);
    }, 800);
  };
  
  // Filter students based on search term
  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.admissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleExport = () => {
    toast.success("Students data exported successfully!");
  };
  
  const handleImport = () => {
    toast.info("Please select a file to import");
  };
  
  const handleAddStudent = () => {
    toast("Add new student");
  };

  return (
    <div className="space-y-6 p-4 md:p-6 pb-16">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary">
          Manage Students
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            variant="outline" 
            onClick={handleExport}
            className="flex items-center gap-1"
          >
            <FileDown size={16} />
            Export
          </Button>
          
          <Button 
            size="sm"
            variant="outline" 
            onClick={handleImport}
            className="flex items-center gap-1"
          >
            <FileUp size={16} />
            Import
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleAddStudent}
            className="flex items-center gap-1 bg-eduos-primary hover:bg-eduos-secondary"
          >
            <UserPlus size={16} />
            Add Student
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Select Application Session And Level</CardTitle>
            <CardDescription className="text-white/80">
              Filter students by session and education level
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Select Level</Label>
                  <Select>
                    <select 
                      id="level" 
                      value={level} 
                      onChange={(e) => setLevel(e.target.value)} 
                      className="w-full"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="primary">Primary</option>
                      <option value="junior">Junior Secondary</option>
                      <option value="senior">Senior Secondary</option>
                    </select>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session">Select Session</Label>
                  <Select>
                    <select 
                      id="session" 
                      value={session} 
                      onChange={(e) => setSession(e.target.value)} 
                      className="w-full"
                      required
                    >
                      <option value="">Select Session</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Go Now"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      {showStudents && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-xl font-semibold text-eduos-primary">
              Student List - {level} Level
            </h3>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-eduos-primary"
                />
              </div>
              
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Filter size={16} />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 sticky top-0">
                  <TableRow>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Admission ID</TableHead>
                    <TableHead className="font-semibold">Class</TableHead>
                    <TableHead className="font-semibold">Gender</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.admissionId}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            student.status === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {student.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast.info(`View ${student.name}'s profile`)}
                            >
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-eduos-primary hover:bg-eduos-secondary"
                              onClick={() => toast.info(`Edit ${student.name}'s information`)}
                            >
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No students found matching your search criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-gray-500">
              Showing {filteredStudents.length} of {studentsData.length} students
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageStudent;
