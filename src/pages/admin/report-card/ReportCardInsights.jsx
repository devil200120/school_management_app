import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportCardInsights = () => {
  // Sample data for the chart
  const performanceData = [
    { subject: 'Mathematics', average: 78, highest: 95, lowest: 45 },
    { subject: 'Science', average: 82, highest: 98, lowest: 55 },
    { subject: 'English', average: 85, highest: 96, lowest: 60 },
    { subject: 'History', average: 75, highest: 92, lowest: 50 },
    { subject: 'Geography', average: 70, highest: 90, lowest: 42 },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Report Card Insights
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Select Class and Term</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Select Level</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary</SelectItem>
                  <SelectItem value="middle">Middle School</SelectItem>
                  <SelectItem value="high">High School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                  <SelectItem value="class4">Class 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session">Select Session</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
                  <SelectItem value="2021-2022">2021/2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="term">Select Term</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
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
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Generate Insights
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Performance Overview */}
        <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Class Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#8884d8" name="Class Average" />
                  <Bar dataKey="highest" fill="#82ca9d" name="Highest Score" />
                  <Bar dataKey="lowest" fill="#ff8042" name="Lowest Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Statistical Breakdown */}
        <Card className="animate-fade-in delay-300 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Statistical Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">Class Average</p>
                  <p className="text-2xl font-bold text-eduos-primary">78%</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">Highest Overall</p>
                  <p className="text-2xl font-bold text-green-600">95%</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">Lowest Overall</p>
                  <p className="text-2xl font-bold text-red-600">42%</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">Pass Rate</p>
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Top Performing Subjects</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>English (85%)</li>
                  <li>Science (82%)</li>
                  <li>Mathematics (78%)</li>
                </ol>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Areas Needing Improvement</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Geography (70%)</li>
                  <li>History (75%)</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Button className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default ReportCardInsights;
