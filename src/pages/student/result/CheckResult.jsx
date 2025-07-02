import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const CheckResult = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold sm:text-left">Check New Result</h1>

      <Card className="max-w-md mx-auto">
        <CardHeader className=" sm:text-left">
          <CardTitle className="text-lg sm:text-xl">Check Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="checker" className=" sm:text-left block">Enter Result Checker</Label>
            <Input
              id="checker"
              placeholder="Enter your result checker pin"
            />
            <p className="text-xs text-gray-500 sm:text-left">
              Enter the pin provided by your school administration
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class" className=" sm:text-left block">Select Result Class</Label>
            <Select>
              <SelectTrigger id="class" className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary-1">Primary 1</SelectItem>
                <SelectItem value="primary-2">Primary 2</SelectItem>
                <SelectItem value="primary-3">Primary 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="term" className=" sm:text-left block">Select Result Term</Label>
            <Select>
              <SelectTrigger id="term" className="w-full">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">First Term</SelectItem>
                <SelectItem value="second">Second Term</SelectItem>
                <SelectItem value="third">Third Term</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="session" className=" sm:text-left block">Select Session</Label>
            <Select>
              <SelectTrigger id="session" className="w-full">
                <SelectValue placeholder="Select session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
                <SelectItem value="2021-2022">2021-2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 mt-4 py-2 text-sm sm:text-base">
            Check Result
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckResult;
