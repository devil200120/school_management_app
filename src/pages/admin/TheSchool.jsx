
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Textarea } from '../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Settings, FileImage, Mail, BookText, CreditCard, FileText, Upload, Bell, Save, Users } from 'lucide-react';

const TheSchool = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [paymentGateway, setPaymentGateway] = useState('paystack');
  const [smtpType, setSmtpType] = useState('none');
  const [onlineApplication, setOnlineApplication] = useState(true);
  const [freeResultCheck, setFreeResultCheck] = useState(false);
  const [printExamPass, setPrintExamPass] = useState(true);
  const [showExamScoreImmediately, setShowExamScoreImmediately] = useState(true);
  const [displayPreloadSpinner, setDisplayPreloadSpinner] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState('temp1');
  
  const handleSaveSettings = (section) => {
    toast.success(`${section} settings saved successfully`);
  };

  const resultTemplateOptions = [
    { value: 'temp1', label: 'Primary Level Template', preview: '/placeholder.svg' },
    { value: 'temp2', label: 'JSS Secondary Level Template', preview: '/placeholder.svg' },
    { value: 'temp3', label: 'Nursery Level Template', preview: '/placeholder.svg' },
    { value: 'temp4', label: 'SSS Secondary Level Template', preview: '/placeholder.svg' },
    { value: 'temp5', label: 'Summer Lesson Template', preview: '/placeholder.svg' },
  ];

  const templateStyles = {
    temp1: {
      name: "Primary Level Template",
      previewClass: "bg-gradient-to-r from-blue-50 to-indigo-50",
      headerClass: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
      borderClass: "border-blue-400",
      accentClass: "bg-blue-100",
      titleClass: "text-blue-700",
      detailsClass: "bg-white shadow-sm",
    },
    temp2: {
      name: "JSS Secondary Level Template",
      previewClass: "bg-gradient-to-r from-purple-50 to-pink-50",
      headerClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      borderClass: "border-purple-400",
      accentClass: "bg-purple-100",
      titleClass: "text-purple-700",
      detailsClass: "bg-white shadow-sm",
    },
    temp3: {
      name: "Nursery Level Template",
      previewClass: "bg-gradient-to-r from-green-50 to-teal-50",
      headerClass: "bg-gradient-to-br from-green-500 to-teal-500 text-white",
      borderClass: "border-green-400",
      accentClass: "bg-green-100",
      titleClass: "text-green-700",
      detailsClass: "bg-white shadow-sm",
    },
    temp4: {
      name: "SSS Secondary Level Template",
      previewClass: "bg-gradient-to-r from-gray-50 to-slate-100",
      headerClass: "bg-gradient-to-r from-gray-700 to-slate-900 text-white",
      borderClass: "border-gray-400",
      accentClass: "bg-gray-100",
      titleClass: "text-gray-700",
      detailsClass: "bg-white shadow-sm",
    },
    temp5: {
      name: "Summer Lesson Template",
      previewClass: "bg-gradient-to-r from-amber-50 to-orange-50",
      headerClass: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
      borderClass: "border-amber-400",
      accentClass: "bg-amber-100",
      titleClass: "text-amber-700",
      detailsClass: "bg-white shadow-sm",
    },
  };

  const terms = [
    { value: '1', label: 'First Term' },
    { value: '2', label: 'Second Term' },
    { value: '3', label: 'Third Term' },
  ];

  const levels = [
    { value: 'primary', label: 'Primary Level' },
    { value: 'jss', label: 'JSS Level' },
    { value: 'sss', label: 'SSS Level' },
    { value: 'nursery', label: 'Nursery Level' },
  ];

  const sessions = [
    { value: '2023-2024', label: '2023-2024' },
    { value: '2024-2025', label: '2024-2025' },
    { value: '2025-2026', label: '2025-2026' },
  ];

  const dummyGrades = [
    { range: '85-100', grade: 'A', remark: 'Excellent' },
    { range: '75-84', grade: 'B', remark: 'Very Good' },
    { range: '65-74', grade: 'C', remark: 'Good' },
    { range: '55-64', grade: 'D', remark: 'Fair' },
    { range: '45-54', grade: 'E', remark: 'Poor' },
    { range: '0-44', grade: 'F', remark: 'Very Poor' },
  ];

  const dummyMarks = [
    { level: 'Primary', exam: 60, firstCA: 15, secondCA: 15, assignment: 10 },
    { level: 'JSS', exam: 70, firstCA: 10, secondCA: 10, assignment: 10 },
    { level: 'SSS', exam: 70, firstCA: 15, secondCA: 10, assignment: 5 },
    { level: 'Nursery', exam: 50, firstCA: 20, secondCA: 20, assignment: 10 },
  ];

  const renderTemplatePreview = (templateId) => {
    const style = templateStyles[templateId];
    
    return (
      <div className={`w-full h-full rounded-md overflow-hidden border ${style.borderClass} shadow-md`}>
        {/* Header */}
        <div className={`p-3 ${style.headerClass}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xs font-bold">LOGO</div>
              <div>
                <h3 className="font-bold text-sm">EDUOS ACADEMY</h3>
                <p className="text-xs opacity-80">Excellence in Education</p>
              </div>
            </div>
            <div className="text-right">
              <h4 className="text-sm font-semibold">REPORT CARD</h4>
              <p className="text-xs">2024/2025 Session</p>
            </div>
          </div>
        </div>
        
        {/* Student Info */}
        <div className={`p-2 ${style.accentClass} text-xs grid grid-cols-2 gap-1`}>
          <div>Name: <span className="font-medium">John Doe</span></div>
          <div>Class: <span className="font-medium">Primary 5</span></div>
          <div>Admission No: <span className="font-medium">P/2024/001</span></div>
          <div>Term: <span className="font-medium">First Term</span></div>
        </div>
        
        {/* Grades Table */}
        <div className="p-2">
          <div className={`text-xs font-bold mb-1 ${style.titleClass}`}>ACADEMIC PERFORMANCE</div>
          <div className="border rounded-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className={style.accentClass}>
                <tr className="border-b">
                  <th className="p-1 text-left">Subject</th>
                  <th className="p-1 text-center w-8">CA1</th>
                  <th className="p-1 text-center w-8">CA2</th>
                  <th className="p-1 text-center w-8">Exam</th>
                  <th className="p-1 text-center w-8">Total</th>
                  <th className="p-1 text-center w-8">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-1">Mathematics</td>
                  <td className="p-1 text-center">14</td>
                  <td className="p-1 text-center">12</td>
                  <td className="p-1 text-center">55</td>
                  <td className="p-1 text-center">81</td>
                  <td className="p-1 text-center font-bold">B</td>
                </tr>
                <tr className="border-b">
                  <td className="p-1">English</td>
                  <td className="p-1 text-center">15</td>
                  <td className="p-1 text-center">14</td>
                  <td className="p-1 text-center">58</td>
                  <td className="p-1 text-center">87</td>
                  <td className="p-1 text-center font-bold">A</td>
                </tr>
                <tr>
                  <td className="p-1">Science</td>
                  <td className="p-1 text-center">13</td>
                  <td className="p-1 text-center">11</td>
                  <td className="p-1 text-center">52</td>
                  <td className="p-1 text-center">76</td>
                  <td className="p-1 text-center font-bold">B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className={`p-2 text-xs ${style.detailsClass}`}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <div className="font-semibold">Attendance</div>
              <div>School Days: 62</div>
              <div>Present: 58</div>
            </div>
            <div>
              <div className="font-semibold">Performance</div>
              <div>Total Score: 712</div>
              <div>Average: 79.1%</div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-3">
            <div>
              <div className="h-[10px] w-[50px] border-b border-black"></div>
              <div className="text-center text-[10px] mt-1">Teacher's Signature</div>
            </div>
            <div>
              <div className="h-[10px] w-[50px] border-b border-black"></div>
              <div className="text-center text-[10px] mt-1">Principal's Signature</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="container mx-auto py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">School Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your school information and settings</p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-1.5">
            <Settings size={16} />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="logo" className="flex items-center gap-1.5">
            <FileImage size={16} />
            <span>Logo</span>
          </TabsTrigger>
          <TabsTrigger value="signature" className="flex items-center gap-1.5">
            <FileText size={16} />
            <span>Signature</span>
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center gap-1.5">
            <BookText size={16} />
            <span>Report Card</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-1.5">
            <CreditCard size={16} />
            <span>Payment</span>
          </TabsTrigger>
          <TabsTrigger value="mail" className="flex items-center gap-1.5">
            <Mail size={16} />
            <span>Mail</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-1.5">
            <FileText size={16} />
            <span>About Us</span>
          </TabsTrigger>
          <TabsTrigger value="proprietor" className="flex items-center gap-1.5">
            <Users size={16} />
            <span>Proprietor</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-1.5">
            <Upload size={16} />
            <span>Media & Style</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-1.5">
            <Bell size={16} />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Update your school's basic information and configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="EDUOS Academy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-motto">Site Motto</Label>
                  <Input id="site-motto" defaultValue="Excellence in Education" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-term">Current Term</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
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

              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-application">Open Online Application Form</Label>
                  <Switch 
                    id="online-application" 
                    checked={onlineApplication} 
                    onCheckedChange={setOnlineApplication} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="free-result-check">Allow Free Check Result by Students</Label>
                  <Switch 
                    id="free-result-check" 
                    checked={freeResultCheck} 
                    onCheckedChange={setFreeResultCheck} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="print-exam-pass">Allow Student to Print Exam Pass with No Payment</Label>
                  <Switch 
                    id="print-exam-pass" 
                    checked={printExamPass} 
                    onCheckedChange={setPrintExamPass} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-exam-score">Allow Exam Score to Show Immediately</Label>
                  <Switch 
                    id="show-exam-score" 
                    checked={showExamScoreImmediately} 
                    onCheckedChange={setShowExamScoreImmediately} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="display-preload-spinner">Display Preload Spinner</Label>
                  <Switch 
                    id="display-preload-spinner" 
                    checked={displayPreloadSpinner} 
                    onCheckedChange={setDisplayPreloadSpinner} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="site-email">Site Email</Label>
                  <Input id="site-email" type="email" defaultValue="contact@eduos-academy.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-phone">Site Phone Number</Label>
                  <Input id="site-phone" type="tel" defaultValue="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-address">Site Address</Label>
                  <Input id="site-address" defaultValue="123 Education Street, Learning City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube-link">Site YouTube Link</Label>
                  <Input id="youtube-link" placeholder="https://youtube.com/..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube-id">YouTube Channel ID</Label>
                  <Input id="youtube-id" placeholder="UC..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-level-heading">Apply For Primary Level Heading</Label>
                  <Input id="primary-level-heading" defaultValue="Primary School Admission" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-level-heading">Apply For Secondary Level Heading</Label>
                  <Input id="secondary-level-heading" defaultValue="Secondary School Admission" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-level-subwords">Apply For Primary Level Sub Words</Label>
                  <Input id="primary-level-subwords" defaultValue="Quality Primary Education" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opening-hour">Our Opening Hours</Label>
                  <Input id="opening-hour" defaultValue="Monday - Friday: 8:00 AM - 3:00 PM" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="proprietor-speech">Proprietor Speech</Label>
                <Textarea id="proprietor-speech" rows={4} defaultValue="Welcome to our institution where we focus on developing the whole child through quality education..." />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="admission-content">Admission Content</Label>
                <div className="border rounded-md p-1">
                  <div className="bg-muted p-2 flex gap-2 rounded-t-sm">
                    <button className="p-1 hover:bg-background rounded" title="Bold">B</button>
                    <button className="p-1 hover:bg-background rounded italic" title="Italic">I</button>
                    <button className="p-1 hover:bg-background rounded underline" title="Underline">U</button>
                    <select className="text-xs border rounded px-1">
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Calibri</option>
                    </select>
                  </div>
                  <Textarea 
                    id="admission-content" 
                    rows={8} 
                    className="border-0 focus-visible:ring-0 rounded-t-none" 
                    defaultValue="Our admission process is straightforward. Please submit the required documents and complete the entrance examination to be considered for admission..." 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="facilities-word">Change Facilities Word</Label>
                  <Input id="facilities-word" defaultValue="Our Facilities" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facilities-1">Our Facilities 1</Label>
                  <Input id="facilities-1" defaultValue="Modern Classrooms" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facilities-2">Our Facilities 2</Label>
                  <Input id="facilities-2" defaultValue="Computer Lab" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facilities-3">Our Facilities 3</Label>
                  <Input id="facilities-3" defaultValue="Sports Complex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ads-id">Ads ID</Label>
                  <Input id="ads-id" placeholder="Enter ads ID" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('General')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>
                Update your school logos and branding elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="site-logo">Change Site Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <img src="/placeholder.svg" alt="Current Logo" className="w-24 h-24 mb-4 object-contain" />
                    <Label 
                      htmlFor="site-logo-upload" 
                      className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Choose File
                    </Label>
                    <Input id="site-logo-upload" type="file" className="hidden" accept="image/*" />
                    <p className="text-sm text-muted-foreground mt-2">Recommended size: 200x200px</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="text-logo">Change Site Text Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <img src="/placeholder.svg" alt="Current Text Logo" className="w-24 h-24 mb-4 object-contain" />
                    <Label 
                      htmlFor="text-logo-upload" 
                      className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Choose File
                    </Label>
                    <Input id="text-logo-upload" type="file" className="hidden" accept="image/*" />
                    <p className="text-sm text-muted-foreground mt-2">Recommended size: 400x100px</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="admission-logo">Change Admission Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                    <img src="/placeholder.svg" alt="Current Admission Logo" className="w-24 h-24 mb-4 object-contain" />
                    <Label 
                      htmlFor="admission-logo-upload" 
                      className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Choose File
                    </Label>
                    <Input id="admission-logo-upload" type="file" className="hidden" accept="image/*" />
                    <p className="text-sm text-muted-foreground mt-2">Recommended size: 300x300px</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Logo')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="signature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Signature</CardTitle>
              <CardDescription>
                Update your school's official signature for documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="signature">Change Site Signature</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <img src="/placeholder.svg" alt="Current Signature" className="w-24 h-24 mb-4 object-contain" />
                  <Label 
                    htmlFor="signature-upload" 
                    className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Choose File
                  </Label>
                  <Input id="signature-upload" type="file" className="hidden" accept="image/*" />
                  <p className="text-sm text-muted-foreground mt-2">Recommended size: 300x150px</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Signature')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Card Tools</CardTitle>
              <CardDescription>
                Configure your school's report card settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Term Comments Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Term Comments</h3>
                  <div className="border p-4 rounded-md space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="comment">Enter Comment</Label>
                      <Textarea id="comment" placeholder="Enter term comment..." rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="session">Session</Label>
                        <Select defaultValue="2024-2025">
                          <SelectTrigger>
                            <SelectValue placeholder="Select session" />
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
                        <Label htmlFor="term">Select Term/Semester</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
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
                    <Button onClick={() => handleSaveSettings('Term Comment')} className="w-full">Save Comment</Button>
                  </div>
                </div>
                
                {/* Grades and Remarks */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Grades and Remarks</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Range</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Remark</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummyGrades.map((grade, index) => (
                          <TableRow key={index}>
                            <TableCell>{grade.range}</TableCell>
                            <TableCell>{grade.grade}</TableCell>
                            <TableCell>{grade.remark}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Mark Obtainable */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Mark Obtainable</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Level</TableHead>
                          <TableHead>Exam Score</TableHead>
                          <TableHead>1st CA</TableHead>
                          <TableHead>2nd CA</TableHead>
                          <TableHead>Assignment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dummyMarks.map((mark, index) => (
                          <TableRow key={index}>
                            <TableCell>{mark.level}</TableCell>
                            <TableCell>{mark.exam}</TableCell>
                            <TableCell>{mark.firstCA}</TableCell>
                            <TableCell>{mark.secondCA}</TableCell>
                            <TableCell>{mark.assignment}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex space-x-3">
                    <Label htmlFor="select-level" className="flex items-center">Select Level</Label>
                    <Select defaultValue="primary">
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Result Template - Refactored Section */}
                <div className="space-y-4 col-span-1 lg:col-span-2">
                  <h3 className="font-semibold text-lg">Result Template</h3>
                  <div className="border p-4 rounded-md space-y-5">
                    <div className="space-y-4">
                      <Label htmlFor="result-template">Select Template Style</Label>
                      <RadioGroup 
                        value={selectedTemplate} 
                        onValueChange={setSelectedTemplate} 
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                      >
                        {resultTemplateOptions.map((option) => (
                          <motion.div 
                            key={option.value}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className={`border-2 rounded-lg p-3 cursor-pointer ${
                              selectedTemplate === option.value
                                ? 'ring-2 ring-primary border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <RadioGroupItem 
                              value={option.value} 
                              id={option.value} 
                              className="sr-only"
                            />
                            <Label 
                              htmlFor={option.value} 
                              className="cursor-pointer space-y-3 block h-full"
                            >
                              <div className="aspect-[8.5/11] w-full overflow-hidden rounded-md border bg-white">
                                <div className="h-full">
                                  {renderTemplatePreview(option.value)}
                                </div>
                              </div>
                              <div className="text-center font-medium">
                                {option.label}
                              </div>
                            </Label>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Preview of {templateStyles[selectedTemplate].name}</h4>
                      <div className="bg-gray-50 p-6 rounded-lg border flex justify-center">
                        <div className="w-full max-w-md aspect-[8.5/11] shadow-lg">
                          {renderTemplatePreview(selectedTemplate)}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleSaveSettings('Result Template')} 
                      className="w-full md:w-auto flex items-center gap-1.5"
                    >
                      <Save size={16} />
                      Set as Default Template
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Result Display Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-position" className="cursor-pointer">Show Result Position</Label>
                    <Switch id="show-position" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-school-opened" className="cursor-pointer">Show No. of Times School Opened</Label>
                    <Switch id="show-school-opened" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-present" className="cursor-pointer">Show No. of Present</Label>
                    <Switch id="show-present" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-absent" className="cursor-pointer">Show No. of Absent</Label>
                    <Switch id="show-absent" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-students-count" className="cursor-pointer">Show No. of Students in Class</Label>
                    <Switch id="show-students-count" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="show-assignment" className="cursor-pointer">Display Assignment Score on Report Card</Label>
                    <Switch id="show-assignment" defaultChecked />
                  </div>
                </div>
                <Button onClick={() => handleSaveSettings('Result Display Settings')} className="mt-2">Update Fields</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment gateways and options for your school.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Select Payment Gateway</Label>
                <RadioGroup 
                  value={paymentGateway} 
                  onValueChange={setPaymentGateway} 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                      paymentGateway === 'paystack' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="paystack" id="paystack" className="mr-3" />
                    <Label htmlFor="paystack" className="cursor-pointer flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Paystack</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 6.5C3 4.567 4.567 3 6.5 3H17.5C19.433 3 21 4.567 21 6.5V17.5C21 19.433 19.433 21 17.5 21H6.5C4.567 21 3 19.433 3 17.5V6.5ZM6.5 11.75C6.5 11.3358 6.83579 11 7.25 11H16.75C17.1642 11 17.5 11.3358 17.5 11.75V12.25C17.5 12.6642 17.1642 13 16.75 13H7.25C6.83579 13 6.5 12.6642 6.5 12.25V11.75Z" fill="#00C3F7"/>
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Popular payment gateway in Africa
                      </p>
                    </Label>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                      paymentGateway === 'flutterwave' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="flutterwave" id="flutterwave" className="mr-3" />
                    <Label htmlFor="flutterwave" className="cursor-pointer flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Flutterwave</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.25 4.5H3.75C3.12868 4.5 2.5 5.12868 2.5 5.75V18.25C2.5 18.8713 3.12868 19.5 3.75 19.5H20.25C20.8713 19.5 21.5 18.8713 21.5 18.25V5.75C21.5 5.12868 20.8713 4.5 20.25 4.5Z" stroke="#FB9129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.4375 9.625H15.5625L8.4375 14.375H15.5625" stroke="#FB9129" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Comprehensive payment solutions for Africa
                      </p>
                    </Label>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                      paymentGateway === 'paypal' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <RadioGroupItem value="paypal" id="paypal" className="mr-3" />
                    <Label htmlFor="paypal" className="cursor-pointer flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">PayPal</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M18.5871 6.31311C18.6603 5.92964 18.5871 5.64964 18.3675 5.42964C18.128 5.18571 17.7246 5.06857 17.2077 5.06857H14.3851C14.229 5.06857 14.0932 5.16675 14.0627 5.32067L12.904 12.8246C12.8837 12.9421 12.9745 13.0525 13.0935 13.0525H14.4558C14.5474 13.0525 14.624 12.9827 14.6356 12.8917L14.9505 10.8286C14.9803 10.6747 15.1168 10.5765 15.2722 10.5765H15.9283C17.4958 10.5765 18.5748 9.79932 18.886 8.31225C19.0264 7.67418 18.9741 7.16168 18.5871 6.31311Z" fill="#002C8A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.58711 6.31311C7.66025 5.92964 7.58711 5.64964 7.36746 5.42964C7.12797 5.18571 6.72461 5.06857 6.20768 5.06857H3.38512C3.22898 5.06857 3.09319 5.16675 3.06267 5.32067L1.90404 12.8246C1.88372 12.9421 1.97447 13.0525 2.09348 13.0525H3.26955C3.44127 13.0525 3.58594 12.9244 3.61914 12.7545L3.9505 10.8286C3.98026 10.6747 4.11676 10.5765 4.27218 10.5765H4.92827C6.49583 10.5765 7.57476 9.79932 7.886 8.31225C8.02644 7.67418 7.97408 7.16168 7.58711 6.31311Z" fill="#0085CC"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.657 8.35236C11.5739 8.25944 11.4593 8.20643 11.3257 8.20643H9.8442C9.76693 8.20643 9.69679 8.24815 9.65269 8.31508L9.32183 12.7835C9.30554 12.8889 9.38644 12.9848 9.4932 12.9848H10.4171C10.5268 12.9848 10.6187 12.9068 10.636 12.7979L10.8029 11.5835C10.8209 11.4739 10.9128 11.3958 11.0225 11.3958H11.4565C12.5006 11.3958 13.1327 10.899 13.3397 9.88508C13.4327 9.44094 13.3743 9.08658 13.1774 8.83644C13.0293 8.64958 12.8221 8.47401 12.531 8.37858C12.2436 8.28401 11.9225 8.24544 11.657 8.35236Z" fill="#00186A"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.53128 8.35236C3.44817 8.25944 3.33359 8.20643 3.2 8.20643H1.71845C1.64118 8.20643 1.57104 8.24815 1.52694 8.31508L1.19608 12.7835C1.17979 12.8889 1.26069 12.9848 1.36745 12.9848H2.41036C2.53581 12.9848 2.63904 12.8898 2.6551 12.7648L2.82739 11.5835C2.84535 11.4739 2.93725 11.3958 3.04696 11.3958H3.48092C4.52511 11.3958 5.1572 10.899 5.36415 9.88508C5.45722 9.44094 5.39882 9.08658 5.20182 8.83644C5.05371 8.64958 4.84663 8.47401 4.55546 8.37858C4.26804 8.28401 3.94696 8.24544 3.53128 8.35236Z" fill="#001F6B"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M20.8742 9.17646C20.5409 10.4345 19.4906 11.3518 18.1883 11.3518H17.668C17.5143 11.3518 17.3764 11.4577 17.3428 11.6088L17.0114 13.7693C16.9952 13.8696 16.9126 13.9464 16.8114 13.9464H15.8057C15.7159 13.9464 15.6509 13.8657 15.667 13.7773L16.5788 8.00475C16.5907 7.94025 16.6477 7.89389 16.7127 7.89389H19.7557C20.8086 7.89389 21.2086 8.39503 20.8742 9.17646Z" fill="#001C64"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.4158 9.17646C16.0825 10.4345 15.0321 11.3518 13.7298 11.3518H13.2095C13.0558 11.3518 12.9179 11.4577 12.8844 11.6088L12.553 13.7693C12.5367 13.8696 12.4541 13.9464 12.3529 13.9464H11.3473C11.2575 13.9464 11.1925 13.8657 11.2086 13.7773L12.1203 8.00475C12.1323 7.94025 12.1893 7.89389 12.2542 7.89389H15.2972C16.3502 7.89389 16.7502 8.39503 16.4158 9.17646Z" fill="#00237A"/>
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Global payment processor
                      </p>
                    </Label>
                  </motion.div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {paymentGateway === 'paystack' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Paystack Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paystack-public-key">Public Key</Label>
                      <Input id="paystack-public-key" type="password" placeholder="Enter your Paystack public key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paystack-secret-key">Secret Key</Label>
                      <Input id="paystack-secret-key" type="password" placeholder="Enter your Paystack secret key" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentGateway === 'flutterwave' && (
                <div className="space-y-4">
                  <h3 className="font-medium">Flutterwave Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="flutterwave-public-key">Public Key</Label>
                      <Input id="flutterwave-public-key" type="password" placeholder="Enter your Flutterwave public key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flutterwave-secret-key">Secret Key</Label>
                      <Input id="flutterwave-secret-key" type="password" placeholder="Enter your Flutterwave secret key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flutterwave-encryption-key">Encryption Key</Label>
                      <Input id="flutterwave-encryption-key" type="password" placeholder="Enter your encryption key" />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentGateway === 'paypal' && (
                <div className="space-y-4">
                  <h3 className="font-medium">PayPal Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">Client ID</Label>
                      <Input id="paypal-client-id" type="password" placeholder="Enter your PayPal client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-secret">Client Secret</Label>
                      <Input id="paypal-client-secret" type="password" placeholder="Enter your PayPal client secret" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypal-mode">Environment</Label>
                      <div className="flex items-center space-x-2">
                        <Input id="paypal-mode" defaultValue="Sandbox" disabled />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="payment-api">Payment API</Label>
                  <Input id="payment-api" placeholder="Enter payment API endpoint" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-charges">Payment Charges (%)</Label>
                  <Input id="payment-charges" type="number" min="0" step="0.01" defaultValue="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-icon">Change Currency Icon</Label>
                  <Input id="currency-icon" defaultValue="₦" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency-code">Change Currency Code</Label>
                  <Input id="currency-code" defaultValue="NGN" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Payment')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Payment Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="mail" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mail Settings</CardTitle>
              <CardDescription>
                Configure email settings for your school system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-email-name">Site Email From Name</Label>
                  <Input id="site-email-name" defaultValue="EDUOS Academy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reply-email">Reply To Email Address</Label>
                  <Input id="reply-email" type="email" defaultValue="no-reply@eduos-academy.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mail-type">Mail Type</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger>
                      <SelectValue placeholder="Select mail type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" defaultValue="smtp.yourserver.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input id="smtp-username" type="email" placeholder="Enter SMTP username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input id="smtp-password" type="password" placeholder="Enter SMTP password" />
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <Label>SMTP Type</Label>
                <RadioGroup 
                  value={smtpType} 
                  onValueChange={setSmtpType} 
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ssl" id="ssl" />
                    <Label htmlFor="ssl">SSL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tls" id="tls" />
                    <Label htmlFor="tls">TLS</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Mail')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
              <CardDescription>
                Update your school's About Us content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="about-us">Edit About Us</Label>
                <div className="border rounded-md p-1">
                  <div className="bg-muted p-2 flex gap-2 rounded-t-sm">
                    <button className="p-1 hover:bg-background rounded" title="Bold">B</button>
                    <button className="p-1 hover:bg-background rounded italic" title="Italic">I</button>
                    <button className="p-1 hover:bg-background rounded underline" title="Underline">U</button>
                    <select className="text-xs border rounded px-1">
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Calibri</option>
                    </select>
                  </div>
                  <Textarea 
                    id="about-us" 
                    rows={10} 
                    className="border-0 focus-visible:ring-0 rounded-t-none" 
                    defaultValue="EDUOS Academy is a premier educational institution dedicated to providing quality education to students from around the world. Established in 2010, we have grown to become one of the leading schools in the region, with a focus on academic excellence, character development, and innovation in education. Our dedicated faculty and staff work tirelessly to ensure that each student receives personalized attention and has access to the resources they need to succeed..." 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('About Us')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="proprietor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proprietor Image</CardTitle>
              <CardDescription>
                Update your school's proprietor image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="proprietor-image">Change Proprietor Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <img src="/placeholder.svg" alt="Current Proprietor Image" className="w-40 h-40 mb-4 object-cover rounded-full" />
                  <Label 
                    htmlFor="proprietor-image-upload" 
                    className="cursor-pointer bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Choose File
                  </Label>
                  <Input id="proprietor-image-upload" type="file" className="hidden" accept="image/*" />
                  <p className="text-sm text-muted-foreground mt-2">Recommended size: 500x500px</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Proprietor Image')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slider, Color and Staff Images</CardTitle>
              <CardDescription>
                Customize your school's visual appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Site Color Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex">
                      <Input 
                        id="primary-color" 
                        defaultValue="#3B82F6" 
                        className="rounded-r-none"
                      />
                      <div 
                        className="w-10 h-10 bg-blue-500 border border-l-0 border-input rounded-r-md"
                        style={{ backgroundColor: '#3B82F6' }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex">
                      <Input 
                        id="secondary-color" 
                        defaultValue="#10B981" 
                        className="rounded-r-none"
                      />
                      <div 
                        className="w-10 h-10 bg-emerald-500 border border-l-0 border-input rounded-r-md"
                        style={{ backgroundColor: '#10B981' }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex">
                      <Input 
                        id="text-color" 
                        defaultValue="#111827" 
                        className="rounded-r-none"
                      />
                      <div 
                        className="w-10 h-10 bg-gray-900 border border-l-0 border-input rounded-r-md"
                        style={{ backgroundColor: '#111827' }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex">
                      <Input 
                        id="background-color" 
                        defaultValue="#F9FAFB" 
                        className="rounded-r-none"
                      />
                      <div 
                        className="w-10 h-10 bg-gray-50 border border-l-0 border-input rounded-r-md"
                        style={{ backgroundColor: '#F9FAFB' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleSaveSettings('Color Settings')} className="flex gap-1.5 items-center">
                  <Save size={16} />
                  Save Color Settings
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Site Slider</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 space-y-2">
                    <img src="/placeholder.svg" alt="Slider 1" className="w-full h-32 object-cover rounded-md" />
                    <Label 
                      htmlFor="slider-1-upload" 
                      className="cursor-pointer bg-primary text-white py-1 px-3 text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 w-fit"
                    >
                      <Upload size={14} />
                      Replace
                    </Label>
                    <Input id="slider-1-upload" type="file" className="hidden" accept="image/*" />
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <img src="/placeholder.svg" alt="Slider 2" className="w-full h-32 object-cover rounded-md" />
                    <Label 
                      htmlFor="slider-2-upload" 
                      className="cursor-pointer bg-primary text-white py-1 px-3 text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 w-fit"
                    >
                      <Upload size={14} />
                      Replace
                    </Label>
                    <Input id="slider-2-upload" type="file" className="hidden" accept="image/*" />
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="w-full h-32 bg-muted flex items-center justify-center rounded-md">
                      <Upload size={24} className="text-muted-foreground" />
                    </div>
                    <Label 
                      htmlFor="slider-3-upload" 
                      className="cursor-pointer bg-primary text-white py-1 px-3 text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 w-fit"
                    >
                      <Upload size={14} />
                      Upload New
                    </Label>
                    <Input id="slider-3-upload" type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
                <Button onClick={() => handleSaveSettings('Slider Settings')} className="flex gap-1.5 items-center">
                  <Save size={16} />
                  Save Slider Images
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Staff Images and Names</h3>
                  <Button variant="outline" className="flex gap-1.5 items-center">
                    <Upload size={16} />
                    Add New Staff
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border rounded-md p-4 space-y-2">
                    <img src="/placeholder.svg" alt="Staff 1" className="w-full h-40 object-cover rounded-md" />
                    <div className="space-y-1">
                      <Input defaultValue="John Doe" className="font-medium" />
                      <Input defaultValue="Principal" className="text-sm text-muted-foreground" />
                    </div>
                    <div className="flex justify-end">
                      <Label 
                        htmlFor="staff-1-upload" 
                        className="cursor-pointer bg-primary text-white py-1 px-3 text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 w-fit"
                      >
                        <Upload size={14} />
                        Change Image
                      </Label>
                      <Input id="staff-1-upload" type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div className="border rounded-md p-4 space-y-2">
                    <img src="/placeholder.svg" alt="Staff 2" className="w-full h-40 object-cover rounded-md" />
                    <div className="space-y-1">
                      <Input defaultValue="Jane Smith" className="font-medium" />
                      <Input defaultValue="Vice Principal" className="text-sm text-muted-foreground" />
                    </div>
                    <div className="flex justify-end">
                      <Label 
                        htmlFor="staff-2-upload" 
                        className="cursor-pointer bg-primary text-white py-1 px-3 text-sm rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1 w-fit"
                      >
                        <Upload size={14} />
                        Change Image
                      </Label>
                      <Input id="staff-2-upload" type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleSaveSettings('Staff Settings')} className="flex gap-1.5 items-center">
                  <Save size={16} />
                  Save Staff Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and SMS notifications for your school.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Email Notification Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="new-student" className="cursor-pointer">New Student Registration</Label>
                    <Switch id="new-student" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="new-payment" className="cursor-pointer">Payment Confirmation</Label>
                    <Switch id="new-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="result-published" className="cursor-pointer">Result Publication</Label>
                    <Switch id="result-published" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="assignment" className="cursor-pointer">New Assignment</Label>
                    <Switch id="assignment" defaultChecked />
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-6">SMS Notification Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms-payment" className="cursor-pointer">Payment Confirmation</Label>
                    <Switch id="sms-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms-result" className="cursor-pointer">Result Publication</Label>
                    <Switch id="sms-result" />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms-emergency" className="cursor-pointer">Emergency Alerts</Label>
                    <Switch id="sms-emergency" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sms-attendance" className="cursor-pointer">Attendance Alerts</Label>
                    <Switch id="sms-attendance" />
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mt-6">SMS Gateway Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">SMS Provider</Label>
                    <Select defaultValue="twilio">
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="africa-talking">Africa's Talking</SelectItem>
                        <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input id="sms-api-key" type="password" placeholder="Enter API Key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-api-secret">API Secret</Label>
                    <Input id="sms-api-secret" type="password" placeholder="Enter API Secret" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-id">Sender ID</Label>
                    <Input id="sender-id" placeholder="Enter Sender ID" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings('Notification')} className="flex gap-1.5 items-center">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TheSchool;
