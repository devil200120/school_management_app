import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import {
  Book,
  BookOpen,
  Video,
  Upload,
  CheckCircle,
  FileText,
  Music,
  Film,
} from "lucide-react";

const UploadBooks = () => {
  const [formData, setFormData] = useState({
    level: "",
    subject: "",
    class: "",
    title: "",
    author: "",
    description: "",
  });
  const [selectedTab, setSelectedTab] = useState("text");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type based on tab
      let allowedTypes = [];
      let maxSize = 0;

      switch (selectedTab) {
        case "text":
          allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];
          maxSize = 50; // 50MB for text books
          break;
        case "audio":
          allowedTypes = ["audio/mp3", "audio/wav", "audio/ogg", "audio/mpeg"];
          maxSize = 100; // 100MB for audio books
          break;
        case "video":
          allowedTypes = [
            "video/mp4",
            "video/mov",
            "video/avi",
            "video/quicktime",
          ];
          maxSize = 500; // 500MB for video books
          break;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          `Invalid file type for ${selectedTab} book! Please select a valid file.`
        );
        e.target.value = "";
        return;
      }

      if (file.size > maxSize * 1024 * 1024) {
        toast.error(
          `File size too large! Please select a file smaller than ${maxSize}MB.`
        );
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
      toast.success(
        `${selectedTab} book file "${file.name}" selected successfully!`
      );
    }
  };

  const validateForm = () => {
    const requiredFields = ["level", "subject", "class", "title", "author"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    if (!selectedFile) {
      toast.error(`Please select a ${selectedTab} book file to upload.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload with progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setUploadProgress(100);

      setTimeout(() => {
        toast.success(`${selectedTab} book uploaded successfully!`, {
          description: `"${formData.title}" by ${formData.author} has been added to the library`,
          duration: 5000,
        });

        // Reset form
        setFormData({
          level: "",
          subject: "",
          class: "",
          title: "",
          author: "",
          description: "",
        });
        setSelectedFile(null);
        setUploadProgress(0);

        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => (input.value = ""));
      }, 500);
    } catch (error) {
      toast.error("Upload failed! Please try again.", {
        description: error.message || "An error occurred during book upload",
      });
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = () => {
    switch (selectedTab) {
      case "text":
        return FileText;
      case "audio":
        return Music;
      case "video":
        return Film;
      default:
        return Book;
    }
  };

  const FileIcon = getFileIcon();

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Upload Books
        </h2>
      </div>

      <Card className="animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle>Upload Books into Library</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <Tabs defaultValue="text" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText size={18} />
                  <span>Text Books</span>
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Music size={18} />
                  <span>Audio Books</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <Film size={18} />
                  <span>Video Books</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4 bg-blue-50">
                  <Label
                    htmlFor="textFile"
                    className="block mb-2 font-semibold"
                  >
                    Select Text Book File{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="textFile"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                  <p className="text-xs text-blue-600">
                    Accepted formats: PDF, DOC, DOCX (max 50MB)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="audio" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4 bg-green-50">
                  <Label
                    htmlFor="audioFile"
                    className="block mb-2 font-semibold"
                  >
                    Select Audio Book File{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="audioFile"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mp3,.wav,.ogg"
                    className="mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                  />
                  <p className="text-xs text-green-600">
                    Accepted formats: MP3, WAV, OGG (max 100MB)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                <div className="border border-gray-200 rounded-md p-4 bg-purple-50">
                  <Label
                    htmlFor="videoFile"
                    className="block mb-2 font-semibold"
                  >
                    Select Video Book File{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="videoFile"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mp4,.mov,.avi"
                    className="mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                  />
                  <p className="text-xs text-purple-600">
                    Accepted formats: MP4, MOV, AVI (max 500MB)
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <FileIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-green-600">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="level">
                    Select Level <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      handleSelectChange("level", value)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="junior-secondary">
                        Junior Secondary
                      </SelectItem>
                      <SelectItem value="senior-secondary">
                        Senior Secondary
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Select Subject <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      handleSelectChange("subject", value)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English Language</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="economics">Economics</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="literature">Literature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">
                    Select Class <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) =>
                      handleSelectChange("class", value)
                    }
                  >
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class10a">Class 10A</SelectItem>
                      <SelectItem value="class10b">Class 10B</SelectItem>
                      <SelectItem value="class11a">Class 11A</SelectItem>
                      <SelectItem value="class12a">Class 12A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Book Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter book title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) =>
                      handleInputChange("author", e.target.value)
                    }
                    className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Enter book description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="transition-all duration-300 focus:ring-2 focus:ring-eduos-primary"
                />
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading {selectedTab} book...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-eduos-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Book
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadBooks;
