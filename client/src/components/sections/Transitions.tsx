import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Transitions = () => {
  const [duration, setDuration] = useState(0.5);
  const [timingFunction, setTimingFunction] = useState("ease");
  const [delay, setDelay] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Generate the CSS code based on current state
  const getTransitionCode = () => {
    return `.transition-element {
  transition-property: transform;
  transition-duration: ${duration}s;
  transition-timing-function: ${timingFunction};
  transition-delay: ${delay}s;
}

.transition-element:hover {
  transform: translateX(${translateX}px);
}`;
  };
  
  // Handle play animation
  const handlePlayAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, (duration + delay) * 1000 + 100);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Transitions</CardTitle>
        <CardDescription>
          Learn how CSS transitions create smooth animations between property changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transition visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 flex items-center justify-center"
            >
              <div className="relative w-full h-64 flex items-center justify-center">
                {/* Track line */}
                <div className="absolute h-px w-full bg-gray-300 dark:bg-gray-600"></div>
                
                {/* Element with transition */}
                <div 
                  className="w-24 h-24 bg-orange-100 dark:bg-orange-900/50 border-2 border-orange-500 flex items-center justify-center text-orange-900 dark:text-orange-100 shadow-lg"
                  style={{
                    transform: isAnimating ? `translateX(${translateX}px)` : 'translateX(0px)',
                    transition: `transform ${duration}s ${timingFunction} ${delay}s`
                  }}
                >
                  Transition
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={handlePlayAnimation}
                  disabled={isAnimating}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {isAnimating ? "Animating..." : "Play Animation"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Controls for transition */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transition Properties</h3>
              
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium mb-2">timing-function</label>
                  <Select value={timingFunction} onValueChange={setTimingFunction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ease">ease</SelectItem>
                      <SelectItem value="linear">linear</SelectItem>
                      <SelectItem value="ease-in">ease-in</SelectItem>
                      <SelectItem value="ease-out">ease-out</SelectItem>
                      <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                      <SelectItem value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">cubic-bezier (bouncy)</SelectItem>
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
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">translateX: {translateX}px</label>
                  </div>
                  <Slider 
                    value={[translateX]} 
                    min={0} 
                    max={200} 
                    step={10}
                    onValueChange={(value) => setTranslateX(value[0])}
                  />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Transitions enable smooth changes between property values over time. They're great for hover effects and simple animations.</p>
                <p className="mt-2">The timing function controls the acceleration curve of the animation. Different functions create different feels.</p>
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