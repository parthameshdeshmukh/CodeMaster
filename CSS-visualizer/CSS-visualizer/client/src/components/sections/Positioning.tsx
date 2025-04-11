import { useState } from "react";

const Positioning = () => {
  const [positionType, setPositionType] = useState("static");
  const [offsets, setOffsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  const positionDescriptions = {
    static: "Static: Default position. Elements render in order as they appear in the document flow.",
    relative: "Relative: Positioned relative to its normal position. Setting top, right, etc. will move it from its normal position.",
    absolute: "Absolute: Positioned relative to the nearest positioned ancestor. Removed from normal document flow.",
    fixed: "Fixed: Positioned relative to the viewport. Stays in place even when scrolling.",
    sticky: "Sticky: Toggles between relative and fixed based on scroll position. Try scrolling the container."
  };

  const updatePositionOffset = (property: string, value: number) => {
    setOffsets({
      ...offsets,
      [property]: value
    });
  };

  const updatePositionCode = () => {
    let codeContent = `.element {\n  position: ${positionType};`;
    
    if (positionType !== 'static') {
      if (offsets.top !== 0) codeContent += `\n  top: ${offsets.top}px;`;
      if (offsets.right !== 0) codeContent += `\n  right: ${offsets.right}px;`;
      if (offsets.bottom !== 0) codeContent += `\n  bottom: ${offsets.bottom}px;`;
      if (offsets.left !== 0) codeContent += `\n  left: ${offsets.left}px;`;
    }
    
    codeContent += '\n}';
    return codeContent;
  };

  return (
    <section id="positioning" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-layout-masonry-line mr-2"></i> Positioning
          </h2>
          <p className="text-gray-300 mt-1">Understand how elements are positioned relative to each other.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Positioning visualization */}
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg h-96 p-4 overflow-auto">
              <div className="bg-gray-700 w-full h-full flex flex-col p-3">
                <div className="text-xs text-gray-400 mb-2">Parent Container</div>
                <div 
                  className="w-32 h-32 bg-accent rounded-md flex items-center justify-center text-white shadow-lg p-4"
                  style={{
                    position: positionType as any,
                    top: positionType !== 'static' ? `${offsets.top}px` : undefined,
                    right: positionType !== 'static' ? `${offsets.right}px` : undefined,
                    bottom: positionType !== 'static' ? `${offsets.bottom}px` : undefined,
                    left: positionType !== 'static' ? `${offsets.left}px` : undefined
                  }}
                >
                  Positioned Element
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for positioning */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Position Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {["static", "relative", "absolute", "fixed", "sticky"].map((type) => (
                  <button 
                    key={type}
                    className={`py-2 px-3 ${positionType === type ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                    onClick={() => setPositionType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-300">{positionDescriptions[positionType as keyof typeof positionDescriptions]}</p>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Offset Values</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="position-top" className="block text-sm mb-1">Top</label>
                  <div className="flex items-center">
                    <input 
                      id="position-top" 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={offsets.top} 
                      className="w-full mr-2"
                      onChange={(e) => updatePositionOffset('top', parseInt(e.target.value))}
                      disabled={positionType === 'static'}
                    />
                    <span className="text-sm w-12 text-right">{offsets.top}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="position-right" className="block text-sm mb-1">Right</label>
                  <div className="flex items-center">
                    <input 
                      id="position-right" 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={offsets.right} 
                      className="w-full mr-2"
                      onChange={(e) => updatePositionOffset('right', parseInt(e.target.value))}
                      disabled={positionType === 'static'}
                    />
                    <span className="text-sm w-12 text-right">{offsets.right}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="position-bottom" className="block text-sm mb-1">Bottom</label>
                  <div className="flex items-center">
                    <input 
                      id="position-bottom" 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={offsets.bottom} 
                      className="w-full mr-2"
                      onChange={(e) => updatePositionOffset('bottom', parseInt(e.target.value))}
                      disabled={positionType === 'static'}
                    />
                    <span className="text-sm w-12 text-right">{offsets.bottom}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="position-left" className="block text-sm mb-1">Left</label>
                  <div className="flex items-center">
                    <input 
                      id="position-left" 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={offsets.left} 
                      className="w-full mr-2"
                      onChange={(e) => updatePositionOffset('left', parseInt(e.target.value))}
                      disabled={positionType === 'static'}
                    />
                    <span className="text-sm w-12 text-right">{offsets.left}px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code display */}
        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
              {updatePositionCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positioning;
