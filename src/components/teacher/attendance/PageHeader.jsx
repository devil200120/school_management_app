
import { Button } from '../../ui/button';
import { BarChart2, Download } from 'lucide-react';

export const PageHeader = ({ title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2">
          <BarChart2 size={16} />
          View Reports
        </Button>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Export
        </Button>
      </div>
    </div>
  );
};
