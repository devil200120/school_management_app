import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Medal,
  Star,
  Gift,
  FileText,
  Crown,
  DollarSign,
  Users,
  Calendar,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const AwardsShowcase = () => {
  // Sample awards data - in production this would come from API
  const [awards] = useState([
    {
      id: 1,
      title: "Academic Excellence Award",
      type: "combined",
      category: "academic",
      level: "All Levels",
      monetaryValue: 500,
      physicalReward: "Gold Medal + Trophy",
      description:
        "Highest academic achievement recognition with both monetary and physical rewards",
      criteria: "Overall Average above 3.8 and exemplary conduct",
      currency: "USD",
      image: "/academic-excellence.jpg",
      recipients: 15,
      featured: true,
    },
    {
      id: 2,
      title: "Leadership Excellence",
      type: "physical",
      category: "leadership",
      level: "Senior Secondary",
      physicalReward: "Leadership Badge + Certificate",
      description:
        "Recognition for outstanding leadership skills and student mentorship",
      criteria:
        "Demonstrated leadership in student activities and peer support",
      image: "/leadership-award.jpg",
      recipients: 8,
      featured: true,
    },
    {
      id: 3,
      title: "Sports Champion",
      type: "monetary",
      category: "sports",
      level: "All Levels",
      monetaryValue: 250,
      description: "Monetary reward for exceptional sports performance",
      criteria: "First place in inter-school competitions",
      currency: "USD",
      image: "/sports-champion.jpg",
      recipients: 12,
      featured: true,
    },
    {
      id: 4,
      title: "Perfect Attendance Award",
      type: "certificate",
      category: "attendance",
      level: "Elementary",
      physicalReward: "Certificate of Excellence",
      description:
        "Recognition certificate for perfect attendance throughout the term",
      criteria: "Zero absences during the academic term",
      image: "/perfect-attendance.jpg",
      recipients: 45,
      featured: false,
    },
    {
      id: 5,
      title: "Arts & Culture Star",
      type: "combined",
      category: "arts",
      level: "All Levels",
      monetaryValue: 200,
      physicalReward: "Art Supplies Kit + Trophy",
      description:
        "Combined reward for excellence in arts and cultural activities",
      criteria:
        "Outstanding performance in arts competitions or cultural events",
      currency: "USD",
      image: "/arts-culture.jpg",
      recipients: 6,
      featured: true,
    },
    {
      id: 6,
      title: "Community Service Hero",
      type: "physical",
      category: "community",
      level: "All Levels",
      physicalReward: "Service Medal + Community Certificate",
      description:
        "Recognition for outstanding community service and social impact",
      criteria: "Minimum 50 hours of verified community service",
      image: "/community-service.jpg",
      recipients: 18,
      featured: false,
    },
  ]);

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const featuredAwards = awards.filter((award) => award.featured);

  // Auto-rotate featured awards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredAwards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredAwards.length]);

  // Get award icon based on type and category
  const getAwardIcon = (award) => {
    if (award.category === "academic") return Star;
    if (award.category === "sports") return Trophy;
    if (award.category === "leadership") return Crown;
    if (award.category === "arts") return Medal;
    if (award.category === "community") return Award;
    if (award.type === "certificate") return FileText;
    if (award.type === "monetary") return DollarSign;
    if (award.type === "physical") return Gift;
    return Award;
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      academic: "bg-blue-500",
      sports: "bg-orange-500",
      leadership: "bg-purple-500",
      arts: "bg-pink-500",
      community: "bg-green-500",
      attendance: "bg-indigo-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const currentFeatured = featuredAwards[currentFeaturedIndex];
  const CurrentIcon = currentFeatured ? getAwardIcon(currentFeatured) : Award;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Student Recognition
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Awards & <span className="text-yellow-500">Recognition</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating excellence and achievement across all areas of student
            development. Discover the awards that recognize outstanding
            performance and dedication.
          </p>
        </motion.div>

        {/* Featured Award Spotlight */}
        {currentFeatured && (
          <motion.div
            key={currentFeaturedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Card className="overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white shadow-2xl">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <CurrentIcon className="w-8 h-8" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/20">
                        Featured Award
                      </Badge>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                      {currentFeatured.title}
                    </h3>

                    <p className="text-lg opacity-90 mb-6 leading-relaxed">
                      {currentFeatured.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <span>
                          {currentFeatured.recipients} recipients this year
                        </span>
                      </div>

                      {currentFeatured.monetaryValue > 0 && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5" />
                          <span>
                            {currentFeatured.currency}{" "}
                            {currentFeatured.monetaryValue} reward
                          </span>
                        </div>
                      )}

                      {currentFeatured.physicalReward && (
                        <div className="flex items-center gap-3">
                          <Gift className="w-5 h-5" />
                          <span>{currentFeatured.physicalReward}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[400px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    <img
                      src={currentFeatured.image || "/placeholder-award.jpg"}
                      alt={currentFeatured.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Featured Award Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {featuredAwards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeaturedIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentFeaturedIndex
                  ? "bg-yellow-500 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {awards.map((award, index) => {
            const Icon = getAwardIcon(award);
            const categoryColor = getCategoryColor(award.category);

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <div
                        className={`${categoryColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {award.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {award.level}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {award.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {award.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {award.monetaryValue > 0 && (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <DollarSign className="w-4 h-4" />
                          <span>
                            {award.currency} {award.monetaryValue}
                          </span>
                        </div>
                      )}

                      {award.physicalReward && (
                        <div className="flex items-center gap-2 text-blue-600 text-sm">
                          <Gift className="w-4 h-4" />
                          <span className="line-clamp-1">
                            {award.physicalReward}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{award.recipients} recipients</span>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 p-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {awards.length}
              </div>
              <div className="text-yellow-100">Award Types</div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {awards.reduce((sum, award) => sum + award.recipients, 0)}
              </div>
              <div className="text-yellow-100">Total Recipients</div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                $
                {awards
                  .reduce((sum, award) => sum + (award.monetaryValue || 0), 0)
                  .toLocaleString()}
              </div>
              <div className="text-yellow-100">Awards Given</div>
            </div>

            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {new Set(awards.map((award) => award.category)).size}
              </div>
              <div className="text-yellow-100">Categories</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Inspire your child to reach for excellence and earn recognition for
            their achievements.
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3"
          >
            View All Awards <Award className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsShowcase;
