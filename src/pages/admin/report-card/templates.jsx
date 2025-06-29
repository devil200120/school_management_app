
import AdminLayout from '../../../components/AdminLayout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Edit, Eye, Download, Plus } from 'lucide-react';

const TemplatesPage = () => {
  const templates = [
    {
      id: 1,
      name: 'Standard Report Card',
      description: 'Basic report card layout with grades and teacher comments',
      previewImage: 'https://placehold.co/300x400/e6f7ff/0a85ff?text=Standard+Template',
      lastModified: '2025-04-15'
    },
    {
      id: 2,
      name: 'Primary School Template',
      description: 'Colorful template designed for primary school students',
      previewImage: 'https://placehold.co/300x400/fff9e6/ffac33?text=Primary+School+Template',
      lastModified: '2025-05-02'
    },
    {
      id: 3,
      name: 'Secondary School Template',
      description: 'Comprehensive template for secondary school with detailed assessment metrics',
      previewImage: 'https://placehold.co/300x400/f0f0f0/666666?text=Secondary+Template',
      lastModified: '2025-05-07'
    },
    {
      id: 4,
      name: 'Skill-Based Assessment',
      description: 'Focus on skills and competencies rather than only grades',
      previewImage: 'https://placehold.co/300x400/e6ffe6/00cc00?text=Skill+Based+Template',
      lastModified: '2025-05-10'
    },
    {
      id: 5,
      name: 'International Format',
      description: 'Compatible with international school standards',
      previewImage: 'https://placehold.co/300x400/f5e6ff/9933ff?text=International+Template',
      lastModified: '2025-04-28'
    }
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Report Card Templates</h1>
            <p className="text-gray-600">Manage and customize your school's report card templates</p>
          </div>
          <Button className="bg-eduos-primary hover:bg-eduos-primary/90">
            <Plus size={16} className="mr-1" />
            Create New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={template.previewImage} 
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <span className="text-xs font-medium text-gray-600 px-2">
                    Last modified: {template.lastModified}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Edit size={16} />
                    <span>Edit</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>Preview</span>
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 ml-auto">
                    <Download size={16} />
                    <span>Export</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplatesPage;
