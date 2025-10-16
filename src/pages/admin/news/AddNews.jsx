import React, { useState } from "react";
import { toast } from "sonner";
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
import { Badge } from "../../../components/ui/badge";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  Download,
  Copy,
  Printer,
  ToggleLeft,
  ToggleRight,
  Calendar,
  User,
  Tag,
} from "lucide-react";

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    category: "General",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: "Welcome to New Academic Session",
      content:
        "We are pleased to welcome all students back for the new academic session. This year promises to be exciting with new programs and opportunities.",
      category: "Academic",
      scroll: true,
      date: "2024-01-15",
      author: "Admin",
      views: 245,
      status: "Published",
    },
    {
      id: 2,
      title: "Sports Week Competition",
      content:
        "Annual sports week will commence from next Monday. All students are encouraged to participate in various sporting activities.",
      category: "Events",
      scroll: true,
      date: "2024-01-12",
      author: "Sports Coordinator",
      views: 189,
      status: "Published",
    },
    {
      id: 3,
      title: "Library Renovation Update",
      content:
        "The library renovation is progressing well and will be completed by the end of this month. New facilities include digital resources.",
      category: "Facilities",
      scroll: false,
      date: "2024-01-10",
      author: "Facilities Manager",
      views: 156,
      status: "Draft",
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting Schedule",
      content:
        "Parent-teacher meetings for this semester are scheduled for the last week of January. Please check the detailed schedule.",
      category: "Academic",
      scroll: true,
      date: "2024-01-08",
      author: "Academic Coordinator",
      views: 298,
      status: "Published",
    },
    {
      id: 5,
      title: "New Cafeteria Menu",
      content:
        "We have introduced healthy meal options in our cafeteria menu based on nutritionist recommendations and student feedback.",
      category: "Facilities",
      scroll: false,
      date: "2024-01-05",
      author: "Cafeteria Manager",
      views: 134,
      status: "Published",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditing && editingId) {
      // Update existing news
      setNewsList((prev) =>
        prev.map((news) =>
          news.id === editingId
            ? {
                ...news,
                title: formData.title,
                content: formData.content,
                category: formData.category,
              }
            : news
        )
      );
      setIsEditing(false);
      setEditingId(null);
      toast.success("News updated successfully!");
    } else {
      // Create new news
      const newNews = {
        id: newsList.length + 1,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        scroll: false,
        date: new Date().toISOString().split("T")[0],
        author: "Admin",
        views: 0,
        status: "Draft",
      };
      setNewsList((prev) => [newNews, ...prev]);
      toast.success("News added successfully!");
    }

    setFormData({ title: "", content: "", image: null, category: "General" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ title: "", content: "", image: null, category: "General" });
    toast.info("Edit cancelled");
  };

  const handleView = (news) => {
    setSelectedNews(news);
    setShowViewModal(true);
    // Increment view count
    setNewsList((prev) =>
      prev.map((item) =>
        item.id === news.id ? { ...item, views: item.views + 1 } : item
      )
    );
    toast.success(`Viewing: ${news.title}`);
  };

  const handleEdit = (news) => {
    setFormData({
      title: news.title,
      content: news.content,
      image: null,
      category: news.category,
    });
    setIsEditing(true);
    setEditingId(news.id);
    toast.info(`Now editing: ${news.title}`);
    // Scroll to form
    setTimeout(() => {
      document
        .querySelector(".news-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    setNewsList((prev) => prev.filter((news) => news.id !== id));
    toast.success("News deleted successfully!");
  };

  const toggleScroll = (id) => {
    setNewsList((prev) =>
      prev.map((news) =>
        news.id === id ? { ...news, scroll: !news.scroll } : news
      )
    );
    toast.success("Scroll status updated!");
  };

  const toggleStatus = (id) => {
    setNewsList((prev) =>
      prev.map((news) =>
        news.id === id
          ? {
              ...news,
              status: news.status === "Published" ? "Draft" : "Published",
            }
          : news
      )
    );
    toast.success("Status updated successfully!");
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "bg-blue-100 text-blue-800",
      Events: "bg-green-100 text-green-800",
      Facilities: "bg-purple-100 text-purple-800",
      General: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.General;
  };

  const getStatusColor = (status) => {
    return status === "Published"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Category",
      "Status",
      "Author",
      "Views",
      "Date",
      "Scroll",
    ];
    const csvContent = [
      headers.join(","),
      ...newsList.map((news) =>
        [
          news.id,
          `"${news.title}"`,
          news.category,
          news.status,
          news.author,
          news.views,
          news.date,
          news.scroll ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "news_data.csv";
    a.click();
    toast.success("Data exported to CSV!");
  };

  const exportToText = () => {
    const textContent = newsList
      .map(
        (news) =>
          `ID: ${news.id}\nTitle: ${news.title}\nCategory: ${
            news.category
          }\nStatus: ${news.status}\nAuthor: ${news.author}\nViews: ${
            news.views
          }\nDate: ${news.date}\nScroll: ${
            news.scroll ? "Yes" : "No"
          }\nContent: ${news.content}\n${"=".repeat(50)}\n`
      )
      .join("\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "news_data.txt";
    a.click();
    toast.success("Data exported to text file!");
  };

  const copyToClipboard = () => {
    const textContent = newsList
      .map(
        (news) =>
          `${news.title} | ${news.category} | ${news.status} | ${news.date}`
      )
      .join("\n");

    navigator.clipboard.writeText(textContent).then(() => {
      toast.success("Data copied to clipboard!");
    });
  };

  const printData = () => {
    const printContent = `
      <h2>News Management Report</h2>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr>
          <th>ID</th><th>Title</th><th>Category</th><th>Status</th><th>Author</th><th>Views</th><th>Date</th><th>Scroll</th>
        </tr>
        ${newsList
          .map(
            (news) => `
          <tr>
            <td>${news.id}</td>
            <td>${news.title}</td>
            <td>${news.category}</td>
            <td>${news.status}</td>
            <td>${news.author}</td>
            <td>${news.views}</td>
            <td>${news.date}</td>
            <td>${news.scroll ? "Yes" : "No"}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    toast.success("Print dialog opened!");
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Add News
        </h2>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button onClick={exportToText} variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Text
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button onClick={printData} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card className="mt-3 animate-fade-in delay-100 max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 news-form">
        <CardHeader
          className={`bg-gradient-to-r ${
            isEditing
              ? "from-orange-500 to-red-500"
              : "from-eduos-primary to-eduos-secondary"
          } text-white`}
        >
          <CardTitle className="flex items-center gap-2">
            {isEditing ? (
              <Edit className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {isEditing ? "Edit News Information" : "News Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newsTitle">Enter News Title *</Label>
              <Input
                id="newsTitle"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the title of the news"
                className="transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsContent">Enter News Content *</Label>
              <Textarea
                id="newsContent"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter the content of the news"
                className="min-h-[150px] transition-all duration-300 focus:border-eduos-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsCategory">Category</Label>
              <select
                id="newsCategory"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-eduos-primary transition-all duration-300"
              >
                <option value="General">General</option>
                <option value="Academic">Academic</option>
                <option value="Events">Events</option>
                <option value="Facilities">Facilities</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsImage">Upload Image</Label>
              <Input
                id="newsImage"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className={`flex-1 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg ${
                isEditing
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-eduos-primary hover:bg-eduos-secondary"
              }`}
            >
              {isEditing ? (
                <Edit className="h-4 w-4 mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              {isEditing ? "Update News" : "Add News"}
            </Button>
            {isEditing && (
              <Button
                onClick={cancelEdit}
                variant="outline"
                className="px-6 transition-all duration-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-3 animate-fade-in delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Existing News ({newsList.length})
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Total: {newsList.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scroll
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsList.map((news, index) => (
                  <tr
                    key={news.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="font-medium truncate">{news.title}</div>
                      <div className="text-gray-500 text-xs truncate">
                        {news.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getCategoryColor(news.category)}>
                        <Tag className="h-3 w-3 mr-1" />
                        {news.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={`cursor-pointer ${getStatusColor(
                          news.status
                        )}`}
                        onClick={() => toggleStatus(news.id)}
                      >
                        {news.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {news.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {news.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => toggleScroll(news.id)}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {news.scroll ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="ml-1">
                          {news.scroll ? "Yes" : "No"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {news.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(news)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(news)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(news.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View News Modal */}
      {showViewModal && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedNews.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-white/20 text-white">
                      <Tag className="h-3 w-3 mr-1" />
                      {selectedNews.category}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <User className="h-3 w-3 mr-1" />
                      {selectedNews.author}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      {selectedNews.date}
                    </Badge>
                    <Badge className="bg-white/20 text-white">
                      <Eye className="h-3 w-3 mr-1" />
                      {selectedNews.views} views
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setShowViewModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <Badge
                  className={`${getStatusColor(selectedNews.status)} mb-2`}
                >
                  {selectedNews.status}
                </Badge>
                {selectedNews.scroll && (
                  <Badge className="bg-green-100 text-green-800 ml-2">
                    <ToggleRight className="h-3 w-3 mr-1" />
                    Scrolling Enabled
                  </Badge>
                )}
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-justify">
                  {selectedNews.content}
                </p>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedNews);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit This News
                </Button>
                <Button
                  onClick={() => setShowViewModal(false)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNews;
