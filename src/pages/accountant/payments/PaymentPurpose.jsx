
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Plus, Pencil, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../../hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';

const PaymentPurpose = () => {
  const [paymentPurposes, setPaymentPurposes] = useState([
    {
      id: 1,
      name: "Tuition Fee",
      description: "Main school tuition fees",
      category: "Regular",
      amount: 45000,
      isRequired: true,
      isActive: true,
    },
    {
      id: 2,
      name: "Development Levy",
      description: "Fee for school infrastructure development",
      category: "Regular",
      amount: 15000,
      isRequired: true,
      isActive: true,
    },
    {
      id: 3,
      name: "Sports Fee",
      description: "Fee for sports activities and equipment",
      category: "Extra Curricular",
      amount: 5000,
      isRequired: true,
      isActive: true,
    },
    {
      id: 4,
      name: "Library Fee",
      description: "Fee for library maintenance and books",
      category: "Academic",
      amount: 3000,
      isRequired: false,
      isActive: true,
    },
    {
      id: 5,
      name: "Computer Lab Fee",
      description: "Fee for computer lab usage and maintenance",
      category: "Academic",
      amount: 8000,
      isRequired: false,
      isActive: true,
    },
    {
      id: 6,
      name: "Excursion Fee",
      description: "Fee for school trips and excursions",
      category: "Extra Curricular",
      amount: 10000,
      isRequired: false,
      isActive: false,
    },
  ]);

  const [newPurpose, setNewPurpose] = useState({
    name: '',
    description: '',
    category: 'Regular',
    amount: 0,
    isRequired: false,
    isActive: true,
  });

  const handleAddPurpose = () => {
    if (!newPurpose.name || !newPurpose.description || newPurpose.amount <= 0) {
      toast({
        title: "Error",
        description: "Please fill all required fields with valid data",
        variant: "destructive",
      });
      return;
    }

    setPaymentPurposes([
      ...paymentPurposes,
      {
        id: paymentPurposes.length + 1,
        ...newPurpose,
      },
    ]);

    setNewPurpose({
      name: '',
      description: '',
      category: 'Regular',
      amount: 0,
      isRequired: false,
      isActive: true,
    });

    toast({
      title: "Success",
      description: "Payment purpose added successfully",
    });
  };

  const togglePurposeStatus = (id) => {
    setPaymentPurposes(paymentPurposes.map(purpose => 
      purpose.id === id ? { ...purpose, isActive: !purpose.isActive } : purpose
    ));

    const purpose = paymentPurposes.find(p => p.id === id);
    if (purpose) {
      toast({
        title: `Payment Purpose ${purpose.isActive ? 'Disabled' : 'Enabled'}`,
        description: `${purpose.name} has been ${purpose.isActive ? 'disabled' : 'enabled'}.`,
      });
    }
  };

  const handleDeletePurpose = (id) => {
    const purpose = paymentPurposes.find(p => p.id === id);
    setPaymentPurposes(paymentPurposes.filter(p => p.id !== id));
    
    if (purpose) {
      toast({
        title: "Purpose Deleted",
        description: `${purpose.name} has been deleted.`,
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payment Purpose</h1>
            <p className="text-muted-foreground">Manage payment purposes and fee categories</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Purpose
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Purpose</DialogTitle>
                <DialogDescription>
                  Create a new payment purpose for student fee collection.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Purpose Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Tuition Fee" 
                    value={newPurpose.name}
                    onChange={e => setNewPurpose({...newPurpose, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Brief description" 
                    value={newPurpose.description}
                    onChange={e => setNewPurpose({...newPurpose, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newPurpose.category}
                    onValueChange={(value) => setNewPurpose({...newPurpose, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Extra Curricular">Extra Curricular</SelectItem>
                      <SelectItem value="Boarding">Boarding</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    value={newPurpose.amount || ''}
                    onChange={e => setNewPurpose({...newPurpose, amount: Number(e.target.value)})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="required" 
                    checked={newPurpose.isRequired}
                    onCheckedChange={checked => setNewPurpose({...newPurpose, isRequired: checked})}
                  />
                  <Label htmlFor="required">Required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    checked={newPurpose.isActive}
                    onCheckedChange={checked => setNewPurpose({...newPurpose, isActive: checked})}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddPurpose}>
                  Add Purpose
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Payment Purposes</CardTitle>
            <CardDescription>
              Manage and configure different fee payment purposes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purpose Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentPurposes.map((purpose) => (
                  <TableRow key={purpose.id}>
                    <TableCell className="font-medium">{purpose.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{purpose.description}</TableCell>
                    <TableCell>{purpose.category}</TableCell>
                    <TableCell>₦{purpose.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={purpose.isRequired ? "text-green-600" : "text-gray-400"}>
                        {purpose.isRequired ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={purpose.isActive} 
                          onCheckedChange={() => togglePurposeStatus(purpose.id)} 
                        />
                        <span className={purpose.isActive ? "text-green-600" : "text-gray-400"}>
                          {purpose.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeletePurpose(purpose.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Total: {paymentPurposes.length} purposes</p>
            <p className="text-sm text-muted-foreground">
              Active: {paymentPurposes.filter(p => p.isActive).length} | 
              Required: {paymentPurposes.filter(p => p.isRequired).length}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PaymentPurpose;
