import React, { useState } from 'react';
import { DashboardLayout } from '../../../shared/layouts/DashboardLayout';
import { DashboardStats } from '../components/DashboardStats';
import { DashboardChart } from '../components/DashboardChart';
import { SignerCredentials } from '../components/SignerCredentials';
import { DocumentQueueTable } from '../components/DocumentQueueTable';
import { SignatureModal } from '../components/SignatureModal';

export function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{docNum: string, applicant: string, docType: string} | null>(null);

  const handleSignDocument = (docNum: string, applicant: string, docType: string) => {
    setSelectedDocument({ docNum, applicant, docType });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDocument(null), 200);
  };

  return (
    <DashboardLayout>
      <DashboardStats />
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-unit-lg mb-unit-xl">
        <div className="lg:col-span-8 flex flex-col gap-unit-md">
          <DashboardChart />
        </div>
        <SignerCredentials />
      </section>

      <DocumentQueueTable onSignDocument={handleSignDocument} />
      
      <SignatureModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        documentData={selectedDocument} 
      />
    </DashboardLayout>
  );
}
