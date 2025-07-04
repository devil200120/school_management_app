
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { FileSpreadsheet, Download, Upload, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';

const AddStudentExcel = () => {
  const [level, setLevel] = useState('');
  const [classValue, setClassValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Upload Excel:', { level, class: classValue, file: selectedFile });
    // Logic to upload students via Excel
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Student with Excel
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add Student With Excel</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Alert className="mb-6 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-600">Important Note</AlertTitle>
              <AlertDescription>
                Please download the Excel template first, fill it with student data, and then upload it. Make sure all required fields are completed and the data is in the correct format.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  <Label htmlFor="class">Select Class</Label>
                  <Select>
                    <select 
                      id="class" 
                      value={classValue} 
                      onChange={(e) => setClassValue(e.target.value)} 
                      className="w-full"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="class1">Class 1</option>
                      <option value="class2">Class 2</option>
                      <option value="class3">Class 3</option>
                    </select>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excelFile">Upload Excel File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-eduos-primary transition-colors">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor="excelFile" className="cursor-pointer text-eduos-primary hover:text-eduos-secondary underline">Click to browse</label>
                      <span> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">Excel files only (*.xlsx, *.xls)</p>
                    <Input 
                      id="excelFile" 
                      type="file" 
                      accept=".xlsx,.xls" 
                      onChange={handleFileChange}
                      className="hidden" 
                      required
                    />
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">File selected: {selectedFile.name}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  <span>Download Template</span>
                </Button>
                <Button 
                  type="submit" 
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors flex items-center gap-2"
                  disabled={!selectedFile || !level || !classValue}
                >
                  <Upload size={16} />
                  <span>Upload Students</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold">Step 1</h4>
                <p className="text-gray-600">Download the Excel template using the provided button.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 2</h4>
                <p className="text-gray-600">Fill in all the required student information in the Excel sheet. Do not modify the column headers.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 3</h4>
                <p className="text-gray-600">Select the appropriate Level and Class for the students in the form.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Step 4</h4>
                <p className="text-gray-600">Upload the filled Excel file and submit to add all students at once.</p>
              </div>
              
              <Alert className="mt-8 bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-600">Required Fields</AlertTitle>
                <AlertDescription className="text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Gender</li>
                    <li>Date of Birth</li>
                    <li>Parent/Guardian Name</li>
                    <li>Contact Phone</li>
                    <li>Email Address</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStudentExcel;
