
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

const AddNews = () => {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add News
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>News Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newsTitle">Enter News Title</Label>
              <Input 
                id="newsTitle" 
                placeholder="Enter the title of the news" 
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsContent">Enter News</Label>
              <Textarea 
                id="newsContent"
                placeholder="Enter the content of the news" 
                className="min-h-[150px] transition-all duration-300 focus:border-eduos-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newsImage">Upload Image</Label>
              <Input 
                id="newsImage" 
                type="file" 
                className="transition-all duration-300"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            Add Now
          </Button>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Existing News</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">News Title</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">News</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scroll</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">News Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Welcome to New Academic Session</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">We are pleased to welcome all students...</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-09-01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600 mr-2">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNews;
