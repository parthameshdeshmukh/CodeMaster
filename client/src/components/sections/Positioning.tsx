import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Positioning = () => {
  const [position, setPosition] = useState("relative");
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(20);
  const [right, setRight] = useState(0);
  const [bottom, setBottom] = useState(0);
  
  // Generate the CSS code based on current state
  const getPositioningCode = () => {
    return `.positioned-element {
  position: ${position};
  top: ${position === "static" ? "auto" : `${top}px`};
  left: ${position === "static" ? "auto" : `${left}px`};
  right: ${position === "static" ? "auto" : `${right}px`};
  bottom: ${position === "static" ? "auto" : `${bottom}px`};
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Positioning</CardTitle>
        <CardDescription>
          Learn how CSS positioning works with static, relative, absolute, and fixed positions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Positioning visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="relative min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <div className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded min-h-[300px]">
                {/* Parent element */}
                <div className="absolute inset-0 border-2 border-dotted border-blue-300 dark:border-blue-700 m-4 flex items-center justify-center opacity-30">
                  <span className="text-blue-500 dark:text-blue-400 text-xs font-medium">Parent Element (position: relative)</span>
                </div>
                
                {/* Positioned element */}
                <div 
                  className="w-28 h-28 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded flex items-center justify-center p-2 text-sm text-green-900 dark:text-green-100"
                  style={{
                    position: position as any,
                    top: position === "static" ? "auto" : `${top}px`,
                    left: position === "static" ? "auto" : `${left}px`,
                    right: position === "static" ? "auto" : `${right}px`,
                    bottom: position === "static" ? "auto" : `${bottom}px`,
                  }}
                >
                  Positioned Element
                </div>
                
                {/* Static element for reference */}
                <div className="w-28 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 rounded mt-2 mb-2">
                  Static Element
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for positioning */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Positioning Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">position</label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">static</SelectItem>
                      <SelectItem value="relative">relative</SelectItem>
                      <SelectItem value="absolute">absolute</SelectItem>
                      <SelectItem value="fixed">fixed</SelectItem>
                      <SelectItem value="sticky">sticky</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    {position === "static" && "Static (default): Element is positioned according to the normal flow of the document."}
                    {position === "relative" && "Relative: Element is positioned relative to its normal position."}
                    {position === "absolute" && "Absolute: Element is positioned relative to the nearest positioned ancestor."}
                    {position === "fixed" && "Fixed: Element is positioned relative to the viewport and doesn't move when scrolled."}
                    {position === "sticky" && "Sticky: Element is positioned based on scroll position. It's like a hybrid of relative and fixed."}
                  </p>
                </div>
                
                {position !== "static" && (
                  <>
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">top: {top}px</label>
                      </div>
                      <Slider 
                        value={[top]} 
                        min={0} 
                        max={100} 
                        step={5}
                        onValueChange={(value) => setTop(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">left: {left}px</label>
                      </div>
                      <Slider 
                        value={[left]} 
                        min={0} 
                        max={100} 
                        step={5}
                        onValueChange={(value) => setLeft(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">right: {right}px</label>
                      </div>
                      <Slider 
                        value={[right]} 
                        min={0} 
                        max={100} 
                        step={5}
                        onValueChange={(value) => setRight(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">bottom: {bottom}px</label>
                      </div>
                      <Slider 
                        value={[bottom]} 
                        min={0} 
                        max={100} 
                        step={5}
                        onValueChange={(value) => setBottom(value[0])}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getPositioningCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Positioning;