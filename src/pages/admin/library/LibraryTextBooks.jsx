
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

const LibraryTextBooks = () => {
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected level:', level);
    // Logic to fetch text books for the selected level
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 pb-12 md:pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in leading-tight">
          Library Text Books
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">Select Student Session and Level</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="level" className="text-sm sm:text-base">Select Level</Label>
                <Select>
                  <select 
                    id="level" 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)} 
                    className="w-full text-sm sm:text-base py-2"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-eduos-primary hover:bg-eduos-secondary transition-colors text-sm sm:text-base py-2 px-3 sm:px-4"
              >
                Check Now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LibraryTextBooks;
