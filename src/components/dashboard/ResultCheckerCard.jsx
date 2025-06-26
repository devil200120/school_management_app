import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const ResultCheckerCard = () => {
  return (
    <Card className="col-span-1 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in delay-200">
      <CardHeader className="pb-2 bg-gradient-to-r from-eduos-accent to-orange-400 rounded-t-lg">
        <CardTitle className="text-lg text-white">Check Current Session Result</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-[calc(100%-3.5rem)]">
        <div className="space-y-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="checkerPin" className="text-sm font-medium text-gray-700">
              Enter your checker pin
            </label>
            <Input
              id="checkerPin"
              type="text"
              className="w-full rounded-md border border-gray-200 focus:border-eduos-primary focus:ring-2 focus:ring-eduos-primary/20 transition-all duration-300 px-4 py-2"
              placeholder="Enter pin here"
            />
          </div>
        </div>
        <div className="pt-4 border-t">
          <Button className="w-full bg-gradient-to-r from-eduos-accent to-orange-400 hover:shadow-lg transition-all duration-300">
            Re-Print Now
          </Button>
          <div className="mt-2 text-center text-sm text-gray-500">
            Last checked: 15 April, 2024
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
