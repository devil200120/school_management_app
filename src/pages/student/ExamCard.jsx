import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Printer, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ExamCard = () => {
  const { user } = useAuth();
  const [isPrinting, setIsPrinting] = useState(false);

  const examCardData = {
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
    toast.success("Exam card downloaded successfully!");
    // Normally this would trigger a PDF generation
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Print Exam Card</h1>

        <div className="flex gap-3">
          <Button 
            onClick={handlePrint} 
            className="bg-eduos-primary hover:bg-eduos-secondary transition-all duration-300"
            disabled={isPrinting}
          >
            <Printer size={16} className="mr-2" />
            {isPrinting ? 'Printing...' : 'Print'}
          </Button>

          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="border-eduos-primary text-eduos-primary hover:bg-eduos-light transition-all duration-300"
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-6 max-w-3xl mx-auto border-2 border-gray-200 shadow-lg print:shadow-none">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-eduos-primary">EDUOS</h2>
          <p className="text-red-500 font-semibold">We serve you better we serve you better</p>
          <h2 className="text-2xl font-bold text-eduos-primary">EDUOS</h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded inline-block">
            <span>09167634231, 09167634768</span>
          </div>
          <div className="mt-1">
            <p>Email: admin@yourdomain.com</p>
            <p>Website: https://akara.eduos.com.ng/</p>
          </div>
          <h3 className="text-xl font-bold mt-4">STUDENT EXAMINATION PASS FIRST TERM</h3>
        </div>

        <CardContent className="border border-gray-300 p-4 flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <div className="bg-gray-200 h-40 flex items-center justify-center border border-gray-300">
              <span className="text-gray-500">Photo</span>
            </div>
          </div>
          <div className="w-full md:w-3/4 md:pl-4 space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Student Name:</span>
              <span>{examCardData.studentName}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Admission Number:</span>
              <span>{examCardData.admissionNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Level:</span>
              <span>{examCardData.level}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Class:</span>
              <span>{examCardData.class}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Term:</span>
              <span>{examCardData.term}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Session:</span>
              <span>{examCardData.session}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="font-semibold">Date Printed:</span>
              <span>{examCardData.datePrinted}</span>
            </div>
          </div>
        </CardContent>

        <div className="mt-6 flex justify-between items-center print:mt-12">
          <div className="text-center">
            <div className="border-b border-black w-40 pt-10"></div>
            <p className="text-sm">Student's Signature</p>
          </div>
          <div className="text-center">
            <div className="border-b border-black w-40 pt-10"></div>
            <p className="text-sm">Principal's Signature</p>
          </div>
        </div>
      </Card>

      <div className="hidden print:block mt-8 text-center text-sm">
        <p>This document was printed from the EDUOS Portal on {new Date().toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
};

export default ExamCard;
