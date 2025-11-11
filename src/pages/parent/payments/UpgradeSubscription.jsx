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
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  CreditCard,
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Smartphone,
  Globe,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";

const UpgradeSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState("bronze");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      price: 15000,
      duration: "per term",
      color: "bg-amber-600",
      icon: Shield,
      features: [
        "Basic student management",
        "Simple attendance tracking",
        "Basic grade recording",
        "Parent notifications",
        "Email support",
      ],
      limitations: [
        "Limited to 50 students",
        "Basic reporting only",
        "No advanced features",
      ],
    },
    {
      id: "silver",
      name: "Silver Plan",
      price: 25000,
      duration: "per term",
      color: "bg-gray-500",
      icon: Star,
      popular: true,
      features: [
        "Advanced student management",
        "QR code attendance",
        "Digital gradebook",
        "Parent portal access",
        "SMS notifications",
        "Basic analytics",
        "Online assignments",
        "Priority support",
      ],
      limitations: ["Limited to 200 students", "Basic customization"],
    },
    {
      id: "gold",
      name: "Gold Plan",
      price: 40000,
      duration: "per term",
      color: "bg-yellow-500",
      icon: Crown,
      features: [
        "Premium student management",
        "Multi-method attendance (QR + NFC)",
        "Advanced gradebook",
        "Parent & student portals",
        "Multi-channel notifications",
        "Advanced analytics",
        "Online exams & quizzes",
        "E-learning modules",
        "Timetable management",
        "24/7 support",
      ],
      limitations: ["Limited to 500 students"],
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      price: 60000,
      duration: "per term",
      color: "bg-purple-600",
      icon: Zap,
      premium: true,
      features: [
        "Enterprise student management",
        "All attendance methods (QR + NFC + Face Recognition)",
        "Complete gradebook suite",
        "Full portal ecosystem",
        "Omni-channel communications",
        "Real-time analytics & insights",
        "Advanced assessment tools",
        "Full e-learning platform",
        "AI-powered insights",
        "Custom integrations",
        "Dedicated account manager",
        "Unlimited students",
      ],
      limitations: [],
    },
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "transfer", name: "Bank Transfer", icon: DollarSign },
    { id: "paystack", name: "Paystack", icon: Globe },
    { id: "flutterwave", name: "Flutterwave", icon: Smartphone },
  ];

  const handleUpgrade = async () => {
    if (!selectedPlan || !paymentMethod) {
      toast.error("Please select a plan and payment method");
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Subscription upgraded successfully!");
      setCurrentPlan(selectedPlan);
      setSelectedPlan("");
      setPaymentMethod("");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => plans.find((p) => p.id === currentPlan);
  const getSelectedPlan = () => plans.find((p) => p.id === selectedPlan);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Upgrade Your Subscription
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Unlock more features and capabilities for your school management
          system. Choose the plan that best fits your needs.
        </p>
      </div>

      {/* Current Plan Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Current Plan Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-full ${
                  getCurrentPlan()?.color
                } text-white`}
              >
                {(() => {
                  const currentPlan = getCurrentPlan();
                  const IconComponent = currentPlan?.icon;
                  return IconComponent ? (
                    <IconComponent className="h-6 w-6" />
                  ) : null;
                })()}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {getCurrentPlan()?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  ₦{getCurrentPlan()?.price.toLocaleString()}{" "}
                  {getCurrentPlan()?.duration}
                </p>
                <p className="text-sm text-green-600">
                  Active until March 2025
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">
          Choose Your New Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isCurrentPlan = plan.id === currentPlan;
            const isUpgrade =
              plans.findIndex((p) => p.id === currentPlan) <
              plans.findIndex((p) => p.id === plan.id);

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-200 ${
                  selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""
                } ${
                  isCurrentPlan
                    ? "opacity-60"
                    : "hover:shadow-lg cursor-pointer"
                }`}
                onClick={() => !isCurrentPlan && setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                    POPULAR
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium">
                    PREMIUM
                  </div>
                )}

                <CardHeader className="text-center">
                  <div
                    className={`inline-flex p-3 rounded-full ${plan.color} text-white mx-auto`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold">
                      ₦{plan.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{plan.duration}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-sm text-gray-500">
                          +{plan.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4">
                    {isCurrentPlan ? (
                      <Badge className="w-full justify-center bg-gray-100 text-gray-600">
                        Current Plan
                      </Badge>
                    ) : isUpgrade ? (
                      <Button
                        className="w-full"
                        variant={
                          selectedPlan === plan.id ? "default" : "outline"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(plan.id);
                        }}
                      >
                        {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Badge className="w-full justify-center bg-red-100 text-red-600">
                        Downgrade
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Payment Section */}
      {selectedPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Upgrade Summary</h3>
              <div className="flex justify-between items-center">
                <span>From: {getCurrentPlan()?.name}</span>
                <ArrowRight className="h-4 w-4" />
                <span>To: {getSelectedPlan()?.name}</span>
              </div>
              <div className="mt-2 text-lg font-bold text-blue-600">
                Amount: ₦{getSelectedPlan()?.price.toLocaleString()}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Select Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-2">
                        <method.icon className="h-4 w-4" />
                        {method.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Details Form */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Card Holder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay ₦${getSelectedPlan()?.price.toLocaleString()} Now`}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UpgradeSubscription;
