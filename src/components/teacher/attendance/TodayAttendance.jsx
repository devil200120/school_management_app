
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Clock, MapPin, DollarSign, Calendar, Timer } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner';

export const TodayAttendance = ({ todayRecord }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchedIn, setPunchedIn] = useState(false);
  const [punchedOut, setPunchedOut] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [isLate, setIsLate] = useState(false);
  const [location, setLocation] = useState('');

  // School settings (these would come from admin configuration)
  const schoolSettings = {
    punchType: 'punch_in_out', // or 'punch_in_only'
    salaryCalculationEnabled: true,
    dailyWorkingHours: 8,
    monthlyWorkingDays: 22,
    lateGracePeriod: 15, // minutes
    requireLocation: true,
    expectedStartTime: '09:00'
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if user is late
  useEffect(() => {
    if (punchInTime) {
      const expectedStart = new Date();
      const [hours, minutes] = schoolSettings.expectedStartTime.split(':');
      expectedStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const graceTime = new Date(expectedStart.getTime() + schoolSettings.lateGracePeriod * 60000);
      setIsLate(punchInTime > graceTime);
    }
  }, [punchInTime]);

  // Get user location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported'));
      }
    });
  };

  // Helper function for attendance status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-500">Late</Badge>;
      case 'leave':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">On Leave</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate work hours
  const calculateWorkHours = () => {
    if (!punchInTime) return 0;
    const endTime = punchedOut ? punchOutTime : currentTime;
    const diffMs = endTime - punchInTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.max(0, diffHours);
  };

  // Calculate estimated daily salary
  const calculateDailySalary = () => {
    const workHours = calculateWorkHours();
    const baseSalary = 50000; // This would come from teacher profile
    const dailyRate = baseSalary / schoolSettings.monthlyWorkingDays;
    
    let adjustedSalary = dailyRate;
    
    // Deduct for late arrival
    if (isLate) {
      adjustedSalary *= 0.95; // 5% deduction for being late
    }
    
    // Overtime compensation
    if (workHours > schoolSettings.dailyWorkingHours) {
      const overtimeHours = workHours - schoolSettings.dailyWorkingHours;
      const overtimeRate = (dailyRate / schoolSettings.dailyWorkingHours) * 1.5;
      adjustedSalary += overtimeHours * overtimeRate;
    }
    
    return adjustedSalary;
  };

  // Handle punch in
  const handlePunchIn = async () => {
    try {
      if (schoolSettings.requireLocation) {
        await getCurrentLocation();
        toast.info('Location verified successfully');
      }
      
      const now = new Date();
      setPunchInTime(now);
      setPunchedIn(true);
      
      const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);
      toast.success(`Punched in successfully at ${formattedTime}`);
      
      // Here you would send data to your API
      console.log('Punch In Data:', {
        time: now,
        location: location,
        date: now.toDateString()
      });
      
    } catch (error) {
      toast.error('Failed to get location. Please enable location services.');
    }
  };
  
  // Handle punch out
  const handlePunchOut = async () => {
    try {
      if (schoolSettings.requireLocation) {
        await getCurrentLocation();
      }
      
      const now = new Date();
      setPunchOutTime(now);
      setPunchedOut(true);
      
      const formattedTime = now.toTimeString().split(' ')[0].substring(0, 5);
      const workHours = calculateWorkHours();
      
      toast.success(`Punched out successfully at ${formattedTime}. Total work time: ${workHours.toFixed(1)} hours`);
      
      // Here you would send data to your API
      console.log('Punch Out Data:', {
        time: now,
        location: location,
        totalHours: workHours,
        estimatedSalary: calculateDailySalary()
      });
      
    } catch (error) {
      toast.error('Failed to get location. Please enable location services.');
    }
  };

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Time Display */}
        <div className="flex flex-col items-center justify-center text-center p-6 border rounded-md">
          <Clock size={48} className="text-eduos-primary mb-3" />
          <div className="text-3xl font-bold">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Punch In/Out Section */}
        <div className="space-y-4">
          {!punchedIn ? (
            <Button onClick={handlePunchIn} className="w-full" size="lg">
              <Clock className="mr-2 h-4 w-4" />
              Punch In
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Punch In Status */}
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Punched In</span>
                  {isLate && <Badge className="bg-amber-500 text-xs">Late</Badge>}
                </div>
                <span className="text-sm font-mono">
                  {punchInTime?.toTimeString().split(' ')[0].substring(0, 5)}
                </span>
              </div>

              {/* Location Info */}
              {schoolSettings.requireLocation && location && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>Location: {location}</span>
                </div>
              )}

              {/* Punch Out Button or Status */}
              {schoolSettings.punchType === 'punch_in_out' && (
                !punchedOut ? (
                  <Button onClick={handlePunchOut} variant="outline" className="w-full" size="lg">
                    <Timer className="mr-2 h-4 w-4" />
                    Punch Out
                  </Button>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Punched Out</span>
                    </div>
                    <span className="text-sm font-mono">
                      {punchOutTime?.toTimeString().split(' ')[0].substring(0, 5)}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Work Summary */}
        {punchedIn && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Work Hours */}
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-xs text-gray-500 mb-1">Work Hours</div>
                <div className="text-lg font-bold text-blue-600">
                  {calculateWorkHours().toFixed(1)}h
                </div>
                <div className="text-xs text-gray-500">
                  / {schoolSettings.dailyWorkingHours}h expected
                </div>
              </div>

              {/* Estimated Salary */}
              {schoolSettings.salaryCalculationEnabled && (
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <div className="text-xs text-gray-500 mb-1">Today's Salary</div>
                  <div className="text-lg font-bold text-green-600">
                    ₹{calculateDailySalary().toFixed(0)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isLate ? 'Late deduction applied' : 'Full rate'}
                  </div>
                </div>
              )}
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-2 justify-center">
              {isLate && <Badge variant="outline" className="text-xs border-amber-500 text-amber-600">Late Arrival</Badge>}
              {calculateWorkHours() > schoolSettings.dailyWorkingHours && 
                <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">Overtime</Badge>}
              {calculateWorkHours() >= schoolSettings.dailyWorkingHours && 
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">Full Hours</Badge>}
            </div>
          </div>
        )}

        {/* Legacy support for existing today record */}
        {todayRecord && !punchedIn && (
          <div className="w-full space-y-4">
            {getStatusBadge(todayRecord.status)}
            
            {todayRecord.status === 'present' || todayRecord.status === 'late' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">Check-in</div>
                  <div className="font-medium">{todayRecord.checkInTime}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  <div className="text-sm text-gray-500">Check-out</div>
                  <div className="font-medium">{todayRecord.checkOutTime || '—'}</div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-md text-center">
                <div className="text-sm text-gray-500">Reason</div>
                <div className="font-medium">{todayRecord.reason}</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
