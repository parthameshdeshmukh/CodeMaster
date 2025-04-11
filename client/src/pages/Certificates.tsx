import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/Layout';
import { DashboardTabs } from '@/components/DashboardTabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IdCard, Eye } from 'lucide-react';
import { formatCertificateDate } from '@/lib/utils';
import { CertificateModal, CertificateModalRef } from '@/components/CertificateModal';
import { Certificate as CertificateType } from '@shared/schema';

export default function Certificates() {
  const certificateModalRef = useRef<CertificateModalRef>(null);
  const [selectedCertificate, setSelectedCertificate] = React.useState<CertificateType | null>(null);
  
  // Fetch user certificates
  const { data: certificates, isLoading } = useQuery<CertificateType[]>({
    queryKey: ['/api/user/certificates'],
  });
  
  // Fetch current user
  const { data: user } = useQuery<{ username: string }>({
    queryKey: ['/api/user/current'],
  });
  
  const handleViewCertificate = (certificate: CertificateType) => {
    setSelectedCertificate(certificate);
    setTimeout(() => {
      certificateModalRef.current?.open();
    }, 0);
  };

  return (
    <Layout>
      <DashboardTabs />
      
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900">Your Certificates</h2>
        
        {isLoading ? (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : certificates && certificates.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-full bg-purple-100">
                        <IdCard className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {certificate.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Language: {certificate.language}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Issued: {formatCertificateDate(certificate.issueDate || new Date())}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        ID: {certificate.certificateId}
                      </p>
                      <div className="mt-4">
                        <Button 
                          variant="outline"
                          className="w-full text-sm"
                          onClick={() => handleViewCertificate(certificate)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View IdCard
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-4 bg-white rounded-lg shadow p-6 text-center">
            <IdCard className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No certificates yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete challenge sets to earn your first certificate
            </p>
            <div className="mt-6">
              <Button asChild>
                <a href="/challenges">
                  Start a Challenge
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* IdCard Modal */}
      <CertificateModal 
        ref={certificateModalRef}
        certificate={selectedCertificate}
        username={user?.username || ""}
      />
    </Layout>
  );
}
