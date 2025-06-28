import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Download, BookOpen, TrendingUp } from 'lucide-react';

const BooksInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Books & Research Papers Inventory</h1>
          <p className="text-muted-foreground">Monitor library resources and costs</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-eduos-primary hover:bg-eduos-secondary">
            <TrendingUp className="h-4 w-4 mr-2" />
            Cost Analysis
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Books & Research Papers - Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Books and research papers financial data will be displayed here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksInventory;
