import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const QuestionNavigation = ({ totalQuestions, currentQuestion, answeredQuestions, onSelectQuestion }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="hidden sm:flex flex-wrap gap-1"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {Array(totalQuestions).fill(0).map((_, idx) => (
        <motion.button
          key={idx}
          variants={item}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs relative
            ${currentQuestion === idx ? 'ring-2 ring-eduos-primary' : ''}
            ${answeredQuestions.includes(idx)
              ? 'bg-eduos-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
          onClick={() => onSelectQuestion(idx)}
        >
          {answeredQuestions.includes(idx) && (
            <motion.div
              className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <CheckCircle2 className="w-2 h-2 text-white" />
            </motion.div>
          )}
          {idx + 1}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuestionNavigation;
