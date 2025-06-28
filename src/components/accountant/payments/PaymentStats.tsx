
import React from 'react';

interface PaymentStatsProps {
  recordsCount: number;
  totalAmount: number;
  completedAmount: number;
  pendingAmount: number;
}

const PaymentStats: React.FC<PaymentStatsProps> = ({
  recordsCount,
  totalAmount,
  completedAmount,
  pendingAmount
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
        Showing {recordsCount} records
      </p>
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="font-medium">
          Total: <span className="text-primary">₦{totalAmount.toLocaleString()}</span>
        </span>
        <span className="font-medium text-green-600">
          Completed: ₦{completedAmount.toLocaleString()}
        </span>
        <span className="font-medium text-yellow-600">
          Pending: ₦{pendingAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PaymentStats;
