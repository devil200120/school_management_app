
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


export const AttendanceStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-gray-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Working Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.workingDays}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Present</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{stats.present}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-700">Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-amber-700">Late</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-700">{stats.late}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">On Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats.leave}</div>
        </CardContent>
      </Card>
    </div>
  );
};
