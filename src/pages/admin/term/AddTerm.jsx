
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { motion } from 'framer-motion';
import { Calendar, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AddTerm = () => {
  const [termName, setTermName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!termName.trim()) {
      toast.error("Please enter a term name");
      return;
    }
    
    if (!startDate) {
      toast.error("Please enter a start date");
      return;
    }
    
    if (!endDate) {
      toast.error("Please enter an end date");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Term "${termName}" added successfully!`);
      setTermName('');
      setStartDate('');
      setEndDate('');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 pb-16">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary">
          Add Term
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mt-3 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-eduos-primary">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar size={18} />
              Term Information
            </CardTitle>
            <CardDescription className="text-white/80">
              Create a new academic term in the system
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="termName">Term Name</Label>
                  <Input 
                    id="termName" 
                    value={termName}
                    onChange={(e) => setTermName(e.target.value)}
                    placeholder="e.g. First Term, Second Term, etc." 
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="transition-all duration-300 focus:border-eduos-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="transition-all duration-300 focus:border-eduos-primary"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t px-6 py-4">
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Term
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
      
      {/* Recently added terms section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-lg mx-auto mt-8"
      >
        <h3 className="text-lg font-medium mb-4">Recently Added Terms</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  <span>First Term 2023/2024</span>
                </div>
                <div className="text-sm text-gray-500">Sept 4 - Dec 15, 2023</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" />
                  <span>Second Term 2023/2024</span>
                </div>
                <div className="text-sm text-gray-500">Jan 8 - Apr 5, 2024</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddTerm;
