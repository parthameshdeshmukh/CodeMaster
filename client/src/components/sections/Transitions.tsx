import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Transitions = () => {
  const [duration, setDuration] = useState(0.5);
  const [timingFunction, setTimingFunction] = useState("ease");
  const [property, setProperty] = useState("all");
  const [delay, setDelay] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const getTransitionCode = () => {
    return `.element {
  /* Initial state */
  background-color: #3498db;
  transform: scale(1) rotate(0deg);
  opacity: 1;
  transition: ${property} ${duration}s ${timingFunction} ${delay}s;
}

.element:hover {
  /* Hover state */
  background-color: #2980b9;
  transform: scale(1.2) rotate(5deg);
  opacity: 0.9;
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transitions</CardTitle>
        <CardDescription>
          Learn how transitions create smooth animations between property changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transitions visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="w-full h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div
                className="w-32 h-32 bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center rounded-lg cursor-pointer"
                style={{
                  backgroundColor: isHovered ? '#2980b9' : '#3498db',
                  transform: isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  opacity: isHovered ? 0.9 : 1,
                  transition: `${property} ${duration}s ${timingFunction} ${delay}s`
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Hover me
              </div>
            </div>
          </div>
          
          {/* Controls for transitions */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transition Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">property</label>
                  <Select value={property} onValueChange={setProperty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">all</SelectItem>
                      <SelectItem value="background-color">background-color</SelectItem>
                      <SelectItem value="transform">transform</SelectItem>
                      <SelectItem value="opacity">opacity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">duration: {duration}s</label>
                  </div>
                  <Slider 
                    value={[duration]} 
                    min={0.1} 
                    max={3} 
                    step={0.1}
                    onValueChange={(value) => setDuration(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">timing function</label>
                  <Select value={timingFunction} onValueChange={setTimingFunction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ease">ease</SelectItem>
                      <SelectItem value="ease-in">ease-in</SelectItem>
                      <SelectItem value="ease-out">ease-out</SelectItem>
                      <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                      <SelectItem value="linear">linear</SelectItem>
                      <SelectItem value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">bounce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">delay: {delay}s</label>
                  </div>
                  <Slider 
                    value={[delay]} 
                    min={0} 
                    max={2} 
                    step={0.1}
                    onValueChange={(value) => setDelay(value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getTransitionCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Transitions;