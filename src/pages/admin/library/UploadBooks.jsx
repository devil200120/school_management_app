
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Input } from '../../../components/ui/input';
import { Book, BookOpen, Video, Upload } from 'lucide-react';

const UploadBooks = () => {
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [classValue, setClassValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Upload book details:', {
      type: selectedTab,
      file: selectedFile,
      level,
      subject,
      class: classValue
    });
    // Logic to upload the book
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Books
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Upload Books into Library</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <Tabs defaultValue="text" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Book size={18} />
                  <span>Upload Text Books</span>
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <BookOpen size={18} />
                  <span>Upload Audio Books</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Video size={18} />
                  <span>Upload Video Books</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <Label htmlFor="textFile" className="block mb-2">Select Text Book File</Label>
                  <div className="flex items-center gap-4">
                    <Input id="textFile" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      <span>Choose File</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="audio" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <Label htmlFor="audioFile" className="block mb-2">Select Audio Book File</Label>
                  <div className="flex items-center gap-4">
                    <Input id="audioFile" type="file" onChange={handleFileChange} accept=".mp3,.wav,.ogg" />
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      <span>Choose File</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="video" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <Label htmlFor="videoFile" className="block mb-2">Select Video Book File</Label>
                  <div className="flex items-center gap-4">
                    <Input id="videoFile" type="file" onChange={handleFileChange} accept=".mp4,.mov,.avi" />
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <Upload size={16} />
                      <span>Choose File</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Select Subject</Label>
                  <Select>
                    <select 
                      id="subject" 
                      value={subject} 
                      onChange={(e) => setSubject(e.target.value)} 
                      className="w-full"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="english">English</option>
                      <option value="science">Science</option>
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
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-colors"
                >
                  Upload Now
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadBooks;
