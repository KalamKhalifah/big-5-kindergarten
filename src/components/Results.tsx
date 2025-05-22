import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Answer, DomainScore } from '../types';
import { calculateScores } from '../utils/scoreCalculator';
import DomainResultCard from './DomainResultCard';
import TraitBarChart from './TraitBarChart'; // Import the new component
import { Award, Download, Loader2 } from 'lucide-react';

interface ResultsProps {
  answers: Answer[];
  onRetake: () => void;
}

const Results: React.FC<ResultsProps> = ({ answers, onRetake }) => {
  const scores: DomainScore[] = calculateScores(answers);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!resultsRef.current) return;
    setIsDownloading(true);

    const element = resultsRef.current;

    // Temporarily add a class to constrain width for PDF generation
    element.classList.add('pdf-container');

    // Hide buttons during PDF generation
    const buttonsToHide = element.querySelectorAll('.pdf-hide-button');
    buttonsToHide.forEach(btn => (btn as HTMLElement).style.display = 'none');


    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // If you have external images
        logging: false,
        onclone: (document) => {
          // This function is called when html2canvas clones the document
          // You can make adjustments to the cloned document here before rendering
          // For example, ensure dark mode styles are rendered correctly if applicable
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      let newImgWidth = pdfWidth;
      let newImgHeight = newImgWidth / ratio;

      // If image height is still greater than pdf height, scale by height
      if (newImgHeight > pdfHeight) {
        newImgHeight = pdfHeight;
        newImgWidth = newImgHeight * ratio;
      }
      
      const x = (pdfWidth - newImgWidth) / 2;
      const y = 0; // Start from top

      // Handle multi-page PDF
      let position = y;
      const pageHeight = pdf.internal.pageSize.getHeight() - 20; // Usable page height with some margin
      let remainingHeight = imgHeight * (newImgWidth / imgWidth); // Total scaled image height

      pdf.addImage(imgData, 'PNG', x, position, newImgWidth, newImgHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        pdf.addPage();
        position = -remainingHeight + y; // Negative position to show next part of image
        pdf.addImage(imgData, 'PNG', x, position, newImgWidth, newImgHeight);
        remainingHeight -= pageHeight;
      }
      
      pdf.save('assessment-results.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
      // Optionally, show an error message to the user
    } finally {
      // Restore button visibility
      buttonsToHide.forEach(btn => (btn as HTMLElement).style.display = '');
      // Remove the temporary class
      element.classList.remove('pdf-container');
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div ref={resultsRef} className="bg-white rounded-lg shadow-xl p-6 md:p-10">
        <div className="text-center mb-8">
          <Award size={48} className="mx-auto text-sky-500 mb-2" />
          <h2 className="text-3xl font-bold text-slate-800">Assessment Results</h2>
          <p className="text-slate-600 mt-2">
            Here is a summary of the personality assessment. These scores provide insights into different traits.
          </p>
        </div>

        {/* Add the bar chart component here */}
        <div className="mb-8">
           <h3 className="text-2xl font-bold text-slate-800 mb-4 text-center">Trait Overview</h3>
           <TraitBarChart scores={scores} />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scores.map((domainScore) => (
            <DomainResultCard key={domainScore.domain} domainScore={domainScore} />
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
          <h4 className="font-bold">Disclaimer</h4>
          <p className="text-sm">
            This assessment is for informational and educational purposes only. It is not a substitute for professional psychological advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical or psychological condition.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center space-x-4">
        <button
          onClick={onRetake}
          disabled={isDownloading}
          className="px-8 py-3 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition-colors text-lg pdf-hide-button disabled:opacity-50"
        >
          Retake Assessment
        </button>
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="px-8 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-colors text-lg pdf-hide-button disabled:opacity-50 flex items-center justify-center mx-auto sm:mx-0"
        >
          {isDownloading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download size={20} className="mr-2" />
              Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Results;
