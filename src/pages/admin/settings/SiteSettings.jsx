import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Switch } from "../../../components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Code, Mail, Settings, Shield, Upload } from "lucide-react";
import { Separator } from "../../../components/ui/separator";

// Form schema for General settings
const generalFormSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  siteDescription: z.string().optional(),
  siteUrl: z.string().url("Please enter a valid URL"),
  adminEmail: z.string().email("Please enter a valid email"),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
  weekStartsOn: z.string(),
});

// Form schema for Email settings
const emailFormSchema = z.object({
  smtpHost: z.string().min(1, "SMTP host is required"),
  smtpPort: z.string().min(1, "SMTP port is required"),
  smtpUser: z.string().min(1, "SMTP username is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  smtpEncryption: z.string(),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Please enter a valid email"),
  replyToEmail: z.string().email("Please enter a valid email").optional(),
});

// Form schema for Integration settings
const integrationFormSchema = z.object({
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  recaptchaSiteKey: z.string().optional(),
  recaptchaSecretKey: z.string().optional(),
  googleMapsApiKey: z.string().optional(),
});

const SiteSettings = () => {
  // Sample initial values
  const generalInitialValues = {
    siteName: "EDUOS School Management",
    siteDescription:
      "Comprehensive school management system for educational institutions",
    siteUrl: "https://www.eduos-school.com",
    adminEmail: "admin@eduos.com",
    timezone: "UTC+0",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "24h",
    weekStartsOn: "monday",
  };

  const emailInitialValues = {
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@example.com",
    smtpPassword: "********",
    smtpEncryption: "tls",
    fromName: "EDUOS School Management",
    fromEmail: "noreply@eduos.com",
    replyToEmail: "support@eduos.com",
  };

  const integrationInitialValues = {
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    facebookPixelId: "",
    recaptchaSiteKey: "",
    recaptchaSecretKey: "",
    googleMapsApiKey: "",
  };

  // Create form instances
  const generalForm =
    useForm <
    GeneralFormValues >
    {
      resolver: zodResolver(generalFormSchema),
      defaultValues: generalInitialValues,
    };

  const emailForm =
    useForm <
    EmailFormValues >
    {
      resolver: zodResolver(emailFormSchema),
      defaultValues: emailInitialValues,
    };

  const integrationForm =
    useForm <
    IntegrationFormValues >
    {
      resolver: zodResolver(integrationFormSchema),
      defaultValues: integrationInitialValues,
    };

  // Form submission handlers
  const onGeneralSubmit = (data) => {
    console.log("General settings saved:", data);
    toast.success("General settings saved successfully");
  };

  const onEmailSubmit = (data) => {
    console.log("Email settings saved:", data);
    toast.success("Email settings saved successfully");
  };

  const onIntegrationSubmit = (data) => {
    console.log("Integration settings saved:", data);
    toast.success("Integration settings saved successfully");
  };

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
        <p className="text-muted-foreground">
          Configure system settings and preferences for your site.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Code size={16} />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="uploads" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Uploads</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic site information and display preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name of your website or application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="adminEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Used for system notifications and alerts.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="siteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The complete URL for your website (with https://).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Timezone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UTC-12">UTC-12:00</SelectItem>
                              <SelectItem value="UTC-11">UTC-11:00</SelectItem>
                              <SelectItem value="UTC-10">UTC-10:00</SelectItem>
                              <SelectItem value="UTC-9">UTC-09:00</SelectItem>
                              <SelectItem value="UTC-8">UTC-08:00</SelectItem>
                              <SelectItem value="UTC-7">UTC-07:00</SelectItem>
                              <SelectItem value="UTC-6">UTC-06:00</SelectItem>
                              <SelectItem value="UTC-5">UTC-05:00</SelectItem>
                              <SelectItem value="UTC-4">UTC-04:00</SelectItem>
                              <SelectItem value="UTC-3">UTC-03:00</SelectItem>
                              <SelectItem value="UTC-2">UTC-02:00</SelectItem>
                              <SelectItem value="UTC-1">UTC-01:00</SelectItem>
                              <SelectItem value="UTC+0">UTC±00:00</SelectItem>
                              <SelectItem value="UTC+1">UTC+01:00</SelectItem>
                              <SelectItem value="UTC+2">UTC+02:00</SelectItem>
                              <SelectItem value="UTC+3">UTC+03:00</SelectItem>
                              <SelectItem value="UTC+4">UTC+04:00</SelectItem>
                              <SelectItem value="UTC+5">UTC+05:00</SelectItem>
                              <SelectItem value="UTC+6">UTC+06:00</SelectItem>
                              <SelectItem value="UTC+7">UTC+07:00</SelectItem>
                              <SelectItem value="UTC+8">UTC+08:00</SelectItem>
                              <SelectItem value="UTC+9">UTC+09:00</SelectItem>
                              <SelectItem value="UTC+10">UTC+10:00</SelectItem>
                              <SelectItem value="UTC+11">UTC+11:00</SelectItem>
                              <SelectItem value="UTC+12">UTC+12:00</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Set the default timezone for your site.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="YYYY-MM-DD">
                                YYYY-MM-DD
                              </SelectItem>
                              <SelectItem value="MM/DD/YYYY">
                                MM/DD/YYYY
                              </SelectItem>
                              <SelectItem value="DD/MM/YYYY">
                                DD/MM/YYYY
                              </SelectItem>
                              <SelectItem value="DD-MM-YYYY">
                                DD-MM-YYYY
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How dates are displayed throughout the site.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="timeFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Format</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="12h">
                                12 Hour (AM/PM)
                              </SelectItem>
                              <SelectItem value="24h">24 Hour</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How time is displayed throughout the site.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="weekStartsOn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Week Starts On</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select start day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sunday">Sunday</SelectItem>
                              <SelectItem value="monday">Monday</SelectItem>
                              <SelectItem value="saturday">Saturday</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            First day of the week for calendars.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter a brief description of your site"
                            className="h-24"
                          />
                        </FormControl>
                        <FormDescription>
                          Used for SEO and site meta description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Save General Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure your site's email delivery settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={emailForm.control}
                      name="smtpHost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Host</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Mail server hostname (e.g., smtp.gmail.com)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Port</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Mail server port (e.g., 587 for TLS, 465 for SSL)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpUser"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Authentication username for SMTP server
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormDescription>
                            Authentication password for SMTP server
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="smtpEncryption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Encryption</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select encryption type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="ssl">SSL</SelectItem>
                              <SelectItem value="tls">TLS</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Encryption method for SMTP connection
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="fromName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Name that appears in the From field
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="fromEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Email address that sends the emails
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="replyToEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reply-To Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormDescription>
                            Email address for replies (optional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit">Save Email Settings</Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={() => {
                        // Simulate sending test email
                        const testEmail = "admin@example.com"; // This would normally come from form or current user
                        const confirmSend = window.confirm(
                          `Send test email to ${testEmail}?`
                        );

                        if (confirmSend) {
                          // Simulate email sending delay
                          const button = event.target;
                          button.disabled = true;
                          button.textContent = "Sending...";

                          setTimeout(() => {
                            button.disabled = false;
                            button.textContent = "Send Test Email";

                            toast.success(
                              "Test email sent successfully! Check your inbox."
                            );

                            // You could also show more details
                            alert(
                              `Test email sent to: ${testEmail}\nSubject: Test Email from School Management System\nSent at: ${new Date().toLocaleString()}\n\nPlease check your inbox and spam folder.`
                            );
                          }, 2000);
                        }
                      }}
                    >
                      Send Test Email
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Connect third-party services and APIs to your site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...integrationForm}>
                <form
                  onSubmit={integrationForm.handleSubmit(onIntegrationSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Google Services</h3>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={integrationForm.control}
                          name="googleAnalyticsId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google Analytics ID</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                                />
                              </FormControl>
                              <FormDescription>
                                Your Google Analytics tracking ID
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={integrationForm.control}
                          name="googleMapsApiKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google Maps API Key</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter API key" />
                              </FormControl>
                              <FormDescription>
                                Used for maps integration on your site
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">
                        Social Media Integration
                      </h3>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={integrationForm.control}
                          name="facebookPixelId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook Pixel ID</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter Pixel ID"
                                />
                              </FormControl>
                              <FormDescription>
                                For Facebook advertising and analytics
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Security</h3>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={integrationForm.control}
                          name="recaptchaSiteKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google reCAPTCHA Site Key</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter Site Key"
                                />
                              </FormControl>
                              <FormDescription>
                                Public key for reCAPTCHA integration
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={integrationForm.control}
                          name="recaptchaSecretKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Google reCAPTCHA Secret Key</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter Secret Key"
                                  type="password"
                                />
                              </FormControl>
                              <FormDescription>
                                Private key for server-side verification
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit">Save Integration Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* File Uploads Tab */}
        <TabsContent value="uploads">
          <Card>
            <CardHeader>
              <CardTitle>File Upload Settings</CardTitle>
              <CardDescription>
                Configure file upload limits and storage options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel>Maximum File Size</FormLabel>
                    <Input type="text" value="10MB" />
                    <p className="text-sm text-muted-foreground">
                      Maximum allowed file size for uploads
                    </p>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Allowed File Types</FormLabel>
                    <Input
                      type="text"
                      value="jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,zip"
                    />
                    <p className="text-sm text-muted-foreground">
                      File extensions separated by commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Image Quality (1-100)</FormLabel>
                    <Input type="number" min="1" max="100" value="85" />
                    <p className="text-sm text-muted-foreground">
                      JPEG/PNG compression quality for uploaded images
                    </p>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Storage Location</FormLabel>
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue placeholder="Select storage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Storage</SelectItem>
                        <SelectItem value="s3">Amazon S3</SelectItem>
                        <SelectItem value="google">
                          Google Cloud Storage
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Where uploaded files are stored
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Image Resizing</h3>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Thumbnail Size</FormLabel>
                      <div className="flex gap-2">
                        <Input type="number" value="150" className="w-20" />
                        <span className="flex items-center">×</span>
                        <Input type="number" value="150" className="w-20" />
                        <span className="flex items-center">px</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Medium Size</FormLabel>
                      <div className="flex gap-2">
                        <Input type="number" value="600" className="w-20" />
                        <span className="flex items-center">×</span>
                        <Input type="number" value="400" className="w-20" />
                        <span className="flex items-center">px</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Large Size</FormLabel>
                      <div className="flex gap-2">
                        <Input type="number" value="1200" className="w-20" />
                        <span className="flex items-center">×</span>
                        <Input type="number" value="800" className="w-20" />
                        <span className="flex items-center">px</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="crop-images" />
                    <label
                      htmlFor="crop-images"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Automatically crop images to fit dimensions
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="optimize-images" defaultChecked />
                    <label
                      htmlFor="optimize-images"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Optimize images during upload
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="preserve-filenames" />
                    <label
                      htmlFor="preserve-filenames"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Preserve original filenames
                    </label>
                  </div>
                </div>

                <Button>Save Upload Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure system-level settings and performance options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Status</h3>
                  <Separator className="my-2" />

                  <div className="flex flex-col md:flex-row gap-4">
                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Maintenance Mode
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Take your site offline for maintenance
                            </p>
                          </div>
                          <Switch
                            checked={maintenanceMode}
                            onCheckedChange={setMaintenanceMode}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          System Cache
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Enable system caching for better performance
                            </p>
                          </div>
                          <Switch
                            checked={cacheEnabled}
                            onCheckedChange={setCacheEnabled}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="flex-1">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Debug Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Enable detailed error reporting (not for
                              production)
                            </p>
                          </div>
                          <Switch
                            checked={debugMode}
                            onCheckedChange={setDebugMode}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <Separator className="my-2" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Session Timeout (minutes)</FormLabel>
                      <Input type="number" value="30" />
                      <p className="text-sm text-muted-foreground">
                        Time before user is automatically logged out
                      </p>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Failed Login Attempts</FormLabel>
                      <Input type="number" value="5" />
                      <p className="text-sm text-muted-foreground">
                        Number of attempts before temporary lockout
                      </p>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Password Reset Expiry (hours)</FormLabel>
                      <Input type="number" value="24" />
                      <p className="text-sm text-muted-foreground">
                        How long password reset links remain valid
                      </p>
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Minimum Password Length</FormLabel>
                      <Input type="number" value="8" />
                      <p className="text-sm text-muted-foreground">
                        Minimum required characters for passwords
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="password-special" defaultChecked />
                      <label
                        htmlFor="password-special"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Require special characters in passwords
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="force-ssl" defaultChecked />
                      <label
                        htmlFor="force-ssl"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Force SSL for all pages
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="two-factor" />
                      <label
                        htmlFor="two-factor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable two-factor authentication
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap gap-3">
                  <Button type="button">Save Advanced Settings</Button>
                  <Button type="button" variant="outline">
                    Clear System Cache
                  </Button>
                  <Button type="button" variant="outline">
                    View Error Logs
                  </Button>
                  <Button type="button" variant="destructive">
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;
