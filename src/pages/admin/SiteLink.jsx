
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Search, FileText, FileSpreadsheet, Printer, Copy, Link, Trash, Edit, Plus } from 'lucide-react';

const SiteLink = () => {
  // Sample data for demonstration
  const [links, setLinks] = useState([
    { id: 1, title: "School Homepage", url: "https://school.example.com", active: true },
    { id: 2, title: "Student Portal", url: "https://students.example.com", active: true },
    { id: 3, title: "Parent Portal", url: "https://parents.example.com", active: false },
  ]);

  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddLink = (e) => {
    e.preventDefault();
    if (newLink.title && newLink.url) {
      setLinks([...links, { 
        id: links.length + 1, 
        title: newLink.title, 
        url: newLink.url, 
        active: true 
      }]);
      setNewLink({ title: '', url: '' });
    }
  };

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Site Links
        </h2>
        <Button 
          className="flex items-center gap-2 bg-eduos-primary hover:bg-eduos-secondary transition-colors"
        >
          <Plus size={16} />
          <span>Add New Link</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>Add New Link</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkTitle">Link Title</Label>
                <Input 
                  id="linkTitle" 
                  placeholder="Enter link title" 
                  value={newLink.title}
                  onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input 
                  id="linkUrl" 
                  placeholder="https://example.com" 
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-eduos-primary hover:bg-eduos-secondary transition-colors"
              >
                Save Link
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-in delay-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-eduos-primary to-eduos-secondary text-white">
            <CardTitle>All Site Links</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search links..."
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>CSV</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </Button>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">S/N</TableHead>
                    <TableHead className="bg-gray-100">Title</TableHead>
                    <TableHead className="bg-gray-100">URL</TableHead>
                    <TableHead className="bg-gray-100">Status</TableHead>
                    <TableHead className="bg-gray-100">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {links.map((link) => (
                    <TableRow key={link.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>{link.id}</TableCell>
                      <TableCell>{link.title}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Link size={16} className="text-blue-500" />
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">
                          {link.url}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${link.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {link.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="default" size="sm" className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
                            <Edit size={14} />
                            <span>Edit</span>
                          </Button>
                          <Button variant="destructive" size="sm" className="flex items-center gap-1">
                            <Trash size={14} />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteLink;
