import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  UserCheck,
  Eye,
} from "lucide-react";

const DashboardNotification = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance Notice",
      message:
        "The system will be down for maintenance on Sunday, April 30th, from 2 AM to 5 AM.",
      target: "all",
      priority: "medium",
      status: "active",
      createdAt: "2024-04-26",
      expiresAt: "2024-04-30",
    },
    {
      id: 2,
      title: "Exam Schedule Released",
      message:
        "The final examination schedule for this semester has been published. Please check your student portal.",
      target: "students",
      priority: "high",
      status: "active",
      createdAt: "2024-04-20",
      expiresAt: "2024-05-15",
    },
    {
      id: 3,
      title: "Staff Meeting Tomorrow",
      message:
        "Mandatory staff meeting scheduled for tomorrow at 10 AM in the conference room.",
      target: "staff",
      priority: "high",
      status: "active",
      createdAt: "2024-04-15",
      expiresAt: "2024-04-16",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    target: "all",
    priority: "medium",
    expiresAt: "",
  });

  const [editingNotification, setEditingNotification] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingNotification, setViewingNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      target: "all",
      priority: "medium",
      expiresAt: "",
    });
    setEditingNotification(null);
  };

  const handleSubmit = async (target = null) => {
    if (!formData.title.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const notificationData = {
        ...formData,
        target: target || formData.target,
        id: editingNotification ? editingNotification.id : Date.now(),
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };

      if (editingNotification) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === editingNotification.id ? notificationData : n
          )
        );
        toast({
          title: "Success",
          description: "Notification updated successfully.",
        });
      } else {
        setNotifications((prev) => [notificationData, ...prev]);
        toast({
          title: "Success",
          description: `Notification sent to ${getTargetLabel(
            target || formData.target
          )} successfully.`,
        });
      }

      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      target: notification.target,
      priority: notification.priority,
      expiresAt: notification.expiresAt,
    });
    setEditingNotification(notification);
  };

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setNotifications((prev) => prev.filter((n) => n.id !== deletingId));
      toast({
        title: "Success",
        description: "Notification deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const handleView = (notification) => {
    setViewingNotification(notification);
    setShowViewDialog(true);
  };

  const getTargetLabel = (target) => {
    const labels = {
      all: "All Users",
      students: "Students Only",
      staff: "Staff Only",
    };
    return labels[target] || target;
  };

  const getTargetIcon = (target) => {
    const icons = {
      all: Users,
      students: GraduationCap,
      staff: UserCheck,
    };
    const Icon = icons[target] || Users;
    return <Icon className="w-4 h-4" />;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "text-red-600 bg-red-50",
      medium: "text-yellow-600 bg-yellow-50",
      low: "text-green-600 bg-green-50",
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 pb-12 md:pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in leading-tight">
          Dashboard Notification
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            {editingNotification
              ? "Edit Notification"
              : "Add Dashboard Notification"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm sm:text-base">
                Notification Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter notification title..."
                className="transition-all duration-300 focus:border-eduos-primary text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target" className="text-sm sm:text-base">
                Target Audience
              </Label>
              <Select
                value={formData.target}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, target: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="staff">Staff Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm sm:text-base">
                Priority Level
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiresAt" className="text-sm sm:text-base">
                Expires On (Optional)
              </Label>
              <Input
                id="expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiresAt: e.target.value,
                  }))
                }
                className="transition-all duration-300 focus:border-eduos-primary text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm sm:text-base">
              Notification Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Enter notification message to display on the dashboard..."
              className="min-h-[120px] sm:min-h-[150px] transition-all duration-300 focus:border-eduos-primary text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {editingNotification ? (
              <>
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  className="flex-1 bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  {isSubmitting ? "Updating..." : "Update Notification"}
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1 text-xs sm:text-sm"
                >
                  Cancel Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleSubmit("all")}
                  disabled={isSubmitting}
                  className="flex-1 bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send to All Users"}
                </Button>
                <Button
                  onClick={() => handleSubmit("students")}
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send to Students"}
                </Button>
                <Button
                  onClick={() => handleSubmit("staff")}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send to Staff"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-3 animate-fade-in delay-200 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-4 md:p-6">
          <CardTitle className="text-lg sm:text-xl md:text-2xl">
            Current Notifications ({notifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>
                No notifications found. Create your first notification above.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-3 sm:p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                        {notification.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mt-2 sm:mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {getTargetIcon(notification.target)}
                        <span>
                          Sent to: {getTargetLabel(notification.target)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Date: {notification.createdAt}
                      </p>
                      {notification.expiresAt && (
                        <p className="text-xs text-gray-500">
                          Expires: {notification.expiresAt}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center mt-2 sm:mt-0">
                    <Button
                      onClick={() => handleView(notification)}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => handleEdit(notification)}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setDeletingId(notification.id);
                        setShowDeleteDialog(true);
                      }}
                      variant="destructive"
                      size="sm"
                      className="text-xs h-8"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* View Notification Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
          </DialogHeader>
          {viewingNotification && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Title</Label>
                <p className="text-sm text-gray-700 mt-1">
                  {viewingNotification.title}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                  {viewingNotification.message}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Target Audience</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getTargetIcon(viewingNotification.target)}
                    <span className="text-sm text-gray-700">
                      {getTargetLabel(viewingNotification.target)}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs mt-1 inline-block ${getPriorityColor(
                      viewingNotification.priority
                    )}`}
                  >
                    {viewingNotification.priority}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingNotification.createdAt}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Expires On</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingNotification.expiresAt || "No expiration"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notification? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardNotification;
