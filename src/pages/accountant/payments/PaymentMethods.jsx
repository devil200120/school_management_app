
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
import { Plus, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '../../../hooks/use-toast';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Cash Payment",
      description: "Direct cash payment at the school office",
      instructions: "Visit the accountant's office during working hours (8am - 4pm)",
      isActive: true,
    },
    {
      id: 2,
      name: "Bank Transfer",
      description: "Transfer to school account",
      instructions: "Transfer to Account No: 1234567890, Bank: First Bank, Name: EDUOS School",
      isActive: true,
    },
    {
      id: 3,
      name: "Online Payment",
      description: "Pay online via school portal",
      instructions: "Login to student portal and click on 'Pay Fees' button",
      isActive: true,
    },
    {
      id: 4,
      name: "Mobile Money",
      description: "Pay using mobile money services",
      instructions: "Send to 0801234567 with student ID as reference",
      isActive: false,
    },
  ]);

  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    instructions: '',
    isActive: true,
  });

  const handleAddPaymentMethod = () => {
    if (!newMethod.name || !newMethod.description) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setPaymentMethods([
      ...paymentMethods,
      {
        id: paymentMethods.length + 1,
        ...newMethod,
      },
    ]);

    setNewMethod({
      name: '',
      description: '',
      instructions: '',
      isActive: true,
    });

    toast({
      title: "Success",
      description: "Payment method added successfully",
    });
  };

  const toggleMethodStatus = (id) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === id ? { ...method, isActive: !method.isActive } : method
    ));

    const method = paymentMethods.find(m => m.id === id);
    if (method) {
      toast({
        title: `Payment Method ${method.isActive ? 'Disabled' : 'Enabled'}`,
        description: `${method.name} has been ${method.isActive ? 'disabled' : 'enabled'}.`,
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
            <h1 className="text-2xl font-bold">Payment Methods</h1>
            <p className="text-muted-foreground">Manage available payment methods for fee collection</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>
                  Create a new payment method for student fee payments.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Method Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Bank Transfer" 
                    value={newMethod.name}
                    onChange={e => setNewMethod({...newMethod, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Brief description of payment method" 
                    value={newMethod.description}
                    onChange={e => setNewMethod({...newMethod, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Payment Instructions</Label>
                  <Input 
                    id="instructions" 
                    placeholder="Instructions for making payment" 
                    value={newMethod.instructions}
                    onChange={e => setNewMethod({...newMethod, instructions: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    checked={newMethod.isActive}
                    onCheckedChange={checked => setNewMethod({...newMethod, isActive: checked})}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddPaymentMethod}>
                  Add Method
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Available Payment Methods</CardTitle>
            <CardDescription>
              Configure and manage payment methods available for fee collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Instructions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.description}</TableCell>
                    <TableCell className="max-w-xs truncate">{method.instructions}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={method.isActive} 
                          onCheckedChange={() => toggleMethodStatus(method.id)} 
                        />
                        <span className={method.isActive ? "text-green-600" : "text-gray-400"}>
                          {method.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Total: {paymentMethods.length} payment methods</p>
            <p className="text-sm text-muted-foreground">Active: {paymentMethods.filter(m => m.isActive).length} methods</p>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PaymentMethods;
