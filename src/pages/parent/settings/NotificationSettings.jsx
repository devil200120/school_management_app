import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  BookOpen,
  AlertCircle,
  Save,
  Volume2,
  VolumeX,
  Smartphone,
  Users,
  GraduationCap,
} from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    // Email Notifications
    emailEnabled: true,
    academicUpdates: true,
    paymentReminders: true,
    attendanceAlerts: true,
    examSchedules: true,
    schoolAnnouncements: true,
    emergencyNotifications: true,
    weeklyReports: true,

    // SMS Notifications
    smsEnabled: true,
    urgentAlertsOnly: false,
    paymentDueSms: true,
    absenteeAlerts: true,
    emergencySms: true,

    // Push Notifications
    pushEnabled: true,
    messageNotifications: true,
    assignmentDeadlines: true,
    eventReminders: true,
    gradeUpdates: true,

    // Frequency Settings
    emailFrequency: "immediate",
    digestFrequency: "weekly",
    reminderTiming: "24hours",

    // Child-specific settings
    childNotifications: {
      1: {
        // Sarah
        academicAlerts: true,
        behaviorReports: true,
        healthUpdates: true,
      },
      2: {
        // Michael
        academicAlerts: true,
        behaviorReports: false,
        healthUpdates: true,
      },
    },
  });

  const handleToggle = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleChildToggle = (childId, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      childNotifications: {
        ...prev.childNotifications,
        [childId]: {
          ...prev.childNotifications[childId],
          [setting]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save notification preferences
    toast({
      title: "Settings Saved",
      description:
        "Your notification preferences have been updated successfully.",
    });
  };

  const children = [
    { id: "1", name: "Sarah Johnson", class: "JSS 2A" },
    { id: "2", name: "Michael Johnson", class: "Primary 5B" },
  ];

  const notificationStats = {
    totalSent: 247,
    thisMonth: 23,
    unread: 3,
    lastReceived: "2 hours ago",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notification Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Customize how you receive updates about your children's education
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Notification Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {notificationStats.totalSent}
              </div>
              <div className="text-sm text-gray-600">Total Sent</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {notificationStats.thisMonth}
              </div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {notificationStats.unread}
              </div>
              <div className="text-sm text-gray-600">Unread</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-sm font-medium">Last Received</div>
              <div className="text-sm text-gray-600">
                {notificationStats.lastReceived}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </div>
            <Switch
              checked={settings.emailEnabled}
              onCheckedChange={(checked) =>
                handleToggle("emailEnabled", checked)
              }
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Academic Updates</Label>
                  <p className="text-sm text-gray-600">
                    Grades, assignments, and progress reports
                  </p>
                </div>
                <Switch
                  checked={settings.academicUpdates}
                  onCheckedChange={(checked) =>
                    handleToggle("academicUpdates", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-gray-600">
                    Fee due dates and payment confirmations
                  </p>
                </div>
                <Switch
                  checked={settings.paymentReminders}
                  onCheckedChange={(checked) =>
                    handleToggle("paymentReminders", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Attendance Alerts</Label>
                  <p className="text-sm text-gray-600">
                    Daily attendance and absence notifications
                  </p>
                </div>
                <Switch
                  checked={settings.attendanceAlerts}
                  onCheckedChange={(checked) =>
                    handleToggle("attendanceAlerts", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Exam Schedules</Label>
                  <p className="text-sm text-gray-600">
                    Upcoming exams and result announcements
                  </p>
                </div>
                <Switch
                  checked={settings.examSchedules}
                  onCheckedChange={(checked) =>
                    handleToggle("examSchedules", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>School Announcements</Label>
                  <p className="text-sm text-gray-600">
                    Events, holidays, and general notices
                  </p>
                </div>
                <Switch
                  checked={settings.schoolAnnouncements}
                  onCheckedChange={(checked) =>
                    handleToggle("schoolAnnouncements", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Emergency Notifications</Label>
                  <p className="text-sm text-gray-600">
                    Urgent school-wide alerts
                  </p>
                </div>
                <Switch
                  checked={settings.emergencyNotifications}
                  onCheckedChange={(checked) =>
                    handleToggle("emergencyNotifications", checked)
                  }
                  disabled={!settings.emailEnabled}
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Frequency</Label>
                <Select
                  value={settings.emailFrequency}
                  onValueChange={(value) =>
                    handleToggle("emailFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Weekly Digest</Label>
                <Select
                  value={settings.digestFrequency}
                  onValueChange={(value) =>
                    handleToggle("digestFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Every Sunday</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              SMS Notifications
            </div>
            <Switch
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => handleToggle("smsEnabled", checked)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Urgent Alerts Only</Label>
                <p className="text-sm text-gray-600">
                  Limit SMS to emergency and critical notifications
                </p>
              </div>
              <Switch
                checked={settings.urgentAlertsOnly}
                onCheckedChange={(checked) =>
                  handleToggle("urgentAlertsOnly", checked)
                }
                disabled={!settings.smsEnabled}
              />
            </div>

            {!settings.urgentAlertsOnly && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Payment Due SMS</Label>
                    <p className="text-sm text-gray-600">
                      Fee payment reminders
                    </p>
                  </div>
                  <Switch
                    checked={settings.paymentDueSms}
                    onCheckedChange={(checked) =>
                      handleToggle("paymentDueSms", checked)
                    }
                    disabled={!settings.smsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Absentee Alerts</Label>
                    <p className="text-sm text-gray-600">
                      Same-day absence notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.absenteeAlerts}
                    onCheckedChange={(checked) =>
                      handleToggle("absenteeAlerts", checked)
                    }
                    disabled={!settings.smsEnabled}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="space-y-1">
                <Label>Emergency SMS</Label>
                <p className="text-sm text-gray-600">
                  Critical safety and emergency alerts
                </p>
              </div>
              <Switch
                checked={settings.emergencySms}
                onCheckedChange={(checked) =>
                  handleToggle("emergencySms", checked)
                }
                disabled={!settings.smsEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Push Notifications
            </div>
            <Switch
              checked={settings.pushEnabled}
              onCheckedChange={(checked) =>
                handleToggle("pushEnabled", checked)
              }
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Message Notifications</Label>
                <p className="text-sm text-gray-600">
                  New messages from teachers
                </p>
              </div>
              <Switch
                checked={settings.messageNotifications}
                onCheckedChange={(checked) =>
                  handleToggle("messageNotifications", checked)
                }
                disabled={!settings.pushEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Assignment Deadlines</Label>
                <p className="text-sm text-gray-600">
                  Upcoming assignment due dates
                </p>
              </div>
              <Switch
                checked={settings.assignmentDeadlines}
                onCheckedChange={(checked) =>
                  handleToggle("assignmentDeadlines", checked)
                }
                disabled={!settings.pushEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Event Reminders</Label>
                <p className="text-sm text-gray-600">
                  School events and activities
                </p>
              </div>
              <Switch
                checked={settings.eventReminders}
                onCheckedChange={(checked) =>
                  handleToggle("eventReminders", checked)
                }
                disabled={!settings.pushEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Grade Updates</Label>
                <p className="text-sm text-gray-600">
                  New grades and report cards
                </p>
              </div>
              <Switch
                checked={settings.gradeUpdates}
                onCheckedChange={(checked) =>
                  handleToggle("gradeUpdates", checked)
                }
                disabled={!settings.pushEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Child-Specific Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Child-Specific Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {children.map((child) => (
              <div key={child.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.class}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Academic Alerts</Label>
                      <p className="text-sm text-gray-600">
                        Grades and progress updates
                      </p>
                    </div>
                    <Switch
                      checked={
                        settings.childNotifications[child.id]?.academicAlerts ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        handleChildToggle(child.id, "academicAlerts", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Behavior Reports</Label>
                      <p className="text-sm text-gray-600">
                        Disciplinary and behavioral updates
                      </p>
                    </div>
                    <Switch
                      checked={
                        settings.childNotifications[child.id]
                          ?.behaviorReports || false
                      }
                      onCheckedChange={(checked) =>
                        handleChildToggle(child.id, "behaviorReports", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Health Updates</Label>
                      <p className="text-sm text-gray-600">
                        Medical and health-related notifications
                      </p>
                    </div>
                    <Switch
                      checked={
                        settings.childNotifications[child.id]?.healthUpdates ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        handleChildToggle(child.id, "healthUpdates", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Reminder Timing</Label>
              <Select
                value={settings.reminderTiming}
                onValueChange={(value) => handleToggle("reminderTiming", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24hours">24 hours before</SelectItem>
                  <SelectItem value="48hours">48 hours before</SelectItem>
                  <SelectItem value="1week">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Do Not Disturb</Label>
                <p className="text-sm text-gray-600">
                  Pause non-urgent notifications (9 PM - 7 AM)
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 text-yellow-800 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Important Note</span>
            </div>
            <p className="text-sm text-yellow-700">
              Emergency notifications will always be delivered regardless of
              your settings. These include safety alerts, urgent health
              notifications, and critical school announcements.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Test Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Test Email
            </Button>
            <Button variant="outline" size="sm">
              <Smartphone className="h-4 w-4 mr-2" />
              Test SMS
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Test Push
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
