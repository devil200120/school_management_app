import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Printer, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ExamPass = () => {
  const { user } = useAuth();
  const [isPrinting, setIsPrinting] = useState(false);

  const examPassData = {
    studentName: user?.name || 'John Doe',
    admissionNumber: 'STU-2023-001',
    level: 'Primary Level',
    class: 'Primary One',
    term: 'First Term',
    session: '2023-2024',
    datePrinted: new Date().toLocaleDateString(),
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  const handleDownload = () => {
    toast.success("Exam pass downloaded successfully!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center w-full sm:w-auto sm:text-left">Print Exam Pass</h1>

        <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <Button 
            onClick={handlePrint}
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300 flex-1 sm:flex-none"
            disabled={isPrinting}
          >
            <Printer size={16} className="mr-2" />
            {isPrinting ? 'Printing...' : 'Print'}
          </Button>

          <Button 
            variant="outline"
            onClick={handleDownload}
            className="border-eduos-primary text-eduos-primary hover:bg-eduos-light transition-all duration-300 flex-1 sm:flex-none"
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-3 sm:p-6 mx-auto border-2 border-gray-200 shadow-lg print:shadow-none max-w-full sm:max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-eduos-primary">EDUOS</h2>
          <p className="italic text-gray-600 mt-1 text-sm sm:text-base">Examination Pass</p>
        </div>

        <CardContent className="space-y-4 p-0 sm:p-2">
          {[
            ['Student Name', examPassData.studentName],
            ['Admission Number', examPassData.admissionNumber],
            ['Class', examPassData.class],
            ['Term', examPassData.term],
            ['Session', examPassData.session],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col sm:flex-row sm:justify-between border-b pb-1">
              <span className="font-semibold text-center sm:text-left">{label}:</span>
              <span className="text-center sm:text-right">{value}</span>
            </div>
          ))}
        </CardContent>

        <div className="mt-6 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-md">
          <p className="text-center font-medium text-sm sm:text-base">
            This pass grants access to examination halls for the {examPassData.term} examinations.
          </p>
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-2">
            Present this pass to the invigilator before entering the examination hall.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center print:mt-12 gap-4 sm:gap-0">
          <div className="text-center w-full sm:w-auto">
            <div className="border-b border-black w-32 sm:w-40 pt-10 mx-auto sm:mx-0"></div>
            <p className="text-xs sm:text-sm">Student's Signature</p>
          </div>
          <div className="text-center w-full sm:w-auto">
            <div className="border-b border-black w-32 sm:w-40 pt-10 mx-auto sm:mx-0"></div>
            <p className="text-xs sm:text-sm">Principal's Signature</p>
          </div>
        </div>
      </Card>

      <div className="hidden print:block mt-8 text-center text-sm">
        <p>This document was printed from the EDUOS Portal on {new Date().toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
};

export default ExamPass;
