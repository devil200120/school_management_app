import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  MessageCircle,
  Send,
  Search,
  User,
  Calendar,
  Reply,
  Archive,
  Star,
  Paperclip,
} from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [composeForm, setComposeForm] = useState({
    recipient: "",
    subject: "",
    message: "",
  });

  // Mock messages data
  const messages = [
    {
      id: 1,
      from: "Mrs. Adebayo",
      role: "Mathematics Teacher",
      subject: "Sarah's Math Progress",
      preview: "I wanted to update you on Sarah's excellent performance...",
      content:
        "Dear Mr. Johnson, I wanted to update you on Sarah's excellent performance in Mathematics this term. She has shown remarkable improvement and consistently scores above 90% in all assessments.",
      date: "2024-11-10",
      time: "14:30",
      read: false,
      starred: true,
      childName: "Sarah Johnson",
    },
    {
      id: 2,
      from: "Principal Office",
      role: "School Administration",
      subject: "Parent-Teacher Conference",
      preview: "You are invited to attend the upcoming parent-teacher...",
      content:
        "Dear Parents, You are invited to attend the upcoming parent-teacher conference scheduled for November 25th, 2024. Please confirm your attendance.",
      date: "2024-11-08",
      time: "09:15",
      read: true,
      starred: false,
      childName: "All Children",
    },
    {
      id: 3,
      from: "Mr. Segun",
      role: "Class Teacher",
      subject: "Michael's Attendance",
      preview: "I noticed Michael was absent yesterday...",
      content:
        "Dear Parent, I noticed Michael was absent yesterday. Please ensure to send a note explaining his absence for our records.",
      date: "2024-11-07",
      time: "11:45",
      read: true,
      starred: false,
      childName: "Michael Johnson",
    },
  ];

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.childName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReply = () => {
    if (newMessage.trim()) {
      // Handle reply logic here
      setNewMessage("");
      alert("Reply sent successfully!");
    }
  };

  const handleComposeMessage = () => {
    if (
      !composeForm.recipient ||
      !composeForm.subject ||
      !composeForm.message
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In real app, send to API
    toast.success("Message sent successfully!");
    setComposeForm({ recipient: "", subject: "", message: "" });
    setShowComposeDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            Communicate with teachers and school administration
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowComposeDialog(true)}
        >
          <Send className="h-4 w-4" />
          Compose Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Inbox ({messages.filter((m) => !m.read).length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    } ${
                      !message.read
                        ? "bg-blue-25 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm ${
                              !message.read ? "font-bold" : "font-medium"
                            }`}
                          >
                            {message.from}
                          </h4>
                          {message.starred && (
                            <Star className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{message.role}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {message.time}
                      </div>
                    </div>
                    <h5
                      className={`text-sm mb-1 ${
                        !message.read ? "font-semibold" : ""
                      }`}
                    >
                      {message.subject}
                    </h5>
                    <p className="text-xs text-gray-600 truncate">
                      {message.preview}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        {message.childName}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(message.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        From: {selectedMessage.from} ({selectedMessage.role})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(selectedMessage.date).toLocaleDateString()} at{" "}
                        {selectedMessage.time}
                      </span>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      Regarding: {selectedMessage.childName}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>

                {/* Reply Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Reply
                  </h3>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                    <Button onClick={handleReply} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a message
                </h3>
                <p className="text-gray-600">
                  Choose a message from the list to read and reply
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Compose Message Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose New Message</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient">Recipient *</Label>
                <Select
                  value={composeForm.recipient}
                  onValueChange={(value) =>
                    setComposeForm({ ...composeForm, recipient: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">School Administration</SelectItem>
                    <SelectItem value="teacher_math">
                      Mrs. Adebayo (Mathematics)
                    </SelectItem>
                    <SelectItem value="teacher_english">
                      Mr. Williams (English)
                    </SelectItem>
                    <SelectItem value="teacher_science">
                      Dr. Brown (Science)
                    </SelectItem>
                    <SelectItem value="teacher_social">
                      Mrs. Davis (Social Studies)
                    </SelectItem>
                    <SelectItem value="accountant">
                      School Accountant
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject"
                  value={composeForm.subject}
                  onChange={(e) =>
                    setComposeForm({ ...composeForm, subject: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                value={composeForm.message}
                onChange={(e) =>
                  setComposeForm({ ...composeForm, message: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowComposeDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleComposeMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
