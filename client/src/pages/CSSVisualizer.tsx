import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CertificateModal, CertificateModalRef } from "@/components/CertificateModal";

// CSS Visualizer Components
import BoxModel from "@/components/sections/BoxModel";
import Flexbox from "@/components/sections/Flexbox";
import Grid from "@/components/sections/Grid";
import Positioning from "@/components/sections/Positioning";
import ZIndex from "@/components/sections/ZIndex";
import Transform from "@/components/sections/Transform";
import Transitions from "@/components/sections/Transitions";
import Typography from "@/components/sections/Typography";

export default function CSSVisualizer() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("box-model");
  const [completed, setCompleted] = useState<Record<string, boolean>>({
    "box-model": false,
    "flexbox": false,
    "grid": false,
    "positioning": false,
    "z-index": false,
    "transform": false,
    "transitions": false,
    "typography": false
  });
  const [certificate, setCertificate] = useState(null);
  const certificateModalRef = useRef<CertificateModalRef>(null);
  const [username, setUsername] = useState("");

  // Mark a section as completed
  const markCompleted = (section: string) => {
    setCompleted(prev => ({ ...prev, [section]: true }));
    
    toast({
      title: "Section Completed!",
      description: `You've completed the ${getSectionName(section)} section.`,
      variant: "success"
    });
    
    // Check if all sections are completed
    const allCompleted = Object.values({ ...completed, [section]: true }).every(v => v);
    if (allCompleted) {
      checkForCertificate();
    }
  };

  // Get user-friendly section name
  const getSectionName = (section: string) => {
    const names: Record<string, string> = {
      "box-model": "Box Model",
      "flexbox": "Flexbox",
      "grid": "CSS Grid",
      "positioning": "Positioning",
      "z-index": "Z-Index & Layers",
      "transform": "Transform & Animation",
      "transitions": "Transitions",
      "typography": "Typography"
    };
    return names[section] || section;
  };

  // Check if user should get a CSS certificate
  const checkForCertificate = async () => {
    try {
      // Call API to check if user qualifies for a certificate
      const response = await apiRequest<{eligible: boolean, certificate: any, username: string}>("/api/certificates/check-eligibility", {
        method: "POST",
        data: { language: "css" }
      });
      
      if (response.eligible) {
        setCertificate(response.certificate);
        setUsername(response.username);
        setTimeout(() => {
          certificateModalRef.current?.open();
        }, 500);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error checking for certificate eligibility.",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CSS Visualizer</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Learn CSS concepts through interactive visualizations. Complete all sections to earn your CSS certificate!
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>
              Complete all 8 sections to earn your CSS certificate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(completed).map(([section, isCompleted]) => (
                <div 
                  key={section}
                  className={`border p-4 rounded-lg ${isCompleted ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    <span className="font-medium">{getSectionName(section)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="box-model">Box Model</TabsTrigger>
            <TabsTrigger value="flexbox">Flexbox</TabsTrigger>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="positioning">Positioning</TabsTrigger>
            <TabsTrigger value="z-index">Z-Index</TabsTrigger>
            <TabsTrigger value="transform">Transform</TabsTrigger>
            <TabsTrigger value="transitions">Transitions</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
          </TabsList>
          
          <TabsContent value="box-model" className="relative">
            <BoxModel />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("box-model")} disabled={completed["box-model"]}>
                {completed["box-model"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="flexbox" className="relative">
            <Flexbox />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("flexbox")} disabled={completed["flexbox"]}>
                {completed["flexbox"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="grid" className="relative">
            <Grid />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("grid")} disabled={completed["grid"]}>
                {completed["grid"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="positioning" className="relative">
            <Positioning />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("positioning")} disabled={completed["positioning"]}>
                {completed["positioning"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="z-index" className="relative">
            <ZIndex />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("z-index")} disabled={completed["z-index"]}>
                {completed["z-index"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="transform" className="relative">
            <Transform />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("transform")} disabled={completed["transform"]}>
                {completed["transform"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="transitions" className="relative">
            <Transitions />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("transitions")} disabled={completed["transitions"]}>
                {completed["transitions"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="relative">
            <Typography />
            <div className="mt-6 text-right">
              <Button onClick={() => markCompleted("typography")} disabled={completed["typography"]}>
                {completed["typography"] ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CertificateModal ref={certificateModalRef} certificate={certificate} username={username} />
    </Layout>
  );
}