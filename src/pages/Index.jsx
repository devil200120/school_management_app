import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "../hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page instead of non-existent portal
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center w-full max-w-sm">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-eduos-primary leading-tight"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          EDUOS
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Education Portal
        </motion.p>
        <motion.p
          className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Redirecting to login...
        </motion.p>
        <motion.div
          className="mt-4 md:mt-6 h-1 bg-eduos-primary mx-auto rounded-full"
          animate={{
            width: ["12px", "100px", "12px"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Index;
