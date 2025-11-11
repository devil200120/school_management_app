import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Users,
  FileText,
} from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Johnson",
    email: "john.johnson@example.com",
    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    address: "123 Maple Street",
    city: "Lagos",
    state: "Lagos State",
    zipCode: "100001",
    occupation: "Software Engineer",
    employer: "Tech Solutions Ltd",
    relationship: "Father",
    emergencyContact: "Jane Johnson",
    emergencyPhone: "+1 (555) 111-2222",
    profileImage: "/profile_photo.png",
  });

  const [children] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      class: "JSS 2A",
      admissionNumber: "EDU/2023/001",
      relationship: "Daughter",
    },
    {
      id: 2,
      name: "Michael Johnson",
      class: "Primary 5B",
      admissionNumber: "EDU/2024/045",
      relationship: "Son",
    },
  ]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data or reload from API
    toast({
      title: "Changes Cancelled",
      description: "Your changes have been discarded.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and account details
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileData.profileImage} alt="Profile" />
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName[0]}
                    {profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 p-0"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <Badge variant="outline" className="mt-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Parent Account
                </Badge>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        {profileData.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        {profileData.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {profileData.email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="phone">Primary Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    {isEditing ? (
                      <Input
                        id="alternatePhone"
                        value={profileData.alternatePhone}
                        onChange={(e) =>
                          handleInputChange("alternatePhone", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">
                        {profileData.alternatePhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="relationship">
                    Relationship to Child(ren)
                  </Label>
                  {isEditing ? (
                    <Input
                      id="relationship"
                      value={profileData.relationship}
                      onChange={(e) =>
                        handleInputChange("relationship", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {profileData.relationship}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact & Professional Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">
                  Address & Professional Info
                </h4>

                <div className="space-y-1">
                  <Label htmlFor="address">Street Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {profileData.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">{profileData.city}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State</Label>
                    {isEditing ? (
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-sm font-medium">{profileData.state}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium">{profileData.zipCode}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="occupation">Occupation</Label>
                  {isEditing ? (
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) =>
                        handleInputChange("occupation", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {profileData.occupation}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="employer">Employer</Label>
                  {isEditing ? (
                    <Input
                      id="employer"
                      value={profileData.employer}
                      onChange={(e) =>
                        handleInputChange("employer", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-sm font-medium">
                      {profileData.employer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Emergency Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              {isEditing ? (
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) =>
                    handleInputChange("emergencyContact", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium">
                  {profileData.emergencyContact}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              {isEditing ? (
                <Input
                  id="emergencyPhone"
                  value={profileData.emergencyPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyPhone", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium">
                  {profileData.emergencyPhone}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Associated Children */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Associated Children
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {child.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{child.name}</h4>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <span>Class: {child.class}</span>
                      <span>•</span>
                      <span>Admission: {child.admissionNumber}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{child.relationship}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Account Status</h4>
                <p className="text-sm text-gray-600">
                  Your parent account is active and verified
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Account Created</h4>
                <p className="text-sm text-gray-600">January 15, 2023</p>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Last Login</h4>
                <p className="text-sm text-gray-600">Today at 2:30 PM</p>
              </div>
              <Badge variant="outline">Recent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start">
              View Login History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
