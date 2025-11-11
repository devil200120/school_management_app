import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Switch } from "../../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
  MapPin,
} from "lucide-react";

// Mock application PINs pool - In real app, this would come from API
const mockApplicationPins = [
  { id: 1, pin: "APP-7835-4592-1928", status: "active", session: "2024/2025" },
  { id: 2, pin: "APP-5432-8765-9012", status: "active", session: "2024/2025" },
  { id: 3, pin: "APP-2468-1357-9081", status: "active", session: "2024/2025" },
  { id: 4, pin: "APP-8642-9753-1840", status: "active", session: "2024/2025" },
  { id: 5, pin: "APP-3691-2584-7059", status: "active", session: "2024/2025" },
  { id: 6, pin: "APP-1597-3682-4571", status: "active", session: "2024/2025" },
];

const AddStudent = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [generatedStudentId, setGeneratedStudentId] = useState("");
  const [errors, setErrors] = useState({});

  // PIN management states
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const [isFetchingPin, setIsFetchingPin] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pinStatus, setPinStatus] = useState({ type: "", message: "" });
  const [availablePins, setAvailablePins] = useState([...mockApplicationPins]);

  // Nationality auto-detection states
  const [isDetectingCountry, setIsDetectingCountry] = useState(false);
  const [countryDetectionStatus, setCountryDetectionStatus] = useState({
    type: "",
    message: "",
  });
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(true);

  // Admission date auto-detection states
  const [autoDateEnabled, setAutoDateEnabled] = useState(true);
  const [dateStatus, setDateStatus] = useState({ type: "", message: "" });

  // PIN Management Functions - Define before useEffect
  const fetchAvailablePin = useCallback(async () => {
    setIsFetchingPin(true);
    setPinStatus({ type: "loading", message: "Fetching available PIN..." });

    try {
      // Simulate API call to get available PIN
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Find an active PIN
      const activePins = availablePins.filter((pin) => pin.status === "active");

      if (activePins.length === 0) {
        setPinStatus({
          type: "error",
          message: "No available PINs found. Please generate new PINs first.",
        });
        toast({
          title: "No Available PINs",
          description:
            "Please contact administrator to generate new application PINs.",
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      // Get the first available PIN
      const selectedPin = activePins[0];

      // Update student data with the fetched PIN
      setStudentData((prev) => ({
        ...prev,
        accessPin: selectedPin.pin,
      }));

      // Mark PIN as reserved (in real app, this would be an API call)
      setAvailablePins((prev) =>
        prev.map((pin) =>
          pin.id === selectedPin.id ? { ...pin, status: "reserved" } : pin
        )
      );

      setPinStatus({
        type: "success",
        message: `PIN ${selectedPin.pin} successfully assigned!`,
      });

      toast({
        title: "PIN Auto-Fetched",
        description: `Access PIN ${selectedPin.pin} has been automatically assigned.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error fetching PIN:", error);
      setPinStatus({
        type: "error",
        message: "Failed to fetch PIN. Please try again.",
      });
      toast({
        title: "Error",
        description: "Failed to fetch available PIN. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsFetchingPin(false);
    }
  }, [availablePins, toast]);

  // Country Detection Functions
  const detectCountryFromLocation = useCallback(async () => {
    setIsDetectingCountry(true);
    setCountryDetectionStatus({
      type: "loading",
      message: "Detecting your location...",
    });

    try {
      // Get user's location
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          (error) => reject(error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      });

      const { latitude, longitude } = position.coords;

      // Use a reverse geocoding service to get country
      // For this implementation, I'll use a simple IP-based detection as backup
      // In production, you might want to use services like:
      // - Google Maps Geocoding API
      // - OpenCage Geocoding API
      // - ipapi.com for IP-based detection

      // Simulate API call for country detection
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Map coordinates to countries (simplified for demo)
      let detectedCountry = "Unknown";
      let countryCode = "";

      // Simple coordinate-based country detection (you'd use a real service)
      if (
        latitude >= 4.0 &&
        latitude <= 14.0 &&
        longitude >= 2.5 &&
        longitude <= 14.5
      ) {
        detectedCountry = "Nigerian";
        countryCode = "NG";
      } else if (
        latitude >= 25.0 &&
        latitude <= 49.0 &&
        longitude >= -125.0 &&
        longitude <= -66.0
      ) {
        detectedCountry = "American";
        countryCode = "US";
      } else if (
        latitude >= 49.5 &&
        latitude <= 60.5 &&
        longitude >= -141.0 &&
        longitude <= -52.0
      ) {
        detectedCountry = "Canadian";
        countryCode = "CA";
      } else if (
        latitude >= 35.0 &&
        latitude <= 71.0 &&
        longitude >= -10.0 &&
        longitude <= 40.0
      ) {
        detectedCountry = "European";
        countryCode = "EU";
      } else {
        // Fallback: Try IP-based detection
        try {
          const ipResponse = await fetch("https://ipapi.co/json/");
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            detectedCountry = ipData.country_name
              ? `${ipData.country_name} citizen`
              : "Unknown";
            countryCode = ipData.country_code || "";
          }
        } catch (ipError) {
          console.warn("IP-based detection failed:", ipError);
          // Default to Nigerian for this school system
          detectedCountry = "Nigerian";
          countryCode = "NG";
        }
      }

      // Update nationality field
      setStudentData((prev) => ({
        ...prev,
        nationality: detectedCountry,
      }));

      setCountryDetectionStatus({
        type: "success",
        message: `Country detected: ${detectedCountry}`,
      });

      toast({
        title: "Location Detected",
        description: `Nationality automatically set to: ${detectedCountry}`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Location detection failed:", error);

      // Fallback to default nationality (Nigerian for this school system)
      const defaultNationality = "Nigerian";
      setStudentData((prev) => ({
        ...prev,
        nationality: defaultNationality,
      }));

      setCountryDetectionStatus({
        type: "warning",
        message: `Location access denied. Defaulted to: ${defaultNationality}`,
      });

      toast({
        title: "Location Detection Failed",
        description: `Defaulted nationality to: ${defaultNationality}. You can change this manually.`,
        variant: "default",
        duration: 4000,
      });
    } finally {
      setIsDetectingCountry(false);
    }
  }, [toast]);

  // Auto-fetch current date function
  const setCurrentDate = useCallback(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format

    setStudentData((prev) => ({
      ...prev,
      admissionDate: formattedDate,
    }));

    setDateStatus({
      type: "success",
      message: `Admission date set to: ${formattedDate}`,
    });

    toast({
      title: "Date Auto-filled",
      description: `Admission date set to today: ${formattedDate}`,
      variant: "default",
      duration: 3000,
    });
  }, [toast]);

  // Complete student data state
  const [studentData, setStudentData] = useState({
    // Step 1 - Basic Account Credential
    firstName: "",
    middleName: "",
    lastName: "",
    accessPin: "",
    email: "",
    phone: "",
    passport: null,

    // Step 2 - Personal Information
    gender: "",
    dateOfBirth: "",
    nationality: "",
    bloodGroup: "",
    address: "",
    stateOfOrigin: "",
    localGovernment: "",

    // Step 3 - Class Information
    level: "",
    class: "",
    department: "",
    section: "",
    admissionDate: "",
    session: "",
    admissionNumber: "", // Custom admission number field
    useCustomAdmissionNumber: false, // Toggle for custom vs auto-generated

    // Step 4 - Parent Information
    parentName: "",
    relationship: "",
    parentPhone: "",
    parentEmail: "",
    parentAddress: "",
    occupation: "",
    parentNationality: "",
    emergencyContact: "",
  });

  // Generate initial admission number on component mount and auto-fetch PIN
  useEffect(() => {
    if (!studentData.admissionNumber) {
      setStudentData((prev) => ({
        ...prev,
        admissionNumber: generateAdmissionNumber(),
      }));
    }

    // Auto-fetch PIN when component mounts if enabled
    if (!studentData.accessPin && autoFetchEnabled) {
      fetchAvailablePin();
    }
  }, [
    studentData.admissionNumber,
    studentData.accessPin,
    autoFetchEnabled,
    fetchAvailablePin,
  ]);

  // Auto-detect nationality on component mount if enabled
  useEffect(() => {
    if (!studentData.nationality && autoDetectEnabled) {
      detectCountryFromLocation();
    }
  }, [studentData.nationality, autoDetectEnabled, detectCountryFromLocation]);

  // Auto-set admission date on component mount if enabled
  useEffect(() => {
    if (!studentData.admissionDate && autoDateEnabled) {
      setCurrentDate();
    }
  }, [studentData.admissionDate, autoDateEnabled, setCurrentDate]);

  const toggleAutoFetch = useCallback(() => {
    setAutoFetchEnabled(!autoFetchEnabled);
    if (!autoFetchEnabled && !studentData.accessPin) {
      fetchAvailablePin();
    }

    toast({
      title: autoFetchEnabled ? "Auto-fetch Disabled" : "Auto-fetch Enabled",
      description: autoFetchEnabled
        ? "You can now enter PINs manually"
        : "PINs will be fetched automatically",
      duration: 2000,
    });
  }, [autoFetchEnabled, studentData.accessPin, fetchAvailablePin, toast]);

  const manualPinRefresh = useCallback(() => {
    if (isFetchingPin) return;
    fetchAvailablePin();
  }, [isFetchingPin, fetchAvailablePin]);

  const clearPin = useCallback(() => {
    setStudentData((prev) => ({
      ...prev,
      accessPin: "",
    }));
    setPinStatus({ type: "", message: "" });

    toast({
      title: "PIN Cleared",
      description: "You can now enter a PIN manually or fetch a new one.",
      duration: 2000,
    });
  }, [toast]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      setStudentData({
        ...studentData,
        passport: file,
      });

      toast({
        title: "File Selected",
        description: `Selected: ${file.name}`,
        duration: 2000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setStudentData({
      ...studentData,
      [name]: value,
    });

    // Clear error when user selects
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validation functions for each step
  const validateStep1 = () => {
    const stepErrors = {};

    if (!studentData.firstName.trim())
      stepErrors.firstName = "First name is required";
    if (!studentData.lastName.trim())
      stepErrors.lastName = "Last name is required";
    if (!studentData.accessPin.trim())
      stepErrors.accessPin = "Access PIN is required";
    if (studentData.accessPin.length < 4)
      stepErrors.accessPin = "Access PIN must be at least 4 characters";
    if (!studentData.email.trim()) stepErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(studentData.email))
      stepErrors.email = "Email is invalid";
    if (!studentData.phone.trim())
      stepErrors.phone = "Phone number is required";
    if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(studentData.phone))
      stepErrors.phone = "Phone number is invalid";

    return stepErrors;
  };

  const validateStep2 = () => {
    const stepErrors = {};

    if (!studentData.gender) stepErrors.gender = "Gender is required";
    if (!studentData.dateOfBirth)
      stepErrors.dateOfBirth = "Date of birth is required";
    if (!studentData.nationality.trim())
      stepErrors.nationality = "Nationality is required";
    if (!studentData.address.trim()) stepErrors.address = "Address is required";

    return stepErrors;
  };

  const validateStep3 = () => {
    const stepErrors = {};

    if (!studentData.level) stepErrors.level = "Education level is required";
    if (!studentData.class) stepErrors.class = "Class is required";
    if (!studentData.section) stepErrors.section = "Section is required";
    if (!studentData.admissionDate)
      stepErrors.admissionDate = "Admission date is required";
    if (!studentData.admissionNumber)
      stepErrors.admissionNumber = "Admission number is required";
    if (!studentData.session) stepErrors.session = "Session is required";

    return stepErrors;
  };

  const validateStep4 = () => {
    const stepErrors = {};

    if (!studentData.parentName.trim())
      stepErrors.parentName = "Parent/Guardian name is required";
    if (!studentData.relationship)
      stepErrors.relationship = "Relationship is required";
    if (!studentData.parentPhone.trim())
      stepErrors.parentPhone = "Parent phone number is required";
    if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(studentData.parentPhone))
      stepErrors.parentPhone = "Parent phone number is invalid";
    if (!studentData.parentEmail.trim())
      stepErrors.parentEmail = "Parent email is required";
    if (!/\S+@\S+\.\S+/.test(studentData.parentEmail))
      stepErrors.parentEmail = "Parent email is invalid";
    if (!studentData.occupation.trim())
      stepErrors.occupation = "Parent occupation is required";

    return stepErrors;
  };

  const handleNext = () => {
    let stepErrors = {};

    // Validate current step
    switch (activeStep) {
      case 1:
        stepErrors = validateStep1();
        break;
      case 2:
        stepErrors = validateStep2();
        break;
      case 3:
        stepErrors = validateStep3();
        break;
      case 4:
        stepErrors = validateStep4();
        break;
      default:
        break;
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setErrors({});
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      toast({
        title: "Step Completed",
        description: `Step ${activeStep} completed successfully!`,
        duration: 2000,
      });
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const generateStudentId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `STU-${year}-${randomNum}`;
  };

  const generateAdmissionNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `ADM${year}${month}${randomNum}`;
  };

  const handleCustomAdmissionToggle = (useCustom) => {
    setStudentData((prev) => ({
      ...prev,
      useCustomAdmissionNumber: useCustom,
      admissionNumber: useCustom
        ? prev.admissionNumber
        : generateAdmissionNumber(),
    }));
  };

  const handleSubmit = async () => {
    // Final validation
    const allErrors = {
      ...validateStep1(),
      ...validateStep2(),
      ...validateStep3(),
      ...validateStep4(),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      toast({
        title: "Validation Error",
        description: "Please complete all required fields in all steps.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Generate student ID
      const studentId = generateStudentId();
      setGeneratedStudentId(studentId);

      // Show success dialog
      setShowSuccessDialog(true);

      toast({
        title: "Registration Successful!",
        description: `Student ${studentData.firstName} ${studentData.lastName} has been registered successfully.`,
        duration: 4000,
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          "There was an error registering the student. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStudentData({
      firstName: "",
      middleName: "",
      lastName: "",
      accessPin: "",
      email: "",
      phone: "",
      passport: null,
      gender: "",
      dateOfBirth: "",
      nationality: "",
      bloodGroup: "",
      address: "",
      stateOfOrigin: "",
      localGovernment: "",
      level: "",
      class: "",
      department: "",
      section: "",
      admissionDate: "",
      session: "",
      admissionNumber: "",
      useCustomAdmissionNumber: false,
      parentName: "",
      relationship: "",
      parentPhone: "",
      parentEmail: "",
      parentAddress: "",
      occupation: "",
      parentNationality: "",
      emergencyContact: "",
    });
    setActiveStep(1);
    setErrors({});
    setShowSuccessDialog(false);
    setGeneratedStudentId("");
  };

  const steps = [
    { id: 1, label: "Basic Account Credential" },
    { id: 2, label: "Personal Information" },
    { id: 3, label: "Class Information" },
    { id: 4, label: "Parent Information" },
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
                    <rect
                      x="60"
                      y="120"
                      width="80"
                      height="80"
                      fill="#9b87f5"
                      rx="10"
                    />
                    <circle cx="85" cy="65" r="8" fill="white" />
                    <circle cx="115" cy="65" r="8" fill="white" />
                    <circle cx="85" cy="65" r="4" fill="black" />
                    <circle cx="115" cy="65" r="4" fill="black" />
                    <path
                      d="M 85 90 Q 100 100 115 90"
                      stroke="white"
                      strokeWidth="3"
                      fill="transparent"
                    />
                    <rect x="90" y="110" width="20" height="30" fill="white" />
                    <rect
                      x="75"
                      y="140"
                      width="20"
                      height="10"
                      fill="#7E69AB"
                    />
                    <rect
                      x="105"
                      y="140"
                      width="20"
                      height="10"
                      fill="#7E69AB"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mt-4">Student Registration</h3>
                <p className="text-gray-500 mt-2">
                  Fill out the form to register a new student in the system.
                </p>
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
                    className={`flex flex-col items-center ${
                      activeStep === step.id
                        ? "text-eduos-primary font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                        ${
                          activeStep === step.id
                            ? "bg-eduos-primary text-white"
                            : activeStep > step.id
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {activeStep > step.id ? "✓" : step.id}
                    </div>
                    <span className="text-xs text-center hidden sm:block">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Step 1 - Basic Account Credential */}
            {activeStep === 1 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Student First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      value={studentData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-500" : ""}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
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
                  <Label htmlFor="lastName">Student Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    value={studentData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="accessPin">Access Pin *</Label>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          availablePins.filter((p) => p.status === "active")
                            .length > 0
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {
                          availablePins.filter((p) => p.status === "active")
                            .length
                        }{" "}
                        Available
                      </Badge>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={toggleAutoFetch}
                        className="text-xs"
                        disabled={isFetchingPin}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {autoFetchEnabled ? "Manual" : "Auto"}
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      id="accessPin"
                      name="accessPin"
                      type={showPin ? "text" : "password"}
                      placeholder={
                        autoFetchEnabled
                          ? "PIN will be fetched automatically..."
                          : "Enter access pin (minimum 4 characters)"
                      }
                      value={studentData.accessPin}
                      onChange={handleInputChange}
                      className={`${
                        errors.accessPin ? "border-red-500" : ""
                      } pr-20`}
                      disabled={
                        isFetchingPin ||
                        (autoFetchEnabled && !studentData.accessPin)
                      }
                      required
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
                      {/* PIN Visibility Toggle */}
                      {studentData.accessPin && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPin(!showPin)}
                          className="h-6 w-6 p-0"
                          tabIndex={-1}
                        >
                          {showPin ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                      )}

                      {/* Manual Refresh/Clear Buttons */}
                      {autoFetchEnabled ? (
                        <div className="flex gap-1">
                          {studentData.accessPin ? (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={clearPin}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              title="Clear PIN"
                              tabIndex={-1}
                            >
                              <AlertTriangle className="w-3 h-3" />
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={manualPinRefresh}
                              disabled={isFetchingPin}
                              className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
                              title="Fetch PIN"
                              tabIndex={-1}
                            >
                              {isFetchingPin ? (
                                <div className="w-3 h-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                              ) : (
                                <Shield className="w-3 h-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* PIN Status Display */}
                  {pinStatus.message && (
                    <div
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-md ${
                        pinStatus.type === "success"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : pinStatus.type === "error"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {pinStatus.type === "loading" && (
                        <div className="w-3 h-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      )}
                      {pinStatus.type === "success" && (
                        <Shield className="w-3 h-3 text-green-600" />
                      )}
                      {pinStatus.type === "error" && (
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                      )}
                      <span>{pinStatus.message}</span>
                    </div>
                  )}

                  {errors.accessPin && (
                    <p className="text-sm text-red-500">{errors.accessPin}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={studentData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={studentData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passport">Upload Passport Photo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="passport"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-eduos-primary file:text-white hover:file:bg-eduos-secondary"
                    />
                  </div>
                  {studentData.passport && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      File selected: {studentData.passport.name}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </form>
            )}

            {/* Step 2 - Personal Information */}
            {activeStep === 2 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={studentData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.gender ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={studentData.dateOfBirth}
                      onChange={handleInputChange}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                      required
                    />
                    {errors.dateOfBirth && (
                      <p className="text-sm text-red-500">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="nationality"
                      className="flex items-center gap-2"
                    >
                      Nationality *
                      <Badge variant="outline" className="text-xs">
                        {autoDetectEnabled ? "Auto-detecting" : "Manual entry"}
                      </Badge>
                    </Label>

                    <div className="flex gap-2">
                      <Input
                        id="nationality"
                        name="nationality"
                        placeholder="Nationality will be detected automatically..."
                        value={studentData.nationality}
                        onChange={handleInputChange}
                        className={errors.nationality ? "border-red-500" : ""}
                        required
                        disabled={isDetectingCountry}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={detectCountryFromLocation}
                        disabled={isDetectingCountry}
                        className="px-3"
                      >
                        {isDetectingCountry ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            Detecting...
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 mr-1" />
                            Detect
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Status indicator */}
                    {countryDetectionStatus.type && (
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          countryDetectionStatus.type === "success"
                            ? "text-green-600"
                            : countryDetectionStatus.type === "error"
                            ? "text-red-600"
                            : countryDetectionStatus.type === "warning"
                            ? "text-amber-600"
                            : "text-blue-600"
                        }`}
                      >
                        {countryDetectionStatus.type === "success" && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {countryDetectionStatus.type === "error" && (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {countryDetectionStatus.type === "warning" && (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        {countryDetectionStatus.type === "loading" && (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                        {countryDetectionStatus.message}
                      </div>
                    )}

                    {/* Auto-detect toggle */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-detect-country"
                        checked={autoDetectEnabled}
                        onCheckedChange={setAutoDetectEnabled}
                      />
                      <Label
                        htmlFor="auto-detect-country"
                        className="text-sm cursor-pointer"
                      >
                        Auto-detect nationality from location
                      </Label>
                    </div>

                    {errors.nationality && (
                      <p className="text-sm text-red-500">
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select
                      value={studentData.bloodGroup}
                      onValueChange={(value) =>
                        handleSelectChange("bloodGroup", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter home address"
                    value={studentData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                    required
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stateOfOrigin">State of Origin</Label>
                    <Input
                      id="stateOfOrigin"
                      name="stateOfOrigin"
                      placeholder="Enter state of origin"
                      value={studentData.stateOfOrigin}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Step 3 - Class Information */}
            {activeStep === 3 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="level">Education Level *</Label>
                    <Select
                      value={studentData.level}
                      onValueChange={(value) =>
                        handleSelectChange("level", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.level ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="junior">Junior Secondary</SelectItem>
                        <SelectItem value="senior">Senior Secondary</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.level && (
                      <p className="text-sm text-red-500">{errors.level}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class *</Label>
                    <Select
                      value={studentData.class}
                      onValueChange={(value) =>
                        handleSelectChange("class", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.class ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary-1">Primary 1</SelectItem>
                        <SelectItem value="primary-2">Primary 2</SelectItem>
                        <SelectItem value="primary-3">Primary 3</SelectItem>
                        <SelectItem value="primary-4">Primary 4</SelectItem>
                        <SelectItem value="primary-5">Primary 5</SelectItem>
                        <SelectItem value="primary-6">Primary 6</SelectItem>
                        <SelectItem value="jss-1">JSS 1</SelectItem>
                        <SelectItem value="jss-2">JSS 2</SelectItem>
                        <SelectItem value="jss-3">JSS 3</SelectItem>
                        <SelectItem value="sss-1">SSS 1</SelectItem>
                        <SelectItem value="sss-2">SSS 2</SelectItem>
                        <SelectItem value="sss-3">SSS 3</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.class && (
                      <p className="text-sm text-red-500">{errors.class}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={studentData.department}
                      onValueChange={(value) =>
                        handleSelectChange("department", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section *</Label>
                    <Select
                      value={studentData.section}
                      onValueChange={(value) =>
                        handleSelectChange("section", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.section ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Section A</SelectItem>
                        <SelectItem value="b">Section B</SelectItem>
                        <SelectItem value="c">Section C</SelectItem>
                        <SelectItem value="d">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.section && (
                      <p className="text-sm text-red-500">{errors.section}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="admissionDate"
                      className="flex items-center gap-2"
                    >
                      Admission Date *
                      <Badge variant="outline" className="text-xs">
                        {autoDateEnabled ? "Auto-filled" : "Manual entry"}
                      </Badge>
                    </Label>

                    <div className="flex gap-2">
                      <Input
                        id="admissionDate"
                        name="admissionDate"
                        type="date"
                        value={studentData.admissionDate}
                        onChange={handleInputChange}
                        className={errors.admissionDate ? "border-red-500" : ""}
                        required
                      />

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={setCurrentDate}
                        className="px-3"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Today
                      </Button>
                    </div>

                    {/* Status indicator */}
                    {dateStatus.type && (
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          dateStatus.type === "success"
                            ? "text-green-600"
                            : dateStatus.type === "error"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {dateStatus.type === "success" && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        {dateStatus.type === "error" && (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {dateStatus.message}
                      </div>
                    )}

                    {/* Auto-date toggle */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-date"
                        checked={autoDateEnabled}
                        onCheckedChange={setAutoDateEnabled}
                      />
                      <Label
                        htmlFor="auto-date"
                        className="text-sm cursor-pointer"
                      >
                        Auto-fill admission date with today&apos;s date
                      </Label>
                    </div>

                    {errors.admissionDate && (
                      <p className="text-sm text-red-500">
                        {errors.admissionDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admissionNumber">
                        Admission Number *
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="customAdmissionToggle"
                          checked={studentData.useCustomAdmissionNumber}
                          onChange={(e) =>
                            handleCustomAdmissionToggle(e.target.checked)
                          }
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor="customAdmissionToggle"
                          className="text-sm"
                        >
                          Custom
                        </Label>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="admissionNumber"
                        name="admissionNumber"
                        value={studentData.admissionNumber}
                        onChange={handleInputChange}
                        placeholder={
                          studentData.useCustomAdmissionNumber
                            ? "Enter custom admission number"
                            : "Auto-generated"
                        }
                        className={
                          errors.admissionNumber ? "border-red-500" : ""
                        }
                        readOnly={!studentData.useCustomAdmissionNumber}
                        required
                      />
                      {!studentData.useCustomAdmissionNumber && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const newAdmissionNumber =
                              generateAdmissionNumber();
                            setStudentData((prev) => ({
                              ...prev,
                              admissionNumber: newAdmissionNumber,
                            }));
                          }}
                          className="whitespace-nowrap"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {errors.admissionNumber && (
                      <p className="text-sm text-red-500">
                        {errors.admissionNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="session">Academic Session *</Label>
                    <Select
                      value={studentData.session}
                      onValueChange={(value) =>
                        handleSelectChange("session", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.session ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                        <SelectItem value="2026-2027">2026-2027</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.session && (
                      <p className="text-sm text-red-500">{errors.session}</p>
                    )}
                  </div>
                </div>
              </form>
            )}

            {/* Step 4 - Parent Information */}
            {activeStep === 4 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      placeholder="Enter parent/guardian name"
                      value={studentData.parentName}
                      onChange={handleInputChange}
                      className={errors.parentName ? "border-red-500" : ""}
                      required
                    />
                    {errors.parentName && (
                      <p className="text-sm text-red-500">
                        {errors.parentName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select
                      value={studentData.relationship}
                      onValueChange={(value) =>
                        handleSelectChange("relationship", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.relationship ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="uncle">Uncle</SelectItem>
                        <SelectItem value="aunt">Aunt</SelectItem>
                        <SelectItem value="grandparent">Grandparent</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.relationship && (
                      <p className="text-sm text-red-500">
                        {errors.relationship}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      name="parentPhone"
                      placeholder="Enter parent phone number"
                      value={studentData.parentPhone}
                      onChange={handleInputChange}
                      className={errors.parentPhone ? "border-red-500" : ""}
                      required
                    />
                    {errors.parentPhone && (
                      <p className="text-sm text-red-500">
                        {errors.parentPhone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email *</Label>
                    <Input
                      id="parentEmail"
                      name="parentEmail"
                      type="email"
                      placeholder="Enter parent email"
                      value={studentData.parentEmail}
                      onChange={handleInputChange}
                      className={errors.parentEmail ? "border-red-500" : ""}
                      required
                    />
                    {errors.parentEmail && (
                      <p className="text-sm text-red-500">
                        {errors.parentEmail}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentAddress">Home Address</Label>
                  <Input
                    id="parentAddress"
                    name="parentAddress"
                    placeholder="Enter parent address"
                    value={studentData.parentAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation *</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      placeholder="Enter parent occupation"
                      value={studentData.occupation}
                      onChange={handleInputChange}
                      className={errors.occupation ? "border-red-500" : ""}
                      required
                    />
                    {errors.occupation && (
                      <p className="text-sm text-red-500">
                        {errors.occupation}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      placeholder="Enter emergency contact number"
                      value={studentData.emergencyContact}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={activeStep === 1 || isSubmitting}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Previous
              </Button>

              {activeStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-eduos-primary text-white hover:bg-eduos-secondary"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding Student...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      Add Student
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              Registration Successful!
            </DialogTitle>
            <DialogDescription>
              The student has been successfully registered in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm">
                <p className="font-semibold text-green-800">Student Details:</p>
                <p className="text-green-700">
                  <span className="font-medium">Name:</span>{" "}
                  {studentData.firstName} {studentData.lastName}
                </p>
                <p className="text-green-700">
                  <span className="font-medium">Student ID:</span>{" "}
                  {generatedStudentId}
                </p>
                <p className="text-green-700">
                  <span className="font-medium">Class:</span>{" "}
                  {studentData.class} - {studentData.section}
                </p>
                <p className="text-green-700">
                  <span className="font-medium">Session:</span>{" "}
                  {studentData.session}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessDialog(false);
                // Create a detailed student profile view
                const studentProfile = `
STUDENT PROFILE
===============

PERSONAL INFORMATION:
Name: ${studentData.firstName} ${studentData.middleName} ${studentData.lastName}
Student ID: ${generatedStudentId}
Admission Number: ${studentData.admissionNumber}
Email: ${studentData.email}
Phone: ${studentData.phone}
Gender: ${studentData.gender}
Date of Birth: ${studentData.dateOfBirth}
Nationality: ${studentData.nationality}
Blood Group: ${studentData.bloodGroup || "Not specified"}
Address: ${studentData.address}
State of Origin: ${studentData.stateOfOrigin || "Not specified"}

ACADEMIC INFORMATION:
Education Level: ${studentData.level}
Class: ${studentData.class}
Department: ${studentData.department || "Not specified"}
Section: ${studentData.section}
Academic Session: ${studentData.session}
Admission Date: ${studentData.admissionDate}

PARENT/GUARDIAN INFORMATION:
Name: ${studentData.parentName}
Relationship: ${studentData.relationship}
Phone: ${studentData.parentPhone}
Email: ${studentData.parentEmail}
Address: ${studentData.parentAddress || "Not specified"}
Occupation: ${studentData.occupation}
Emergency Contact: ${studentData.emergencyContact || "Not specified"}

Registration Date: ${new Date().toLocaleDateString()}
Status: Active
                `;

                // Open in new window or alert
                if (
                  window.confirm(
                    "Would you like to view the complete student profile?"
                  )
                ) {
                  const newWindow = window.open("", "_blank");
                  newWindow.document.write(`
                    <html>
                      <head><title>Student Profile - ${studentData.firstName} ${studentData.lastName}</title></head>
                      <body style="font-family: monospace; white-space: pre-wrap; padding: 20px; line-height: 1.4;">
                        ${studentProfile}
                      </body>
                    </html>
                  `);
                  newWindow.document.close();
                }
              }}
            >
              View Student
            </Button>
            <Button
              onClick={resetForm}
              className="bg-eduos-primary hover:bg-eduos-secondary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Add Another Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddStudent;
