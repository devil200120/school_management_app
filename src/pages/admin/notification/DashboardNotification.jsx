
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';

const DashboardNotification = () => {
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 pb-12 md:pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in leading-tight">
          Dashboard Notification
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Add Dashboard Notification</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-5 md:space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification" className="text-sm sm:text-base">Notification Message</Label>
              <Textarea 
                id="notification" 
                placeholder="Enter notification message to display on the dashboard..." 
                className="min-h-[120px] sm:min-h-[150px] transition-all duration-300 focus:border-eduos-primary text-sm sm:text-base"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              className="flex-1 bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              Send to All Users
            </Button>
            <Button 
              className="flex-1 bg-amber-500 hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              Send to Students Only
            </Button>
            <Button 
              className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
            >
              Send to Staff Only
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-3 animate-fade-in delay-200 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Current Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="p-3 sm:p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">System Maintenance Notice</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    The system will be down for maintenance on Sunday, April 30th, from 2 AM to 5 AM.
                  </p>
                  <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mt-2 sm:mt-3">
                    <p className="text-xs text-gray-500">Sent to: All Users</p>
                    <p className="text-xs text-gray-500">Date: April 26, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center mt-2 sm:mt-0">
                  <Button variant="outline" size="sm" className="text-xs h-8">Edit</Button>
                  <Button variant="destructive" size="sm" className="text-xs h-8">Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardNotification;
