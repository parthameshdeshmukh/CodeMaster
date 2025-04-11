import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Transform = () => {
  const [transform, setTransform] = useState({
    rotate: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    skew: 0
  });
  
  const [animation, setAnimation] = useState({
    isAnimated: false,
    type: 'spin',
  });
  
  const [transition, setTransition] = useState({
    duration: 0.3,
    timing: 'ease'
  });

  const getTransformCode = () => {
    if (animation.isAnimated) {
      switch (animation.type) {
        case 'spin':
          return `.element {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;
        case 'pulse':
          return `.element {
  animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}`;
        case 'bounce':
          return `.element {
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}`;
        case 'shake':
          return `.element {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}`;
        default:
          return '';
      }
    } else {
      return `.element {
  transform: rotate(${transform.rotate}deg) scale(${transform.scale}) translateX(${transform.translateX}px) translateY(${transform.translateY}px) skew(${transform.skew}deg);
  transition: all ${transition.duration}s ${transition.timing};
}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transform & Animation</CardTitle>
        <CardDescription>
          Learn how transform properties can change element appearance and position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Transform visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="relative w-full h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div
                className={`w-32 h-32 bg-teal-500 text-white flex items-center justify-center rounded-lg transform transition-all ${animation.isAnimated ? `animate-${animation.type}` : ''}`}
                style={{
                  transform: animation.isAnimated 
                    ? 'none' 
                    : `rotate(${transform.rotate}deg) scale(${transform.scale}) translateX(${transform.translateX}px) translateY(${transform.translateY}px) skew(${transform.skew}deg)`,
                  transition: `all ${transition.duration}s ${transition.timing}`
                }}
              >
                <div className="text-center">
                  <div>Element</div>
                  {animation.isAnimated && (
                    <div className="text-xs mt-1">{animation.type}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for transform */}
          <div>
            <Tabs defaultValue="transform">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="transform">Transform</TabsTrigger>
                <TabsTrigger value="animation">Animation</TabsTrigger>
                <TabsTrigger value="transition">Transition</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transform" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Rotate: {transform.rotate}°</label>
                  </div>
                  <Slider 
                    value={[transform.rotate]} 
                    min={-180} 
                    max={180} 
                    step={1}
                    onValueChange={(value) => setTransform(prev => ({ ...prev, rotate: value[0] }))}
                    disabled={animation.isAnimated}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Scale: {transform.scale.toFixed(1)}</label>
                  </div>
                  <Slider 
                    value={[transform.scale]} 
                    min={0.5} 
                    max={2} 
                    step={0.1}
                    onValueChange={(value) => setTransform(prev => ({ ...prev, scale: value[0] }))}
                    disabled={animation.isAnimated}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Translate X: {transform.translateX}px</label>
                  </div>
                  <Slider 
                    value={[transform.translateX]} 
                    min={-100} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => setTransform(prev => ({ ...prev, translateX: value[0] }))}
                    disabled={animation.isAnimated}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Translate Y: {transform.translateY}px</label>
                  </div>
                  <Slider 
                    value={[transform.translateY]} 
                    min={-100} 
                    max={100} 
                    step={1}
                    onValueChange={(value) => setTransform(prev => ({ ...prev, translateY: value[0] }))}
                    disabled={animation.isAnimated}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Skew: {transform.skew}°</label>
                  </div>
                  <Slider 
                    value={[transform.skew]} 
                    min={-45} 
                    max={45} 
                    step={1}
                    onValueChange={(value) => setTransform(prev => ({ ...prev, skew: value[0] }))}
                    disabled={animation.isAnimated}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="animation" className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input 
                    type="checkbox" 
                    id="isAnimated" 
                    checked={animation.isAnimated} 
                    onChange={(e) => setAnimation(prev => ({ ...prev, isAnimated: e.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="isAnimated" className="text-sm font-medium">Enable Animation</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Animation Type</label>
                  <Select 
                    value={animation.type}
                    onValueChange={(value) => setAnimation(prev => ({ ...prev, type: value }))}
                    disabled={!animation.isAnimated}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spin">Spin</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="shake">Shake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="transition" className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Duration: {transition.duration}s</label>
                  </div>
                  <Slider 
                    value={[transition.duration]} 
                    min={0.1} 
                    max={2} 
                    step={0.1}
                    onValueChange={(value) => setTransition(prev => ({ ...prev, duration: value[0] }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Timing Function</label>
                  <Select 
                    value={transition.timing}
                    onValueChange={(value) => setTransition(prev => ({ ...prev, timing: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timing function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ease">ease</SelectItem>
                      <SelectItem value="ease-in">ease-in</SelectItem>
                      <SelectItem value="ease-out">ease-out</SelectItem>
                      <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                      <SelectItem value="linear">linear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
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