import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const activityData = [
  { year: 'First Year', percentage: 68 },
  { year: 'Second Year', percentage: 82 },
  { year: 'Third Year', percentage: 75 },
];

export const PerformanceCard = () => {
  return (
    <Card className="col-span-1 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in delay-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent">
          Performance Trends
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activityData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="year"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                unit="%"
              />
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#1e40af"
                fillOpacity={1}
                fill="url(#colorPercentage)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <p className="font-medium text-eduos-primary">2023-2024 Academic Session</p>
          <p className="text-sm text-emerald-600 font-medium mt-1">
            Overall Performance: Excellent
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
