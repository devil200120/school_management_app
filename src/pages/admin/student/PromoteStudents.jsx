import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { AlertTriangle, TrendingUp, TrendingDown, Users } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

const PromoteStudents = () => {
  const [level, setLevel] = useState("");
  const [session, setSession] = useState("");
  const [targetSession, setTargetSession] = useState("");
  const [isPromote, setIsPromote] = useState(true);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock student data for the selected criteria
  const mockStudents = [
    { id: 1, name: "John Doe", currentClass: "SS 2", targetClass: "SS 3" },
    { id: 2, name: "Jane Smith", currentClass: "SS 2", targetClass: "SS 3" },
    { id: 3, name: "Mike Johnson", currentClass: "SS 2", targetClass: "SS 3" },
    { id: 4, name: "Sarah Wilson", currentClass: "SS 2", targetClass: "SS 3" },
    { id: 5, name: "David Brown", currentClass: "SS 2", targetClass: "SS 3" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!level || !session || !targetSession) {
      toast.error("Missing information", {
        description:
          "Please select Level, Current Session, and Target Session.",
        duration: 3000,
      });
      return;
    }

    if (session === targetSession) {
      toast.error("Invalid selection", {
        description: "Current Session and Target Session cannot be the same.",
        duration: 3000,
      });
      return;
    }

    setIsConfirmDialogOpen(true);
  };

  const confirmAction = async () => {
    setIsProcessing(true);
    setIsConfirmDialogOpen(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const action = isPromote ? "promoted" : "demoted";
      const actionPast = isPromote ? "promotion" : "demotion";

      toast.success(`Students ${action} successfully!`, {
        description: `Successfully processed ${actionPast} for ${mockStudents.length} students from ${level} (${session} to ${targetSession}).`,
        duration: 5000,
      });

      // Reset form
      setLevel("");
      setSession("");
      setTargetSession("");
    } catch (error) {
      console.error("Error processing students:", error);
      toast.error(`${isPromote ? "Promotion" : "Demotion"} failed`, {
        description:
          "There was an error processing the students. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getTargetLevel = () => {
    if (!isPromote) return level; // For demotion, stay in same level or go down

    switch (level) {
      case "Primary":
        return "Junior Secondary";
      case "Junior Secondary":
        return "Senior Secondary";
      case "Senior Secondary":
        return "Graduated";
      default:
        return "Next Level";
    }
  };

  const getActionDescription = () => {
    if (isPromote) {
      return `This will promote students from ${level} to ${getTargetLevel()} for the ${targetSession} session.`;
    } else {
      return `This will demote students within ${level} or to a lower level for the ${targetSession} session.`;
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Promote and Demote Students
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Promote and Demote Students</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Caution</AlertTitle>
            <AlertDescription>
              This action will affect all students in the selected level and
              session. Please double-check your selection before proceeding.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              className={`flex-1 transition-all duration-200 ${
                isPromote
                  ? "bg-eduos-primary text-white hover:bg-eduos-secondary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsPromote(true)}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Promote Students
            </Button>
            <Button
              type="button"
              className={`flex-1 transition-all duration-200 ${
                !isPromote
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIsPromote(false)}
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Demote Students
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="level">Select Level</Label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Primary">Primary</option>
                  <option value="Junior Secondary">Junior Secondary</option>
                  <option value="Senior Secondary">Senior Secondary</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session">Current Session</Label>
                <select
                  id="session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Current Session</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetSession">Target Session</Label>
                <select
                  id="targetSession"
                  value={targetSession}
                  onChange={(e) => setTargetSession(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eduos-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Target Session</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex-1">
                {level && session && targetSession ? (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      Action Preview:
                    </p>
                    <p className="text-sm text-gray-600">
                      {getActionDescription()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Estimated students affected: {mockStudents.length}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {isPromote
                      ? "This will promote students from the current level to the next level."
                      : "This will demote students from the current level to the previous level."}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className={`ml-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isPromote
                    ? "bg-eduos-primary hover:bg-eduos-secondary"
                    : "bg-amber-500 hover:bg-amber-600"
                } transition-colors`}
                disabled={!level || !session || !targetSession || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4" />
                    <span>
                      {isPromote ? "Promote Students" : "Demote Students"}
                    </span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {isPromote ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-amber-600" />
              )}
              Confirm {isPromote ? "Promotion" : "Demotion"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {isPromote ? "promote" : "demote"}{" "}
              students from {level}?
              <br />
              <br />
              <strong>Details:</strong>
              <br />• From Session: {session}
              <br />• To Session: {targetSession}
              <br />• Estimated Students: {mockStudents.length}
              <br />• Target Level: {isPromote ? getTargetLevel() : level}
              <br />
              <br />
              This action will affect multiple students and cannot be easily
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={isProcessing}
              className={
                isPromote
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }
            >
              {isProcessing
                ? "Processing..."
                : `Confirm ${isPromote ? "Promotion" : "Demotion"}`}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PromoteStudents;
