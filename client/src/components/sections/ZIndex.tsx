import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const ZIndex = () => {
  const [layerProps, setLayerProps] = useState({
    blue: {
      zIndex: 1,
      opacity: 1,
      display: "block",
    },
    green: {
      zIndex: 2,
      opacity: 1,
      display: "block",
    },
    red: {
      zIndex: 3,
      opacity: 1,
      display: "block",
    },
  });

  const updateLayerProp = (layer: string, prop: string, value: number | string) => {
    setLayerProps(prev => ({
      ...prev,
      [layer]: {
        ...prev[layer as keyof typeof prev],
        [prop]: value
      }
    }));
  };

  const getZIndexCode = () => {
    return `.blue-card {
  position: absolute;
  z-index: ${layerProps.blue.zIndex};
  opacity: ${layerProps.blue.opacity};
  display: ${layerProps.blue.display};
}

.green-card {
  position: absolute;
  z-index: ${layerProps.green.zIndex};
  opacity: ${layerProps.green.opacity};
  display: ${layerProps.green.display};
}

.red-card {
  position: absolute;
  z-index: ${layerProps.red.zIndex};
  opacity: ${layerProps.red.opacity};
  display: ${layerProps.red.display};
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Z-Index & Layers</CardTitle>
        <CardDescription>
          Learn how elements stack on top of each other with z-index.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Z-index visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-[400px] p-4">
              <div 
                className="layer-card absolute w-48 h-48 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white" 
                style={{
                  top: '40px', 
                  left: '40px', 
                  zIndex: layerProps.blue.zIndex,
                  opacity: layerProps.blue.opacity,
                  display: layerProps.blue.display as any
                }}
              >
                <div className="text-center">
                  <div>Blue Card</div>
                  <div className="text-sm">z-index: {layerProps.blue.zIndex}</div>
                </div>
              </div>
              <div 
                className="layer-card absolute w-48 h-48 bg-green-500 rounded-lg shadow-lg flex items-center justify-center text-white" 
                style={{
                  top: '80px', 
                  left: '100px', 
                  zIndex: layerProps.green.zIndex,
                  opacity: layerProps.green.opacity,
                  display: layerProps.green.display as any
                }}
              >
                <div className="text-center">
                  <div>Green Card</div>
                  <div className="text-sm">z-index: {layerProps.green.zIndex}</div>
                </div>
              </div>
              <div 
                className="layer-card absolute w-48 h-48 bg-red-500 rounded-lg shadow-lg flex items-center justify-center text-white" 
                style={{
                  top: '120px', 
                  left: '160px', 
                  zIndex: layerProps.red.zIndex,
                  opacity: layerProps.red.opacity,
                  display: layerProps.red.display as any
                }}
              >
                <div className="text-center">
                  <div>Red Card</div>
                  <div className="text-sm">z-index: {layerProps.red.zIndex}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for Z-index */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Blue Card</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">z-index: {layerProps.blue.zIndex}</label>
                  </div>
                  <Slider 
                    value={[layerProps.blue.zIndex]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => updateLayerProp('blue', 'zIndex', value[0])}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">opacity: {layerProps.blue.opacity}</label>
                  </div>
                  <Slider 
                    value={[layerProps.blue.opacity as number]} 
                    min={0} 
                    max={1} 
                    step={0.1}
                    onValueChange={(value) => updateLayerProp('blue', 'opacity', value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Green Card</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">z-index: {layerProps.green.zIndex}</label>
                  </div>
                  <Slider 
                    value={[layerProps.green.zIndex]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => updateLayerProp('green', 'zIndex', value[0])}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">opacity: {layerProps.green.opacity}</label>
                  </div>
                  <Slider 
                    value={[layerProps.green.opacity as number]} 
                    min={0} 
                    max={1} 
                    step={0.1}
                    onValueChange={(value) => updateLayerProp('green', 'opacity', value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Red Card</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">z-index: {layerProps.red.zIndex}</label>
                  </div>
                  <Slider 
                    value={[layerProps.red.zIndex]} 
                    min={-1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => updateLayerProp('red', 'zIndex', value[0])}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">opacity: {layerProps.red.opacity}</label>
                  </div>
                  <Slider 
                    value={[layerProps.red.opacity as number]} 
                    min={0} 
                    max={1} 
                    step={0.1}
                    onValueChange={(value) => updateLayerProp('red', 'opacity', value[0])}
                  />
                </div>
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