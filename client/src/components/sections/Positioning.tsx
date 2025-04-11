import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Positioning = () => {
  const [position, setPosition] = useState("static");
  const [top, setTop] = useState(50);
  const [left, setLeft] = useState(50);
  const [zIndex, setZIndex] = useState(1);
  
  const getPositioningCode = () => {
    if (position === "static") {
      return `.element {
  position: static;
  /* static positioned elements are not affected by top, right, bottom, left, or z-index */
}`;
    }
    
    return `.element {
  position: ${position};
  top: ${top}px;
  left: ${left}px;
  z-index: ${zIndex};
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Positioning</CardTitle>
        <CardDescription>
          Learn how position properties affect element placement in the document flow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Positioning visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-[400px] p-4">
              <div className="w-full h-full flex items-center justify-center">
                <div className="absolute bg-gray-300 dark:bg-gray-700 w-24 h-24 rounded-md flex items-center justify-center">
                  Parent
                </div>
                
                <div 
                  className="bg-red-500 dark:bg-red-600 text-white w-16 h-16 rounded-md flex items-center justify-center"
                  style={{
                    position: position as any,
                    top: `${top}px`,
                    left: `${left}px`,
                    zIndex: zIndex,
                  }}
                >
                  Element
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
                  <label className="block text-sm font-medium mb-1">position</label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">static</SelectItem>
                      <SelectItem value="relative">relative</SelectItem>
                      <SelectItem value="absolute">absolute</SelectItem>
                      <SelectItem value="fixed">fixed</SelectItem>
                      <SelectItem value="sticky">sticky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">top: {top}px</label>
                  </div>
                  <Slider 
                    value={[top]} 
                    min={0} 
                    max={200} 
                    step={1}
                    onValueChange={(value) => setTop(value[0])}
                    disabled={position === "static"}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">left: {left}px</label>
                  </div>
                  <Slider 
                    value={[left]} 
                    min={0} 
                    max={200} 
                    step={1}
                    onValueChange={(value) => setLeft(value[0])}
                    disabled={position === "static"}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">z-index: {zIndex}</label>
                  </div>
                  <Slider 
                    value={[zIndex]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setZIndex(value[0])}
                    disabled={position === "static"}
                  />
                </div>
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