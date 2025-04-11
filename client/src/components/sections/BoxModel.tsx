import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BoxModel = () => {
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100
  });

  const [padding, setPadding] = useState({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  });

  const [border, setBorder] = useState({
    width: 2,
    radius: 0
  });

  const [margin, setMargin] = useState({
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  });

  const updateBoxModelCode = () => {
    return `.element {
  width: ${dimensions.width}px;
  height: ${dimensions.height}px;
  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
  border: ${border.width}px solid #333;
  border-radius: ${border.radius}px;
  margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Box Model</CardTitle>
        <CardDescription>
          Understand how width, height, padding, border, and margin work together to create layout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Box Model Visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="relative w-full h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              {/* Margin */}
              <div 
                className="absolute bg-yellow-100 dark:bg-yellow-900/30 border border-dashed border-yellow-400 flex items-center justify-center"
                style={{
                  width: dimensions.width + padding.left + padding.right + border.width * 2 + margin.left + margin.right,
                  height: dimensions.height + padding.top + padding.bottom + border.width * 2 + margin.top + margin.bottom,
                }}
              >
                <div className="absolute top-1 left-2 text-xs text-yellow-700 dark:text-yellow-500">margin</div>
                
                {/* Border */}
                <div 
                  className="bg-orange-100 dark:bg-orange-900/30 border border-dashed border-orange-400 flex items-center justify-center"
                  style={{
                    width: dimensions.width + padding.left + padding.right + border.width * 2,
                    height: dimensions.height + padding.top + padding.bottom + border.width * 2,
                    borderRadius: `${border.radius}px`,
                  }}
                >
                  <div className="absolute top-1 left-2 text-xs text-orange-700 dark:text-orange-500">border</div>
                  
                  {/* Padding */}
                  <div 
                    className="bg-blue-100 dark:bg-blue-900/30 border border-dashed border-blue-400 flex items-center justify-center"
                    style={{
                      width: dimensions.width + padding.left + padding.right,
                      height: dimensions.height + padding.top + padding.bottom,
                    }}
                  >
                    <div className="absolute top-1 left-2 text-xs text-blue-700 dark:text-blue-500">padding</div>
                    
                    {/* Content */}
                    <div 
                      className="bg-green-100 dark:bg-green-900/30 border border-dashed border-green-400 flex items-center justify-center"
                      style={{
                        width: dimensions.width,
                        height: dimensions.height,
                      }}
                    >
                      <div className="text-xs text-green-700 dark:text-green-500">content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div>
            <Tabs defaultValue="dimensions">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="dimensions">Size</TabsTrigger>
                <TabsTrigger value="padding">Padding</TabsTrigger>
                <TabsTrigger value="border">Border</TabsTrigger>
                <TabsTrigger value="margin">Margin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dimensions" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Width: {dimensions.width}px</label>
                  </div>
                  <Slider 
                    value={[dimensions.width]} 
                    min={50} 
                    max={200} 
                    step={1}
                    onValueChange={(value) => setDimensions(prev => ({ ...prev, width: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Height: {dimensions.height}px</label>
                  </div>
                  <Slider 
                    value={[dimensions.height]} 
                    min={50} 
                    max={200} 
                    step={1}
                    onValueChange={(value) => setDimensions(prev => ({ ...prev, height: value[0] }))}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="padding" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Top: {padding.top}px</label>
                  </div>
                  <Slider 
                    value={[padding.top]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setPadding(prev => ({ ...prev, top: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Right: {padding.right}px</label>
                  </div>
                  <Slider 
                    value={[padding.right]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setPadding(prev => ({ ...prev, right: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Bottom: {padding.bottom}px</label>
                  </div>
                  <Slider 
                    value={[padding.bottom]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setPadding(prev => ({ ...prev, bottom: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Left: {padding.left}px</label>
                  </div>
                  <Slider 
                    value={[padding.left]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setPadding(prev => ({ ...prev, left: value[0] }))}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="border" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Width: {border.width}px</label>
                  </div>
                  <Slider 
                    value={[border.width]} 
                    min={0} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setBorder(prev => ({ ...prev, width: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Border Radius: {border.radius}px</label>
                  </div>
                  <Slider 
                    value={[border.radius]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setBorder(prev => ({ ...prev, radius: value[0] }))}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="margin" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Top: {margin.top}px</label>
                  </div>
                  <Slider 
                    value={[margin.top]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setMargin(prev => ({ ...prev, top: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Right: {margin.right}px</label>
                  </div>
                  <Slider 
                    value={[margin.right]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setMargin(prev => ({ ...prev, right: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Bottom: {margin.bottom}px</label>
                  </div>
                  <Slider 
                    value={[margin.bottom]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setMargin(prev => ({ ...prev, bottom: value[0] }))}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Left: {margin.left}px</label>
                  </div>
                  <Slider 
                    value={[margin.left]} 
                    min={0} 
                    max={50} 
                    step={1}
                    onValueChange={(value) => setMargin(prev => ({ ...prev, left: value[0] }))}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {updateBoxModelCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoxModel;