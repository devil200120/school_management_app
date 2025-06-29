
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card';

const ManageTestimonial = () => {
  // Mock data for testimonials
  const testimonials = [
    { id: 1, name: 'John Doe', role: 'Student', content: 'This school has changed my life completely. The teachers are amazing!', date: '2023-05-15' },
    { id: 2, name: 'Sarah Johnson', role: 'Parent', content: 'My child has improved significantly since joining this institution.', date: '2023-06-22' },
    { id: 3, name: 'Michael Brown', role: 'Alumni', content: 'The values I learned here continue to guide me in my professional life.', date: '2023-08-10' },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-eduos-primary animate-fade-in">
          Manage Testimonials
        </h2>
        <div className="flex gap-3">
          <Button 
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Update Changes
          </Button>
          <Button 
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
          </Button>
        </div>
      </div>

      <Card className="animate-fade-in delay-100">
        <CardHeader className="bg-eduos-primary text-white">
          <CardTitle>Testimonials List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption>A list of testimonials from students, parents and alumni.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{testimonial.id}</TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <span className="cursor-pointer underline decoration-dotted">
                          {testimonial.content.substring(0, 30)}...
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p>{testimonial.content}</p>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{testimonial.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-amber-500 hover:text-amber-600 hover:border-amber-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> results
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTestimonial;
