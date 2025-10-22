
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Eye
} from 'lucide-react';

const UploadResult = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level: '',
    session: '',
    class: '',
    subject: '',
    term: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle form field changes
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Validate and set file
  const validateAndSetFile = (file) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid File Type', {
        description: 'Please select an Excel file (.xlsx, .xls) or CSV file',
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File Too Large', {
        description: 'Please select a file smaller than 10MB',
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }
    
    setSelectedFile(file);
    toast.success('File Selected', {
      description: `Selected: ${file.name}`,
      icon: <CheckCircle className="h-4 w-4" />
    });
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  };

  // Validate form before proceeding
  const validateForm = () => {
    const { level, session } = formData;
    if (!level || !session) {
      toast.error('Missing Information', {
        description: 'Please select both level and session',
        icon: <AlertCircle className="h-4 w-4" />
      });
      return false;
    }
    return true;
  };

  // Handle form submission for criteria selection
  const handleContinue = () => {
    if (!validateForm()) return;
    
    setShowFileUpload(true);
    toast.success('Criteria Selected', {
      description: 'Now you can upload your result file',
      icon: <CheckCircle className="h-4 w-4" />
    });
  };

  // Handle file upload
  const handleUploadNow = async () => {
    if (!validateForm()) return;
    
    if (!selectedFile) {
      toast.error('No File Selected', {
        description: 'Please select a file to upload',
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast.success('Upload Successful!', {
        description: `Successfully uploaded ${selectedFile.name} for ${formData.level} - ${formData.session}`,
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 5000
      });
      
      // Reset form after successful upload
      setTimeout(() => {
        setFormData({ level: '', session: '', class: '', subject: '', term: '' });
        setSelectedFile(null);
        setShowFileUpload(false);
        setUploadProgress(0);
      }, 2000);
      
    } catch (error) {
      toast.error('Upload Failed', {
        description: 'Failed to upload file. Please try again.',
        icon: <AlertCircle className="h-4 w-4" />
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Download template
  const handleDownloadTemplate = () => {
    toast.info('Download Started', {
      description: 'Excel template download will begin shortly',
      icon: <Download className="h-4 w-4" />
    });
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Student Result
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Student Session and Level</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="level">
                Select the Level <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.level} onValueChange={(value) => handleSelectChange('level', value)}>
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary School</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="junior-secondary">Junior Secondary</SelectItem>
                  <SelectItem value="senior-secondary">Senior Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session">
                Select Session <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.session} onValueChange={(value) => handleSelectChange('session', value)}>
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-2026">2025/2026</SelectItem>
                  <SelectItem value="2024-2025">2024/2025</SelectItem>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="class">Select Class (Optional)</Label>
              <Select value={formData.class} onValueChange={(value) => handleSelectChange('class', value)}>
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="primary-1">Primary 1</SelectItem>
                  <SelectItem value="primary-2">Primary 2</SelectItem>
                  <SelectItem value="jss-1">JSS 1</SelectItem>
                  <SelectItem value="jss-2">JSS 2</SelectItem>
                  <SelectItem value="jss-3">JSS 3</SelectItem>
                  <SelectItem value="ss-1">SS 1</SelectItem>
                  <SelectItem value="ss-2">SS 2</SelectItem>
                  <SelectItem value="ss-3">SS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="term">Select Term (Optional)</Label>
              <Select value={formData.term} onValueChange={(value) => handleSelectChange('term', value)}>
                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                  <SelectValue placeholder="Select a term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Term</SelectItem>
                  <SelectItem value="second">Second Term</SelectItem>
                  <SelectItem value="third">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!showFileUpload ? (
            <Button 
              onClick={handleContinue}
              className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              Continue to File Upload
            </Button>
          ) : (
            <div className="space-y-4">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-eduos-primary bg-blue-50' 
                    : selectedFile 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-eduos-primary hover:bg-gray-50'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileSpreadsheet className="h-12 w-12 text-green-600 mx-auto" />
                    <div>
                      <p className="font-medium text-green-800">{selectedFile.name}</p>
                      <p className="text-sm text-green-600">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-600">
                        {dragActive ? 'Drop your file here' : 'Drag and drop your file here'}
                      </p>
                      <p className="text-sm text-gray-500">or</p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        Choose File
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDownloadTemplate}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Template
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Supports: Excel (.xlsx, .xls) and CSV files (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
              
              <Input
                id="fileInput"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-eduos-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowFileUpload(false);
                    setSelectedFile(null);
                  }}
                  disabled={isUploading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleUploadNow}
                  disabled={!selectedFile || isUploading}
                  className="flex-1 bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadResult;
