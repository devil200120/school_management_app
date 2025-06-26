import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon,
  color,
  changePercent,
  changeStatus,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className={`bg-gradient-to-br ${color} border-blue-100 transition-all duration-300`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <p className="text-sm text-gray-600">{title}</p>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold text-eduos-primary">{value}</div>
            
            {changePercent && changeStatus && (
              <div className={`flex items-center text-sm ${
                changeStatus === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeStatus === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{changePercent}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
