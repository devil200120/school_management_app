import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const PayBill = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Pay Bill</h1>
      
      <Card>
        <CardHeader className="bg-eduos-primary text-white text-center sm:text-left py-3 sm:py-4">
          <CardTitle className="text-lg sm:text-xl">Payment List</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500 text-sm sm:text-base">No payment found</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayBill;
