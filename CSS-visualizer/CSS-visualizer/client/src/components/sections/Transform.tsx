import { useState, useEffect } from "react";

const Transform = () => {
  const [transform, setTransform] = useState({
    rotate: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    skew: 0
  });

  const [transition, setTransition] = useState({
    duration: 0.5,
    timing: 'ease'
  });

  const [animation, setAnimation] = useState('');

  const updateTransformValue = (property: string, value: number) => {
    setTransform({
      ...transform,
      [property]: value
    });
  };

  const updateTransitionValue = (property: string, value: string | number) => {
    setTransition({
      ...transition,
      [property]: value
    });
  };

  const applyAnimationPreset = (preset: string) => {
    // First reset transform values
    setTransform({
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      skew: 0
    });

    // Apply the animation
    setAnimation(preset);
  };

  const resetTransform = () => {
    setTransform({
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      skew: 0
    });
    setTransition({
      duration: 0.5,
      timing: 'ease'
    });
    setAnimation('');
  };

  const getTransformCode = () => {
    if (animation) {
      switch (animation) {
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
  animation: pulse 2s ease-in-out infinite;
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

  const getAnimationStyle = () => {
    if (animation) {
      switch (animation) {
        case 'spin':
          return { animation: 'spin 2s linear infinite' };
        case 'pulse':
          return { animation: 'pulse 2s ease-in-out infinite' };
        case 'bounce':
          return { animation: 'bounce 1s ease infinite' };
        case 'shake':
          return { animation: 'shake 0.5s ease-in-out infinite' };
        default:
          return {};
      }
    } else {
      return {
        transform: `rotate(${transform.rotate}deg) scale(${transform.scale}) translateX(${transform.translateX}px) translateY(${transform.translateY}px) skew(${transform.skew}deg)`,
        transition: `all ${transition.duration}s ${transition.timing}`
      };
    }
  };

  return (
    <section id="transform" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-artboard-2-line mr-2"></i> Transform & Animation
          </h2>
          <p className="text-gray-300 mt-1">Explore visual transformations and animations with CSS.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Transform visualization */}
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg h-96 flex items-center justify-center">
              <style jsx>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.1); }
                  100% { transform: scale(1); }
                }
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-20px); }
                }
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-10px); }
                  75% { transform: translateX(10px); }
                }
              `}</style>
              <div 
                className="w-40 h-40 bg-accent rounded-lg shadow-lg flex items-center justify-center text-white"
                style={getAnimationStyle()}
              >
                Transform Me
              </div>
            </div>
          </div>
          
          {/* Controls for transform */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transform Properties</h3>
              
              <div className="mb-4">
                <label htmlFor="rotate" className="block text-sm mb-1">Rotate</label>
                <div className="flex items-center">
                  <input 
                    id="rotate" 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={transform.rotate} 
                    className="w-full mr-2"
                    onChange={(e) => updateTransformValue('rotate', parseInt(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-14 text-right">{transform.rotate}deg</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="scale" className="block text-sm mb-1">Scale</label>
                <div className="flex items-center">
                  <input 
                    id="scale" 
                    type="range" 
                    min="0.5" 
                    max="2.5" 
                    value={transform.scale} 
                    step="0.1" 
                    className="w-full mr-2"
                    onChange={(e) => updateTransformValue('scale', parseFloat(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-14 text-right">{transform.scale.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="translate-x" className="block text-sm mb-1">Translate X</label>
                <div className="flex items-center">
                  <input 
                    id="translate-x" 
                    type="range" 
                    min="-100" 
                    max="100" 
                    value={transform.translateX} 
                    className="w-full mr-2"
                    onChange={(e) => updateTransformValue('translateX', parseInt(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-14 text-right">{transform.translateX}px</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="translate-y" className="block text-sm mb-1">Translate Y</label>
                <div className="flex items-center">
                  <input 
                    id="translate-y" 
                    type="range" 
                    min="-100" 
                    max="100" 
                    value={transform.translateY} 
                    className="w-full mr-2"
                    onChange={(e) => updateTransformValue('translateY', parseInt(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-14 text-right">{transform.translateY}px</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="skew" className="block text-sm mb-1">Skew</label>
                <div className="flex items-center">
                  <input 
                    id="skew" 
                    type="range" 
                    min="-45" 
                    max="45" 
                    value={transform.skew} 
                    className="w-full mr-2"
                    onChange={(e) => updateTransformValue('skew', parseInt(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-14 text-right">{transform.skew}deg</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Animation Properties</h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Transition Duration</label>
                <div className="flex items-center">
                  <input 
                    id="transition-duration" 
                    type="range" 
                    min="0" 
                    max="3" 
                    value={transition.duration} 
                    step="0.1" 
                    className="w-full mr-2"
                    onChange={(e) => updateTransitionValue('duration', parseFloat(e.target.value))}
                    disabled={!!animation}
                  />
                  <span className="text-sm w-12 text-right">{transition.duration}s</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Transition Timing</label>
                <select 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={transition.timing}
                  onChange={(e) => updateTransitionValue('timing', e.target.value)}
                  disabled={!!animation}
                >
                  <option value="ease">Ease</option>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Animation Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`py-2 px-3 ${animation === 'spin' ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                    onClick={() => applyAnimationPreset('spin')}
                  >
                    Spin
                  </button>
                  <button 
                    className={`py-2 px-3 ${animation === 'pulse' ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                    onClick={() => applyAnimationPreset('pulse')}
                  >
                    Pulse
                  </button>
                  <button 
                    className={`py-2 px-3 ${animation === 'bounce' ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                    onClick={() => applyAnimationPreset('bounce')}
                  >
                    Bounce
                  </button>
                  <button 
                    className={`py-2 px-3 ${animation === 'shake' ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                    onClick={() => applyAnimationPreset('shake')}
                  >
                    Shake
                  </button>
                  <button 
                    className="py-2 px-3 bg-accent hover:bg-accent-hover rounded-md text-sm col-span-2"
                    onClick={resetTransform}
                  >
                    Reset All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code display */}
        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
              {getTransformCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transform;
