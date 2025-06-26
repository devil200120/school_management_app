import React from 'react';
import { StudentProfileCard } from './StudentProfileCard';
import { SchoolFeesCard } from './SchoolFeesCard';
import { ResultCheckerCard } from './ResultCheckerCard';
import { PerformanceCard } from './PerformanceCard';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

export const DashboardLayout = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="space-y-4 md:space-y-6 px-1 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-eduos-primary to-eduos-secondary bg-clip-text text-transparent leading-tight text-center sm:text-left"
        variants={itemVariants}
      >
        Welcome Back!
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="w-full mx-auto sm:mx-0 max-w-xs sm:max-w-none">
          <StudentProfileCard />
        </motion.div>
        <motion.div variants={itemVariants} className="w-full mx-auto sm:mx-0 max-w-xs sm:max-w-none">
          <SchoolFeesCard />
        </motion.div>
        <motion.div variants={itemVariants} className="w-full mx-auto sm:mx-0 max-w-xs sm:max-w-none">
          <ResultCheckerCard />
        </motion.div>
        <motion.div variants={itemVariants} className="w-full mx-auto sm:mx-0 max-w-xs sm:max-w-none">
          <PerformanceCard />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
