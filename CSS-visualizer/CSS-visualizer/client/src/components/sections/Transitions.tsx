
import { useState } from "react";

const Transitions = () => {
  const [duration, setDuration] = useState(0.3);
  const [timing, setTiming] = useState("ease");
  const [delay, setDelay] = useState(0);
  const [animationType, setAnimationType] = useState("none");

  const animations = {
    none: {},
    fade: {
      opacity: 0,
    },
    slide: {
      transform: "translateX(-100%)",
    },
    scale: {
      transform: "scale(0.5)",
    },
    rotate: {
      transform: "rotate(-180deg)",
    },
  };

  return (
    <section id="transitions" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-transition-line mr-2"></i> Transitions & Animations
          </h2>
          <p className="text-gray-300 mt-1">Learn how to create smooth transitions and animations.</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="h-96 flex items-center justify-center bg-gray-800 rounded-lg">
              <div
                className="w-32 h-32 bg-accent rounded-lg shadow-lg"
                style={{
                  transition: `all ${duration}s ${timing} ${delay}s`,
                  ...animations[animationType as keyof typeof animations],
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Transition Properties</h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Duration (seconds)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={duration}
                    className="w-full mr-2"
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{duration}s</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Timing Function</label>
                <select
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                >
                  <option value="ease">Ease</option>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Delay (seconds)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={delay}
                    className="w-full mr-2"
                    onChange={(e) => setDelay(parseFloat(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{delay}s</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Animation States</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(animations).map((type) => (
                  <button
                    key={type}
                    className={`py-2 px-3 ${
                      animationType === type ? "bg-accent" : "bg-primary hover:bg-primary-light border border-gray-600"
                    } rounded-md text-sm`}
                    onClick={() => setAnimationType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
{`.element {
  transition: all ${duration}s ${timing} ${delay}s;
  ${animationType !== 'none' ? Object.entries(animations[animationType as keyof typeof animations])
    .map(([prop, value]) => `${prop}: ${value};`)
    .join('\n  ') : ''}
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transitions;
