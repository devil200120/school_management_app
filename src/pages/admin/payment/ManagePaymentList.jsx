
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';

const ManagePaymentList = () => {
  const [session, setSession] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Payment List</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Payment List Session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="session">SESSION</Label>
                <Input 
                  id="session" 
                  placeholder="Enter session (e.g. 2023/2024)" 
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full md:w-auto">Check Now</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePaymentList;
