import { useState } from "react";

const ZIndex = () => {
  const [layerProps, setLayerProps] = useState({
    blue: { zIndex: 1, opacity: 1, display: 'block' },
    green: { zIndex: 2, opacity: 1, display: 'block' },
    red: { zIndex: 3, opacity: 1, display: 'block' }
  });
  
  const [selectedOpacityElement, setSelectedOpacityElement] = useState('blue');
  const [selectedDisplayElement, setSelectedDisplayElement] = useState('blue');

  const updateZIndex = (color: string, value: number) => {
    setLayerProps({
      ...layerProps,
      [color]: {
        ...layerProps[color as keyof typeof layerProps],
        zIndex: value
      }
    });
  };

  const updateOpacity = (value: number) => {
    setLayerProps({
      ...layerProps,
      [selectedOpacityElement]: {
        ...layerProps[selectedOpacityElement as keyof typeof layerProps],
        opacity: value / 100
      }
    });
  };

  const updateDisplay = (value: string) => {
    setLayerProps({
      ...layerProps,
      [selectedDisplayElement]: {
        ...layerProps[selectedDisplayElement as keyof typeof layerProps],
        display: value
      }
    });
  };

  const updateZIndexCode = () => {
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
    <section id="z-index" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-stack-line mr-2"></i> Z-Index & Layers
          </h2>
          <p className="text-gray-300 mt-1">Learn how elements stack on top of each other.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Z-index visualization */}
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg h-96 p-4">
              <div 
                className="layer-card absolute w-48 h-48 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center text-white" 
                style={{
                  top: '40px', 
                  left: '40px', 
                  zIndex: layerProps.blue.zIndex,
                  opacity: layerProps.blue.opacity,
                  display: layerProps.blue.display
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
                  left: '80px', 
                  zIndex: layerProps.green.zIndex,
                  opacity: layerProps.green.opacity,
                  display: layerProps.green.display
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
                  left: '120px', 
                  zIndex: layerProps.red.zIndex,
                  opacity: layerProps.red.opacity,
                  display: layerProps.red.display
                }}
              >
                <div className="text-center">
                  <div>Red Card</div>
                  <div className="text-sm">z-index: {layerProps.red.zIndex}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for z-index */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Adjust Z-Index Values</h3>
              
              <div className="mb-4">
                <label htmlFor="blue-z-index" className="block text-sm mb-1">Blue Card Z-Index</label>
                <div className="flex items-center">
                  <input 
                    id="blue-z-index" 
                    type="range" 
                    min="-1" 
                    max="10" 
                    value={layerProps.blue.zIndex} 
                    className="w-full mr-2"
                    onChange={(e) => updateZIndex('blue', parseInt(e.target.value))}
                  />
                  <span className="text-sm w-8 text-right">{layerProps.blue.zIndex}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="green-z-index" className="block text-sm mb-1">Green Card Z-Index</label>
                <div className="flex items-center">
                  <input 
                    id="green-z-index" 
                    type="range" 
                    min="-1" 
                    max="10" 
                    value={layerProps.green.zIndex} 
                    className="w-full mr-2"
                    onChange={(e) => updateZIndex('green', parseInt(e.target.value))}
                  />
                  <span className="text-sm w-8 text-right">{layerProps.green.zIndex}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="red-z-index" className="block text-sm mb-1">Red Card Z-Index</label>
                <div className="flex items-center">
                  <input 
                    id="red-z-index" 
                    type="range" 
                    min="-1" 
                    max="10" 
                    value={layerProps.red.zIndex} 
                    className="w-full mr-2"
                    onChange={(e) => updateZIndex('red', parseInt(e.target.value))}
                  />
                  <span className="text-sm w-8 text-right">{layerProps.red.zIndex}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Related Properties</h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Opacity</label>
                <select 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm mb-2"
                  value={selectedOpacityElement}
                  onChange={(e) => setSelectedOpacityElement(e.target.value)}
                >
                  <option value="blue">Blue Card</option>
                  <option value="green">Green Card</option>
                  <option value="red">Red Card</option>
                </select>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={layerProps[selectedOpacityElement as keyof typeof layerProps].opacity * 100} 
                    className="w-full mr-2"
                    onChange={(e) => updateOpacity(parseInt(e.target.value))}
                  />
                  <span className="text-sm w-10 text-right">
                    {Math.round(layerProps[selectedOpacityElement as keyof typeof layerProps].opacity * 100)}%
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Display Property</label>
                <select 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm mb-2"
                  value={selectedDisplayElement}
                  onChange={(e) => setSelectedDisplayElement(e.target.value)}
                >
                  <option value="blue">Blue Card</option>
                  <option value="green">Green Card</option>
                  <option value="red">Red Card</option>
                </select>
                <select 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={layerProps[selectedDisplayElement as keyof typeof layerProps].display}
                  onChange={(e) => updateDisplay(e.target.value)}
                >
                  <option value="block">Block</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code display */}
        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
              {updateZIndexCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZIndex;
