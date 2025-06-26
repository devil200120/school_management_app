import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../context/AuthContext';

export const StudentProfileCard = () => {
  const { user } = useAuth();

  const studentInfo = {
    level: 'Primary Level',
    class: 'Primary One',
    department: 'N/A',
    gender: 'Male',
    session: '2023-2024',
    status: 'Graduate',
  };

  return (
    <Card className="col-span-1 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-eduos-primary">Student Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-eduos-primary to-eduos-secondary rounded-full animate-pulse opacity-25"></div>
            <img
              src={user?.profilePicture || '/placeholder.svg'}
              alt="Student"
              className="w-24 h-24 rounded-full object-cover border-4 border-white relative z-10 shadow-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-center bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent">
            {user?.name}
          </p>
          <div className="space-y-2 text-sm divide-y divide-gray-100">
            {Object.entries(studentInfo).map(([key, value], index) => (
              <div
                key={key}
                className="flex justify-between py-2 transition-all duration-300 hover:bg-gray-50 rounded-lg px-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-medium text-eduos-primary">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
