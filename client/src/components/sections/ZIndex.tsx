import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const ZIndex = () => {
  const [zIndex1, setZIndex1] = useState(1);
  const [zIndex2, setZIndex2] = useState(2);
  const [zIndex3, setZIndex3] = useState(3);
  
  // Generate the CSS code based on current state
  const getZIndexCode = () => {
    return `.red-box {
  z-index: ${zIndex1};
}
.green-box {
  z-index: ${zIndex2};
}
.blue-box {
  z-index: ${zIndex3};
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Z-Index & Layers</CardTitle>
        <CardDescription>
          Learn how CSS z-index property affects stacking order of elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Z-Index visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <div 
                className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded min-h-[300px] flex items-center justify-center"
              >
                {/* Three overlapping boxes with different z-indices */}
                <div 
                  className="absolute w-40 h-40 bg-red-200 dark:bg-red-900/50 border-2 border-red-500 flex items-center justify-center rounded shadow-lg"
                  style={{ 
                    zIndex: zIndex1,
                    top: '50px',
                    left: '100px',
                  }}
                >
                  <div className="text-center">
                    <div className="font-medium text-red-800 dark:text-red-200">Red Box</div>
                    <div className="text-xs text-red-600 dark:text-red-300">z-index: {zIndex1}</div>
                  </div>
                </div>
                
                <div 
                  className="absolute w-40 h-40 bg-green-200 dark:bg-green-900/50 border-2 border-green-500 flex items-center justify-center rounded shadow-lg"
                  style={{ 
                    zIndex: zIndex2,
                    top: '100px',
                    left: '150px',
                  }}
                >
                  <div className="text-center">
                    <div className="font-medium text-green-800 dark:text-green-200">Green Box</div>
                    <div className="text-xs text-green-600 dark:text-green-300">z-index: {zIndex2}</div>
                  </div>
                </div>
                
                <div 
                  className="absolute w-40 h-40 bg-blue-200 dark:bg-blue-900/50 border-2 border-blue-500 flex items-center justify-center rounded shadow-lg"
                  style={{ 
                    zIndex: zIndex3,
                    top: '150px',
                    left: '200px',
                  }}
                >
                  <div className="text-center">
                    <div className="font-medium text-blue-800 dark:text-blue-200">Blue Box</div>
                    <div className="text-xs text-blue-600 dark:text-blue-300">z-index: {zIndex3}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for z-index */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Z-Index Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Red Box z-index: {zIndex1}</label>
                  </div>
                  <Slider 
                    value={[zIndex1]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setZIndex1(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Green Box z-index: {zIndex2}</label>
                  </div>
                  <Slider 
                    value={[zIndex2]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setZIndex2(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Blue Box z-index: {zIndex3}</label>
                  </div>
                  <Slider 
                    value={[zIndex3]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setZIndex3(value[0])}
                  />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>The z-index property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order.</p>
                <p className="mt-2">Z-index only works on positioned elements (position: absolute, relative, fixed, or sticky).</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getZIndexCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZIndex;