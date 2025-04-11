import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Transform = () => {
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [transformOrigin, setTransformOrigin] = useState("center");
  
  // Generate the CSS code based on current state
  const getTransformCode = () => {
    const transforms = [];
    
    if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`);
    if (scaleX !== 1 || scaleY !== 1) transforms.push(`scale(${scaleX}, ${scaleY})`);
    if (translateX !== 0 || translateY !== 0) transforms.push(`translate(${translateX}px, ${translateY}px)`);
    
    return `.transformed-element {
  transform: ${transforms.length ? transforms.join(' ') : 'none'};
  transform-origin: ${transformOrigin};
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Transform</CardTitle>
        <CardDescription>
          Learn how CSS transform property can rotate, scale, and move elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transform visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Reference lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 opacity-50"></div>
                  <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700 opacity-50"></div>
                </div>
                
                {/* Transform origin indicator */}
                <div 
                  className="absolute w-3 h-3 rounded-full bg-red-500 z-10"
                  style={{
                    top: transformOrigin.includes('top') ? '25%' : 
                          transformOrigin.includes('bottom') ? '75%' : '50%',
                    left: transformOrigin.includes('left') ? '25%' : 
                           transformOrigin.includes('right') ? '75%' : '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
                
                {/* Original element (ghost) */}
                <div 
                  className="absolute w-32 h-32 border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center"
                >
                  <span className="text-xs text-gray-400 dark:text-gray-500">Original</span>
                </div>
                
                {/* Transformed element */}
                <div 
                  className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/50 border-2 border-indigo-500 flex items-center justify-center text-indigo-900 dark:text-indigo-100 shadow-lg"
                  style={{
                    transform: `${rotate !== 0 ? `rotate(${rotate}deg)` : ''} ${scaleX !== 1 || scaleY !== 1 ? `scale(${scaleX}, ${scaleY})` : ''} ${translateX !== 0 || translateY !== 0 ? `translate(${translateX}px, ${translateY}px)` : ''}`,
                    transformOrigin: transformOrigin
                  }}
                >
                  Transformed
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for transform */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transform Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">rotate: {rotate}deg</label>
                  </div>
                  <Slider 
                    value={[rotate]} 
                    min={-180} 
                    max={180} 
                    step={15}
                    onValueChange={(value) => setRotate(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">scaleX: {scaleX.toFixed(1)}</label>
                  </div>
                  <Slider 
                    value={[scaleX]} 
                    min={0.5} 
                    max={2} 
                    step={0.1}
                    onValueChange={(value) => setScaleX(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">scaleY: {scaleY.toFixed(1)}</label>
                  </div>
                  <Slider 
                    value={[scaleY]} 
                    min={0.5} 
                    max={2} 
                    step={0.1}
                    onValueChange={(value) => setScaleY(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">translateX: {translateX}px</label>
                  </div>
                  <Slider 
                    value={[translateX]} 
                    min={-50} 
                    max={50} 
                    step={5}
                    onValueChange={(value) => setTranslateX(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">translateY: {translateY}px</label>
                  </div>
                  <Slider 
                    value={[translateY]} 
                    min={-50} 
                    max={50} 
                    step={5}
                    onValueChange={(value) => setTranslateY(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">transform-origin</label>
                  <Select value={transformOrigin} onValueChange={setTransformOrigin}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transform origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="top left">top left</SelectItem>
                      <SelectItem value="top right">top right</SelectItem>
                      <SelectItem value="bottom left">bottom left</SelectItem>
                      <SelectItem value="bottom right">bottom right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getTransformCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transform;