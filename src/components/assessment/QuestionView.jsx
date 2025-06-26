import React from 'react';
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Button } from '../../components/ui/button';
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const QuestionView = ({
  currentQuestion,
  totalQuestions,
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, x: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={currentQuestion}
    >
      <div className="mb-6">
        <div className="flex gap-2 items-center text-sm font-medium text-gray-700 mb-3">
          <span className="bg-eduos-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">
            {currentQuestion + 1}
          </span>
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
        </div>
        <motion.h3 className="text-lg font-medium mb-5" variants={itemVariants}>
          {question.text}
        </motion.h3>

        <RadioGroup
          value={selectedAnswer === -1 ? undefined : selectedAnswer.toString()}
          onValueChange={onAnswerSelect}
          className="space-y-3"
        >
          {question.options.map((option, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors ${
                selectedAnswer === idx
                  ? 'bg-eduos-light border-eduos-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
              <label htmlFor={`option-${idx}`} className="text-base font-medium flex-grow cursor-pointer">
                {option}
              </label>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      <motion.div className="flex justify-between" variants={itemVariants}>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {currentQuestion < totalQuestions - 1 ? (
            <Button
              onClick={onNext}
              className="bg-eduos-primary hover:bg-eduos-secondary flex items-center gap-2"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              Submit <Send className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-500 flex items-center">
          {selectedAnswer !== -1 ? (
            <div className="flex items-center text-green-500">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Answered
            </div>
          ) : (
            <div className="flex items-center text-amber-500">
              <XCircle className="h-4 w-4 mr-1" /> Not answered
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionView;
