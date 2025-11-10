import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { Separator } from "../../../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  FileText,
  Database,
  Save,
  RefreshCw,
} from "lucide-react";

const AccountantSettings = () => {
  // Personal settings state
  const [personalSettings, setPersonalSettings] = useState({
    name: "John Doe",
    email: "john.doe@school.edu",
    phone: "+234-801-234-5678",
    department: "Finance & Accounts",
    language: "english",
    timezone: "africa_lagos",
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    paymentAlerts: true,
    dueDateReminders: true,
    reportGeneration: false,
    systemUpdates: true,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true,
  });

  // Report settings state
  const [reportSettings, setReportSettings] = useState({
    defaultFormat: "pdf",
    autoGenerate: false,
    includeGraphs: true,
    reportFrequency: "monthly",
    emailReports: false,
  });

  // Database settings state
  const [databaseSettings, setDatabaseSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "365",
    compressionEnabled: true,
  });

  const handlePersonalSave = () => {
    toast.success("Personal settings updated successfully");
  };

  const handleNotificationSave = () => {
    toast.success("Notification preferences saved");
  };

  const handleSecuritySave = () => {
    toast.success("Security settings updated");
  };

  const handleReportSave = () => {
    toast.success("Report settings saved");
  };

  const handleDatabaseSave = () => {
    toast.success("Database settings updated");
  };

  const handleResetToDefaults = () => {
    toast.info("Settings reset to default values");
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Accountant Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetToDefaults}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          {/* Personal Settings */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={personalSettings.name}
                      onChange={(e) =>
                        setPersonalSettings({
                          ...personalSettings,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalSettings.email}
                      onChange={(e) =>
                        setPersonalSettings({
                          ...personalSettings,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={personalSettings.phone}
                      onChange={(e) =>
                        setPersonalSettings({
                          ...personalSettings,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={personalSettings.department}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={personalSettings.language}
                      onValueChange={(value) =>
                        setPersonalSettings({
                          ...personalSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hausa">Hausa</SelectItem>
                        <SelectItem value="yoruba">Yoruba</SelectItem>
                        <SelectItem value="igbo">Igbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={personalSettings.timezone}
                      onValueChange={(value) =>
                        setPersonalSettings({
                          ...personalSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa_lagos">
                          Africa/Lagos
                        </SelectItem>
                        <SelectItem value="africa_abuja">
                          Africa/Abuja
                        </SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={handlePersonalSave}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive push notifications in browser",
                    },
                    {
                      key: "paymentAlerts",
                      label: "Payment Alerts",
                      description:
                        "Get notified about new payments and transactions",
                    },
                    {
                      key: "dueDateReminders",
                      label: "Due Date Reminders",
                      description: "Receive reminders for upcoming due dates",
                    },
                    {
                      key: "reportGeneration",
                      label: "Report Generation",
                      description: "Get notified when reports are ready",
                    },
                    {
                      key: "systemUpdates",
                      label: "System Updates",
                      description: "Receive notifications about system updates",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between space-x-2"
                    >
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <div className="text-sm text-muted-foreground">
                          {setting.description}
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings[setting.key]}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            [setting.key]: checked,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleNotificationSave}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorAuth: checked,
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">
                        Session Timeout (minutes)
                      </Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">
                        Password Expiry (days)
                      </Label>
                      <Select
                        value={securitySettings.passwordExpiry}
                        onValueChange={(value) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordExpiry: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Login Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </div>
                    </div>
                    <Switch
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          loginNotifications: checked,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSecuritySave}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Settings */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Settings
                </CardTitle>
                <CardDescription>
                  Configure default report generation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultFormat">Default Format</Label>
                    <Select
                      value={reportSettings.defaultFormat}
                      onValueChange={(value) =>
                        setReportSettings({
                          ...reportSettings,
                          defaultFormat: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportFrequency">Report Frequency</Label>
                    <Select
                      value={reportSettings.reportFrequency}
                      onValueChange={(value) =>
                        setReportSettings({
                          ...reportSettings,
                          reportFrequency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "autoGenerate",
                      label: "Auto Generate Reports",
                      description:
                        "Automatically generate reports based on frequency",
                    },
                    {
                      key: "includeGraphs",
                      label: "Include Graphs",
                      description:
                        "Include charts and graphs in generated reports",
                    },
                    {
                      key: "emailReports",
                      label: "Email Reports",
                      description:
                        "Automatically email reports to stakeholders",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between space-x-2"
                    >
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <div className="text-sm text-muted-foreground">
                          {setting.description}
                        </div>
                      </div>
                      <Switch
                        checked={reportSettings[setting.key]}
                        onCheckedChange={(checked) =>
                          setReportSettings({
                            ...reportSettings,
                            [setting.key]: checked,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={handleReportSave} className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Report Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Settings */}
          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Settings
                </CardTitle>
                <CardDescription>
                  Configure data backup and retention settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select
                      value={databaseSettings.backupFrequency}
                      onValueChange={(value) =>
                        setDatabaseSettings({
                          ...databaseSettings,
                          backupFrequency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Select
                      value={databaseSettings.dataRetention}
                      onValueChange={(value) =>
                        setDatabaseSettings({
                          ...databaseSettings,
                          dataRetention: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="180">6 months</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1095">3 years</SelectItem>
                        <SelectItem value="-1">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      key: "autoBackup",
                      label: "Automatic Backup",
                      description: "Enable automatic database backups",
                    },
                    {
                      key: "compressionEnabled",
                      label: "Compression",
                      description:
                        "Compress backup files to save storage space",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between space-x-2"
                    >
                      <div className="space-y-0.5">
                        <Label>{setting.label}</Label>
                        <div className="text-sm text-muted-foreground">
                          {setting.description}
                        </div>
                      </div>
                      <Switch
                        checked={databaseSettings[setting.key]}
                        onCheckedChange={(checked) =>
                          setDatabaseSettings({
                            ...databaseSettings,
                            [setting.key]: checked,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleDatabaseSave}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Database Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AccountantSettings;
