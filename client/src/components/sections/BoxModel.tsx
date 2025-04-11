import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const BoxModel = () => {
  const [margin, setMargin] = useState(20);
  const [border, setBorder] = useState(5);
  const [padding, setPadding] = useState(30);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  
  // Generate the CSS code based on current state
  const getBoxModelCode = () => {
    return `.box-model-element {
  margin: ${margin}px;
  border: ${border}px solid #3b82f6;
  padding: ${padding}px;
  width: ${width}px;
  height: ${height}px;
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Box Model</CardTitle>
        <CardDescription>
          Learn how the CSS box model works with margins, borders, padding, and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Box model visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto min-h-[500px] flex items-center justify-center">
            <div 
              className="bg-gray-300 dark:bg-gray-700 relative flex items-center justify-center"
              style={{ 
                padding: margin, 
                position: 'relative'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                Margin
              </div>
              <div 
                className="bg-white dark:bg-gray-800 relative flex items-center justify-center"
                style={{ 
                  border: `${border}px solid #3b82f6`,
                  padding: padding,
                  width: width,
                  height: height,
                  position: 'relative',
                  boxSizing: 'content-box'
                }}
              >
                <div 
                  className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-blue-300 pointer-events-none text-xs text-blue-600 dark:text-blue-400"
                  style={{ 
                    top: border, 
                    left: border, 
                    right: border, 
                    bottom: border 
                  }}
                >
                  Padding
                </div>
                <div 
                  className="bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs text-blue-900 dark:text-blue-100"
                  style={{ 
                    width: '100%', 
                    height: '100%' 
                  }}
                >
                  Content
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for box model */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Box Model Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">margin: {margin}px</label>
                  </div>
                  <Slider 
                    value={[margin]} 
                    min={0} 
                    max={50} 
                    step={5}
                    onValueChange={(value) => setMargin(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">border: {border}px solid</label>
                  </div>
                  <Slider 
                    value={[border]} 
                    min={0} 
                    max={20} 
                    step={1}
                    onValueChange={(value) => setBorder(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">padding: {padding}px</label>
                  </div>
                  <Slider 
                    value={[padding]} 
                    min={0} 
                    max={50} 
                    step={5}
                    onValueChange={(value) => setPadding(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">width: {width}px</label>
                  </div>
                  <Slider 
                    value={[width]} 
                    min={50} 
                    max={300} 
                    step={10}
                    onValueChange={(value) => setWidth(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">height: {height}px</label>
                  </div>
                  <Slider 
                    value={[height]} 
                    min={50} 
                    max={300} 
                    step={10}
                    onValueChange={(value) => setHeight(value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getBoxModelCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoxModel;