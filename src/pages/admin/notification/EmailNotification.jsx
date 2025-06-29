
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';

const EmailNotification = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Email Notification
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Send Email Notification</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Select Recipients</Label>
              <Select>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="staff">Staff Only</SelectItem>
                  <SelectItem value="parents">Parents Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input 
                id="subject" 
                placeholder="Enter email subject..." 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Email Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter email message..." 
                className="min-h-[200px] transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (Optional)</Label>
              <Input 
                id="attachment" 
                type="file" 
                className="transition-all duration-300"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Send Email
          </Button>
        </CardContent>
      </Card>
      
      <Card className="animate-fade-in delay-200 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Email History</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">End of Term Notice</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Dear Parents/Guardians, This is to inform you that the term will end on...
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-xs text-gray-500">Sent to: Parents</p>
                    <p className="text-xs text-gray-500">Date: April 10, 2023</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNotification;
