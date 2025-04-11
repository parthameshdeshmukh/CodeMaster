import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Certificate } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { formatCertificateDate } from '@/lib/utils';
import { Download, X } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateModalProps {
  certificate: Certificate | null;
  username: string;
}

export interface CertificateModalRef {
  open: () => void;
  close: () => void;
}

export const CertificateModal = forwardRef<CertificateModalRef, CertificateModalProps>(
  ({ certificate, username }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Expose open/close methods to parent components
    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    if (!certificate) return null;

    const handleDownload = () => {
      const certificateElement = document.getElementById('certificate-content');
      if (!certificateElement) return;

      html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: 'white',
      }).then((canvas) => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `certificate-${certificate.title.toLowerCase().replace(/\s+/g, '-')}.png`;
        a.click();
      });
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">Certificate of Completion</DialogTitle>
          </DialogHeader>
          
          <div 
            id="certificate-content"
            className="mt-4 border-4 border-blue-100 p-8 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 text-center relative"
            style={{ backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
            <div className="absolute inset-0 bg-white bg-opacity-90"></div>
            <div className="relative">
              <div className="flex justify-center">
                <svg className="h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">Certificate of Achievement</h1>
              <p className="text-lg text-gray-700 mt-2">This certifies that</p>
              <p className="text-2xl font-semibold text-blue-800 mt-2">{username}</p>
              <p className="text-lg text-gray-700 mt-2">has successfully completed all challenges in</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{certificate.title}</p>
              <p className="text-md text-gray-600 mt-6">
                Completed on: {formatCertificateDate(certificate.issueDate || new Date())}
              </p>
              <p className="text-md text-gray-600">Certificate ID: {certificate.certificateId}</p>
              
              <div className="mt-6 flex justify-center">
                <div className="h-px w-32 bg-gray-300"></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">CodeMaster Platform</p>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2"
            >
              <Download className="-ml-1 mr-2 h-5 w-5" />
              Download Certificate
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center px-4 py-2"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

CertificateModal.displayName = 'CertificateModal';
