import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
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
import { AlertTriangle, RotateCcw, Calendar, Check } from "lucide-react";
import { toast } from "sonner";

const RollbackPromotion = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Available promotion dates with student counts for demonstration
  const promotionDates = [
    { value: "2023-07-15", label: "July 15, 2023", students: 145 },
    { value: "2023-12-20", label: "December 20, 2023", students: 89 },
    { value: "2024-03-30", label: "March 30, 2024", students: 203 },
    { value: "2024-07-15", label: "July 15, 2024", students: 167 },
  ];

  const handleRollbackClick = () => {
    if (!selectedDate) {
      toast.error("Selection Required", {
        description: "Please select a promotion date to roll back.",
        duration: 3000,
      });
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmRollback = async () => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const selectedPromotion = promotionDates.find(
        (date) => date.value === selectedDate
      );

      // Here you would typically make an API call to rollback the promotion
      // For now, we'll simulate success

      toast.success("Promotion Rolled Back Successfully!", {
        description: `Successfully rolled back promotion from ${selectedPromotion?.label}. ${selectedPromotion?.students} students affected.`,
        icon: <RotateCcw className="h-4 w-4" />,
        duration: 5000,
      });

      // Reset form
      setSelectedDate("");
      setIsConfirmOpen(false);
    } catch (error) {
      toast.error("Rollback Failed", {
        description: "Failed to rollback promotion. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Roll Back Last Promotion
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Promotion Rollback</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-md flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5" />
            <p className="text-sm text-amber-800">
              Please note: If you roll back any promotion date, it will delete
              the promotion history.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="promotionDate">Select Promotion Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select a promotion date to roll back" />
                </SelectTrigger>
                <SelectContent>
                  {promotionDates.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      <div className="flex justify-between items-center w-full">
                        <span>{date.label}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({date.students} students)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
            onClick={handleRollbackClick}
            disabled={!selectedDate || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Rolling Back...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4 mr-2" />
                Roll Back Promotion
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Promotion Rollback
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Are you sure you want to roll back the promotion from{" "}
                <span className="font-semibold">
                  {
                    promotionDates.find((date) => date.value === selectedDate)
                      ?.label
                  }
                </span>
                ?
              </p>
              <p className="text-sm bg-red-50 p-3 rounded border border-red-200 text-red-800">
                <strong>Warning:</strong> This action will permanently delete
                the promotion history and affect{" "}
                {
                  promotionDates.find((date) => date.value === selectedDate)
                    ?.students
                }{" "}
                students. This action cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRollback}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Rolling Back...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Confirm Rollback
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RollbackPromotion;
