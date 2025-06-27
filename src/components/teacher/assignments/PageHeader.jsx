
import { Button } from '../../../components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PageHeader = ({ 
  title, 
  description, 
  children,
  backLink
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        {backLink && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2 pl-0 hover:bg-transparent" 
            asChild
          >
            <Link to={backLink} className='text-decoration'>
              <ChevronLeft size={16} />
              Back
            </Link>
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
};
