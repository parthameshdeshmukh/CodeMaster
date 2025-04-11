import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const BoxModel = () => {
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100
  });

  const [padding, setPadding] = useState({
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  });

  const [border, setBorder] = useState({
    width: 2,
    radius: 0
  });

  const [margin, setMargin] = useState({
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  });

  const updateBoxModelCode = () => {
    return `.element {
  width: ${dimensions.width}px;
  height: ${dimensions.height}px;
  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
  border: ${border.width}px solid #333;
  border-radius: ${border.radius}px;
  margin: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
}`;
  };

  return (
    <section id="box-model" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-box-3-line mr-2"></i> Box Model
          </h2>
          <p className="text-gray-300 mt-1">Understand how margin, border, padding, and dimensions work together.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Box model visualization */}
          <div className="bg-primary-light p-6 rounded-lg">
            <div id="box-model-container" className="relative flex justify-center items-center h-96 bg-gray-800 rounded-lg overflow-hidden">
              <div 
                id="margin-area" 
                className="bg-blue-900 bg-opacity-20 flex justify-center items-center"
                style={{
                  marginTop: `${margin.top}px`,
                  marginRight: `${margin.right}px`,
                  marginBottom: `${margin.bottom}px`,
                  marginLeft: `${margin.left}px`,
                  borderRadius: `${border.radius * 1.2}px`
                }}
              >
                {/* <div className="absolute text-xs text-blue-300 top-1 left-2">Margin</div> */}
                <div 
                  id="border-area" 
                  className="bg-red-900 bg-opacity-20 flex justify-center items-center"
                  style={{
                    borderWidth: `${border.width}px`,
                    borderStyle: 'solid',
                    borderColor: 'rgba(185, 28, 28, 0.2)',
                    borderRadius: `${border.radius}px`
                  }}
                >
                  {/* <div className="absolute text-xs text-red-300 top-2 left-2">Border</div> */}
                  <div 
                    id="padding-area" 
                    className="bg-green-900 bg-opacity-20 flex justify-center items-center"
                    style={{
                      paddingTop: `${padding.top}px`,
                      paddingRight: `${padding.right}px`,
                      paddingBottom: `${padding.bottom}px`,
                      paddingLeft: `${padding.left}px`,
                      borderRadius: `${border.radius * 0.8}px`
                    }}
                  >
                    {/* <div className="absolute text-xs text-green-300 top-3 left-2">Padding</div> */}
                    <div 
                      id="content-area" 
                      className="bg-gray-700 flex justify-center items-center"
                      style={{
                        width: `${dimensions.width}px`,
                        height: `${dimensions.height}px`,
                        borderRadius: `${border.radius * 0.6}px`
                      }}
                    >
                      <div className="text-center">Content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for box model */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Dimensions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="width" className="block text-sm mb-1">Width</label>
                  <div className="flex items-center">
                    <input 
                      id="width" 
                      type="range" 
                      min="50" 
                      max="200" 
                      value={dimensions.width} 
                      className="w-full mr-2"
                      onChange={(e) => setDimensions({...dimensions, width: parseInt(e.target.value)})}
                    />
                    <span id="width-value" className="text-sm w-12 text-right">{dimensions.width}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm mb-1">Height</label>
                  <div className="flex items-center">
                    <input 
                      id="height" 
                      type="range" 
                      min="50" 
                      max="200" 
                      value={dimensions.height} 
                      className="w-full mr-2"
                      onChange={(e) => setDimensions({...dimensions, height: parseInt(e.target.value)})}
                    />
                    <span id="height-value" className="text-sm w-12 text-right">{dimensions.height}px</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Padding</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="padding-top" className="block text-sm mb-1">Top</label>
                  <div className="flex items-center">
                    <input 
                      id="padding-top" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={padding.top} 
                      className="w-full mr-2"
                      onChange={(e) => setPadding({...padding, top: parseInt(e.target.value)})}
                    />
                    <span id="padding-top-value" className="text-sm w-12 text-right">{padding.top}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="padding-right" className="block text-sm mb-1">Right</label>
                  <div className="flex items-center">
                    <input 
                      id="padding-right" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={padding.right} 
                      className="w-full mr-2"
                      onChange={(e) => setPadding({...padding, right: parseInt(e.target.value)})}
                    />
                    <span id="padding-right-value" className="text-sm w-12 text-right">{padding.right}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="padding-bottom" className="block text-sm mb-1">Bottom</label>
                  <div className="flex items-center">
                    <input 
                      id="padding-bottom" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={padding.bottom} 
                      className="w-full mr-2"
                      onChange={(e) => setPadding({...padding, bottom: parseInt(e.target.value)})}
                    />
                    <span id="padding-bottom-value" className="text-sm w-12 text-right">{padding.bottom}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="padding-left" className="block text-sm mb-1">Left</label>
                  <div className="flex items-center">
                    <input 
                      id="padding-left" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={padding.left} 
                      className="w-full mr-2"
                      onChange={(e) => setPadding({...padding, left: parseInt(e.target.value)})}
                    />
                    <span id="padding-left-value" className="text-sm w-12 text-right">{padding.left}px</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Border</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="border-width" className="block text-sm mb-1">Width</label>
                  <div className="flex items-center">
                    <input 
                      id="border-width" 
                      type="range" 
                      min="0" 
                      max="20" 
                      value={border.width} 
                      className="w-full mr-2"
                      onChange={(e) => setBorder({...border, width: parseInt(e.target.value)})}
                    />
                    <span id="border-width-value" className="text-sm w-12 text-right">{border.width}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="border-radius" className="block text-sm mb-1">Radius</label>
                  <div className="flex items-center">
                    <input 
                      id="border-radius" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={border.radius} 
                      className="w-full mr-2"
                      onChange={(e) => setBorder({...border, radius: parseInt(e.target.value)})}
                    />
                    <span id="border-radius-value" className="text-sm w-12 text-right">{border.radius}px</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Margin</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="margin-top" className="block text-sm mb-1">Top</label>
                  <div className="flex items-center">
                    <input 
                      id="margin-top" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={margin.top} 
                      className="w-full mr-2"
                      onChange={(e) => setMargin({...margin, top: parseInt(e.target.value)})}
                    />
                    <span id="margin-top-value" className="text-sm w-12 text-right">{margin.top}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="margin-right" className="block text-sm mb-1">Right</label>
                  <div className="flex items-center">
                    <input 
                      id="margin-right" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={margin.right} 
                      className="w-full mr-2"
                      onChange={(e) => setMargin({...margin, right: parseInt(e.target.value)})}
                    />
                    <span id="margin-right-value" className="text-sm w-12 text-right">{margin.right}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="margin-bottom" className="block text-sm mb-1">Bottom</label>
                  <div className="flex items-center">
                    <input 
                      id="margin-bottom" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={margin.bottom} 
                      className="w-full mr-2"
                      onChange={(e) => setMargin({...margin, bottom: parseInt(e.target.value)})}
                    />
                    <span id="margin-bottom-value" className="text-sm w-12 text-right">{margin.bottom}px</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="margin-left" className="block text-sm mb-1">Left</label>
                  <div className="flex items-center">
                    <input 
                      id="margin-left" 
                      type="range" 
                      min="0" 
                      max="50" 
                      value={margin.left} 
                      className="w-full mr-2"
                      onChange={(e) => setMargin({...margin, left: parseInt(e.target.value)})}
                    />
                    <span id="margin-left-value" className="text-sm w-12 text-right">{margin.left}px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code display */}
        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre id="box-model-code" className="text-code-text font-mono text-sm whitespace-pre-wrap">
              {updateBoxModelCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxModel;
