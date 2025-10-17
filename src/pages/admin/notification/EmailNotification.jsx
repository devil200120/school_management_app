import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
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
import { toast } from "sonner";
import {
  Send,
  Paperclip,
  Eye,
  Trash2,
  Users,
  GraduationCap,
  UserCheck,
  Heart,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  Check,
  X,
} from "lucide-react";

const EmailNotification = () => {
  const [emailHistory, setEmailHistory] = useState([
    {
      id: 1,
      subject: "End of Term Notice",
      message:
        "Dear Parents/Guardians, This is to inform you that the term will end on May 15th, 2024. Please ensure all outstanding fees are settled before the end date. Thank you for your cooperation.",
      recipients: "parents",
      status: "sent",
      sentAt: "2024-04-10",
      attachments: ["term_schedule.pdf"],
      recipientCount: 245,
    },
    {
      id: 2,
      subject: "Staff Training Workshop",
      message:
        "All teaching staff are required to attend the professional development workshop scheduled for this weekend. The workshop will cover new teaching methodologies and technology integration.",
      recipients: "staff",
      status: "sent",
      sentAt: "2024-04-08",
      attachments: [],
      recipientCount: 52,
    },
    {
      id: 3,
      subject: "Examination Guidelines",
      message:
        "Dear Students, Please find attached the examination guidelines and schedule for the upcoming final exams. Ensure you are well-prepared and follow all examination protocols.",
      recipients: "students",
      status: "sent",
      sentAt: "2024-04-05",
      attachments: ["exam_guidelines.pdf", "exam_schedule.pdf"],
      recipientCount: 1205,
    },
  ]);

  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
    priority: "medium",
    schedule: false,
    scheduledDate: "",
    scheduledTime: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingEmail, setViewingEmail] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const resetForm = () => {
    setFormData({
      recipients: "",
      subject: "",
      message: "",
      priority: "medium",
      schedule: false,
      scheduledDate: "",
      scheduledTime: "",
    });
    setAttachments([]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newAttachments = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      }));
      setAttachments((prev) => [...prev, ...newAttachments]);
      toast.success("Files Attached", {
        description: `${files.length} file(s) attached successfully.`,
        icon: <Check className="h-4 w-4" />,
        duration: 3000,
      });
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendEmail = async () => {
    if (
      !formData.recipients ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields.",
        icon: <X className="h-4 w-4" />,
        duration: 3000,
      });
      return;
    }

    if (
      formData.schedule &&
      (!formData.scheduledDate || !formData.scheduledTime)
    ) {
      toast.error("Validation Error", {
        description: "Please set both date and time for scheduled email.",
        icon: <X className="h-4 w-4" />,
        duration: 3000,
      });
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const recipientCounts = {
        all: 1502,
        students: 1205,
        staff: 52,
        parents: 245,
      };

      const emailData = {
        id: Date.now(),
        subject: formData.subject,
        message: formData.message,
        recipients: formData.recipients,
        status: formData.schedule ? "scheduled" : "sent",
        sentAt: formData.schedule
          ? null
          : new Date().toISOString().split("T")[0],
        scheduledAt: formData.schedule
          ? `${formData.scheduledDate} ${formData.scheduledTime}`
          : null,
        attachments: attachments.map((att) => att.name),
        recipientCount: recipientCounts[formData.recipients] || 0,
        priority: formData.priority,
      };

      setEmailHistory((prev) => [emailData, ...prev]);

      toast.success("Email " + (formData.schedule ? "Scheduled" : "Sent"), {
        description: formData.schedule
          ? `Email scheduled successfully for ${formData.scheduledDate} at ${formData.scheduledTime}`
          : `Email sent successfully to ${getRecipientLabel(
              formData.recipients
            )} (${recipientCounts[formData.recipients]} recipients).`,
        icon: <Check className="h-4 w-4" />,
        duration: 4000,
      });

      resetForm();
    } catch (error) {
      toast.error("Email Failed", {
        description: "Failed to send email. Please try again.",
        icon: <X className="h-4 w-4" />,
        duration: 3000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleViewEmail = (email) => {
    setViewingEmail(email);
    setShowViewDialog(true);
  };

  const handleDeleteEmail = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setEmailHistory((prev) =>
        prev.filter((email) => email.id !== deletingId)
      );
      toast.success("Email Deleted", {
        description: "Email deleted from history successfully.",
        icon: <Check className="h-4 w-4" />,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Delete Failed", {
        description: "Failed to delete email. Please try again.",
        icon: <X className="h-4 w-4" />,
        duration: 3000,
      });
    } finally {
      setShowDeleteDialog(false);
      setDeletingId(null);
    }
  };

  const getRecipientLabel = (recipient) => {
    const labels = {
      all: "All Users",
      students: "Students",
      staff: "Staff",
      parents: "Parents",
    };
    return labels[recipient] || recipient;
  };

  const getRecipientIcon = (recipient) => {
    const icons = {
      all: Users,
      students: GraduationCap,
      staff: UserCheck,
      parents: Heart,
    };
    const Icon = icons[recipient] || Users;
    return <Icon className="w-4 h-4" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      sent: "text-green-600 bg-green-50",
      scheduled: "text-blue-600 bg-blue-50",
      draft: "text-gray-600 bg-gray-50",
    };
    return colors[status] || colors.draft;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Email Notification
        </h2>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Send Email Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recipients">Select Recipients *</Label>
              <Select
                value={formData.recipients}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, recipients: value }))
                }
              >
                <SelectTrigger className="transition-all duration-300">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users (1,502)</SelectItem>
                  <SelectItem value="students">
                    Students Only (1,205)
                  </SelectItem>
                  <SelectItem value="staff">Staff Only (52)</SelectItem>
                  <SelectItem value="parents">Parents Only (245)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Enter email subject..."
              className="transition-all duration-300 focus:border-eduos-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Email Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Enter email message..."
              className="min-h-[200px] transition-all duration-300 focus:border-eduos-primary"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachments (Optional)</Label>
              <Input
                id="attachment"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="transition-all duration-300"
              />
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                <Label>Attached Files ({attachments.length})</Label>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({formatFileSize(file.size)})
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAttachment(index)}
                        className="h-6 px-2"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="schedule"
                checked={formData.schedule}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    schedule: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <Label htmlFor="schedule" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Schedule Email for Later
              </Label>
            </div>

            {formData.schedule && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Schedule Date</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scheduledDate: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Schedule Time</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scheduledTime: e.target.value,
                      }))
                    }
                    className="transition-all duration-300 focus:border-eduos-primary"
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleSendEmail}
            disabled={isSending}
            className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSending
              ? "Sending..."
              : formData.schedule
              ? "Schedule Email"
              : "Send Email"}
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-3 animate-fade-in delay-200 max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Email History ({emailHistory.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {emailHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No emails sent yet. Send your first email above.</p>
            </div>
          ) : (
            emailHistory.map((email) => (
              <div
                key={email.id}
                className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-800">
                        {email.subject}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          email.status
                        )}`}
                      >
                        {email.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {email.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        {getRecipientIcon(email.recipients)}
                        <span>
                          Sent to: {getRecipientLabel(email.recipients)} (
                          {email.recipientCount})
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {email.status === "sent"
                          ? `Sent: ${email.sentAt}`
                          : `Scheduled: ${email.scheduledAt}`}
                      </p>
                      {email.attachments.length > 0 && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {email.attachments.length} attachment(s)
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleViewEmail(email)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => {
                        setDeletingId(email.id);
                        setShowDeleteDialog(true);
                      }}
                      variant="destructive"
                      size="sm"
                      className="text-xs"
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

      {/* View Email Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Details
            </DialogTitle>
          </DialogHeader>
          {viewingEmail && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Subject</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingEmail.subject}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Recipients</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getRecipientIcon(viewingEmail.recipients)}
                    <span className="text-sm text-gray-700">
                      {getRecipientLabel(viewingEmail.recipients)} (
                      {viewingEmail.recipientCount})
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs mt-1 inline-block ${getStatusColor(
                      viewingEmail.status
                    )}`}
                  >
                    {viewingEmail.status}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {viewingEmail.status === "sent"
                      ? viewingEmail.sentAt
                      : viewingEmail.scheduledAt}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Message</Label>
                <div className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {viewingEmail.message}
                </div>
              </div>

              {viewingEmail.attachments.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">
                    Attachments ({viewingEmail.attachments.length})
                  </Label>
                  <div className="mt-1 space-y-2">
                    {viewingEmail.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                      >
                        <Paperclip className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              Are you sure you want to delete this email from history? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEmail}>
              Delete Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailNotification;
