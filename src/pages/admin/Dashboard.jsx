
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, BookOpen, UserCheck, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Label } from '../../components/ui/label';

const Dashboard = () => {
  const adminName = "John Doe"; // This would come from your auth context in a real application

  const stats = [
    {
      title: "Applications",
      value: "245",
      increase: "+20.1%",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: "from-blue-600 to-blue-400",
      progress: 70
    },
    {
      title: "Students",
      value: "1,892",
      increase: "+12.5%",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "from-green-600 to-green-400",
      progress: 85
    },
    {
      title: "Total Admin",
      value: "12",
      increase: "+3",
      icon: <UserCheck className="h-6 w-6 text-white" />,
      color: "from-purple-600 to-purple-400",
      progress: 60
    },
    {
      title: "Last Month Worth",
      value: "$24,890",
      increase: "+17.2%",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      color: "from-amber-600 to-amber-400",
      progress: 92
    }
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight animate-fade-in">
            Welcome, {adminName}
          </h2>
          <p className="text-gray-500 animate-fade-in delay-100">
            You have control over every feature
          </p>
        </div>
        <div className="flex items-center space-x-2 animate-fade-in delay-200">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eduos-primary to-eduos-secondary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span className="text-2xl text-white">👨‍💼</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title}
            className="hover:shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pt-4 bg-gradient-to-br ${stat.color} rounded-t-lg`}>
              <CardTitle className="p-1 text-sm font-medium text-white">
                {stat.title}
              </CardTitle>
              <div className="rounded-full p-2 mr-4 bg-white/10 backdrop-blur-sm">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.increase} from last month
              </p>
              <div className="mt-3">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stat.progress}%`, transform: 'translateX(-100%)', animation: 'slideRight 1s forwards' }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground text-right">
                  {stat.progress}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Section */}
      <Card className=" mt-4 animate-fade-in delay-500">
        <CardHeader>
          <CardTitle>Activity Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="term">Select Term</Label>
              <Select>
                <select id="term" className="w-full">
                  <option value="">Select Term</option>
                  <option value="first">First Term</option>
                  <option value="second">Second Term</option>
                  <option value="third">Third Term</option>
                </select>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select>
                <select id="class" className="w-full">
                  <option value="">Select Class</option>
                  <option value="class1">Class 1</option>
                  <option value="class2">Class 2</option>
                  <option value="class3">Class 3</option>
                </select>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="level">Select Level</Label>
              <Select>
                <select id="level" className="w-full">
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full sm:w-auto hover:shadow-lg transition-all duration-300">
                Go
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
