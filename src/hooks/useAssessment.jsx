import { useState, useEffect, useCallback } from 'react';
import { toast } from '../hooks/use-toast';

export const useAssessment = (questions) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(-1));
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerId, setTimerId] = useState(null);

  // Start the timer when assessment is opened
  useEffect(() => {
    if (isAssessmentOpen && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimerId(timer);

      return () => {
        if (timer) clearInterval(timer);
      };
    }
  }, [isAssessmentOpen, isSubmitted]);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const handleTimeUp = useCallback(() => {
    toast({
      title: "Time's Up!",
      description: "Your assessment has been automatically submitted.",
      variant: "destructive",
    });

    handleSubmit();
  }, []);

  const handleStartAssessment = (assignment) => {
    setSelectedAssignment(assignment);
    setIsAssessmentOpen(true);
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setTimeRemaining(60 * 60); // Reset to 60 minutes
    setIsSubmitted(false);
  };

  const handleAnswerSelect = (value) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = parseInt(value);
    setSelectedAnswers(newAnswers);

    toast({
      title: "Answer saved",
      description: `Question ${currentQuestion + 1} answer saved.`,
      duration: 1500,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (timerId) clearInterval(timerId);

    let score = 0;
    let correctAnswers = 0;

    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 2;
        correctAnswers++;
      }
    });

    setIsSubmitted(true);

    setTimeout(() => {
      toast({
        title: "Assessment Submitted",
        description: `You scored ${score} out of ${questions.length * 2} marks. (${correctAnswers} of ${questions.length} correct)`,
      });

      setTimeout(() => {
        setIsAssessmentOpen(false);
      }, 3000);
    }, 2000);
  };

  const progressPercentage =
    (selectedAnswers.filter((a) => a !== -1).length / selectedAnswers.length) * 100;

  return {
    selectedAssignment,
    isAssessmentOpen,
    currentQuestion,
    selectedAnswers,
    timeRemaining,
    isSubmitted,
    progressPercentage,
    handleStartAssessment,
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    handleSubmit,
    setCurrentQuestion,
    setIsAssessmentOpen,
  };
};
