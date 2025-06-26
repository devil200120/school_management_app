import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export const SchoolFeesCard = () => {
  return (
    <Card className="col-span-1 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in delay-100">
      <CardHeader className="pb-2 bg-gradient-to-r from-eduos-primary to-eduos-secondary rounded-t-lg">
        <CardTitle className="text-lg text-white">School Fees Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-[calc(100%-3.5rem)]">
        <div className="space-y-4 pt-4">
          <div className="flex justify-between mb-2">
            <span>Total Fees:</span>
            <span className="font-bold text-eduos-primary">₦150,000</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Amount Paid:</span>
            <span className="font-medium text-green-600">₦100,000</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Balance:</span>
            <span className="font-medium text-red-500">₦50,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-eduos-primary to-eduos-secondary h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '66.7%' }}
            />
          </div>
        </div>
        <div className="pt-4 border-t">
          <Button className="w-full bg-gradient-to-r from-eduos-primary to-eduos-secondary hover:shadow-lg transition-all duration-300 hover:from-eduos-secondary hover:to-eduos-primary">
            Make Payment
          </Button>
          <div className="mt-2 text-center text-sm text-gray-500">
            Last Payment: 10 March, 2024
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
