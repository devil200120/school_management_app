
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';

const AddPaymentList = () => {
  const [formData, setFormData] = useState({
    session: '',
    term: '',
    class: '',
    feeType: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment list added:', formData);
    // Would submit to API in a real app
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Add Payment List</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Payment List</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="session">Session</Label>
                <Input 
                  id="session" 
                  name="session"
                  placeholder="e.g. 2023/2024"
                  value={formData.session}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="term">Term</Label>
                <Select>
                  <select 
                    id="term"
                    name="term"
                    className="w-full"
                    value={formData.term}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Term</option>
                    <option value="first">First Term</option>
                    <option value="second">Second Term</option>
                    <option value="third">Third Term</option>
                  </select>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="class">Class</Label>
                <Select>
                  <select 
                    id="class"
                    name="class"
                    className="w-full"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="class1">Class 1</option>
                    <option value="class2">Class 2</option>
                    <option value="class3">Class 3</option>
                  </select>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="feeType">Fee Type</Label>
                <Input 
                  id="feeType" 
                  name="feeType"
                  placeholder="e.g. Tuition Fee"
                  value={formData.feeType}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  name="amount"
                  type="number"
                  placeholder="e.g. 5000"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Add Payment List</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPaymentList;
