
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Upload } from 'lucide-react';

const AddStudent = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [studentData, setStudentData] = useState({
    firstName: '',
    middleName: '',
    accessPin: '',
    email: '',
    phone: '',
    passport: null
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setStudentData({
        ...studentData,
        passport: e.target.files[0]
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleNext = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const steps = [
    { id: 1, label: "Basic Account Credential" },
    { id: 2, label: "Personal Information" },
    { id: 3, label: "Class Information" },
    { id: 4, label: "Parent Information" }
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add Student
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left side - Student illustration */}
        <div className="hidden md:block md:col-span-1">
          <Card className="h-full flex flex-col items-center justify-center p-6 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-full h-full rounded-md bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="w-64 h-64 mx-auto">
                  <svg 
                    viewBox="0 0 200 200" 
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="100" cy="70" r="40" fill="#6E59A5" />
                    <rect x="60" y="120" width="80" height="80" fill="#9b87f5" rx="10" />
                    <circle cx="85" cy="65" r="8" fill="white" />
                    <circle cx="115" cy="65" r="8" fill="white" />
                    <circle cx="85" cy="65" r="4" fill="black" />
                    <circle cx="115" cy="65" r="4" fill="black" />
                    <path d="M 85 90 Q 100 100 115 90" stroke="white" strokeWidth="3" fill="transparent" />
                    <rect x="90" y="110" width="20" height="30" fill="white" />
                    <rect x="75" y="140" width="20" height="10" fill="#7E69AB" />
                    <rect x="105" y="140" width="20" height="10" fill="#7E69AB" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mt-4">Student Registration</h3>
                <p className="text-gray-500 mt-2">Fill out the form to register a new student in the system.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side - Registration form */}
        <Card className="md:col-span-2 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Student Registration Form</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Progress steps */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center ${activeStep === step.id ? 'text-eduos-primary font-bold' : 'text-gray-500'}`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                        ${activeStep === step.id 
                          ? 'bg-eduos-primary text-white' 
                          : activeStep > step.id 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {activeStep > step.id ? '✓' : step.id}
                    </div>
                    <span className="text-xs text-center hidden sm:block">{step.label}</span>
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-full transition-all duration-300"
                  style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1 - Basic Account Credential */}
            {activeStep === 1 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Student First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      value={studentData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Student Middle Name</Label>
                    <Input
                      id="middleName"
                      name="middleName"
                      placeholder="Enter middle name"
                      value={studentData.middleName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessPin">Access Pin</Label>
                  <Input
                    id="accessPin"
                    name="accessPin"
                    type="password"
                    placeholder="Enter access pin"
                    value={studentData.accessPin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={studentData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={studentData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passport">Upload Passport Photo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="passport"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      <span>Choose File</span>
                    </Button>
                  </div>
                  {studentData.passport && (
                    <p className="text-sm text-green-600 mt-1">File selected: {studentData.passport.name}</p>
                  )}
                </div>
              </form>
            )}

            {/* Step 2 - Personal Information */}
            {activeStep === 2 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select id="gender" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="Enter nationality"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter home address"
                    required
                  />
                </div>
              </form>
            )}

            {/* Step 3 - Class Information */}
            {activeStep === 3 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="level">Education Level</Label>
                    <select id="level" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Level</option>
                      <option value="primary">Primary</option>
                      <option value="junior">Junior Secondary</option>
                      <option value="senior">Senior Secondary</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <select id="class" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Class</option>
                      <option value="class1">Class 1</option>
                      <option value="class2">Class 2</option>
                      <option value="class3">Class 3</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <select id="department" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Department</option>
                      <option value="science">Science</option>
                      <option value="arts">Arts</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <select id="section" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Section</option>
                      <option value="a">Section A</option>
                      <option value="b">Section B</option>
                      <option value="c">Section C</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Admission Date</Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    required
                  />
                </div>
              </form>
            )}

            {/* Step 4 - Parent Information */}
            {activeStep === 4 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input
                      id="parentName"
                      placeholder="Enter parent/guardian name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <select id="relationship" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="">Select Relationship</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input
                      id="parentPhone"
                      placeholder="Enter parent phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="Enter parent email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentAddress">Home Address</Label>
                  <Input
                    id="parentAddress"
                    placeholder="Enter parent address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Enter parent occupation"
                    required
                  />
                </div>
              </form>
            )}

            <div className="flex justify-between mt-8">
              {activeStep > 1 ? (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {activeStep < steps.length ? (
                <Button 
                  type="button"
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
                  onClick={handleNext}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="button"
                  className="bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStudent;
