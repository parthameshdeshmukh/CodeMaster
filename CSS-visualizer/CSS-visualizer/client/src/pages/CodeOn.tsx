import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface CSSInputChallenge {
  id: string;
  title: string;
  description: string;
  hint: string;
  category: string;
  difficulty: string;
  inputs: { label: string; property: string }[];
  solution: { [key: string]: string };
  badge: string;
}

const challenges: CSSInputChallenge[] = [
  // Box Model Questions
  {
    id: 'box-1',
    title: 'Basic Box Model',
    description: 'Create a simple box with padding and margin.',
    hint: 'Use padding and margin properties.',
    category: 'Box Model',
    difficulty: 'Basic',
    inputs: [
      { label: 'padding', property: 'padding' },
      { label: 'margin', property: 'margin' },
      { label: 'border', property: 'border' },
      { label: 'width', property: 'width' },
    ],
    solution: {
      padding: '20px',
      margin: '10px',
      border: '2px solid #333',
      width: '200px',
    },
    badge: '📦 Box Basic',
  },
  {
    id: 'box-2',
    title: 'Box Shadow Effects',
    description: 'Add a subtle shadow effect to the box.',
    hint: 'Use box-shadow property with rgba values.',
    category: 'Box Model',
    difficulty: 'Easy',
    inputs: [
      { label: 'box-shadow', property: 'boxShadow' },
      { label: 'border-radius', property: 'borderRadius' },
      { label: 'background', property: 'background' },
      { label: 'padding', property: 'padding' },
    ],
    solution: {
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: 'white',
      padding: '15px',
    },
    badge: '🎭 Shadow Expert',
  },
  {
    id: 'box-3',
    title: 'Complex Border Design',
    description: 'Create a border with gradient and multiple sides.',
    hint: 'Use border properties for each side.',
    category: 'Box Model',
    difficulty: 'Medium',
    inputs: [
      { label: 'border-left', property: 'borderLeft' },
      { label: 'border-right', property: 'borderRight' },
      { label: 'border-radius', property: 'borderRadius' },
      { label: 'background', property: 'background' },
    ],
    solution: {
      borderLeft: '4px solid #ff6b6b',
      borderRight: '4px solid #4ecdc4',
      borderRadius: '10px',
      background: 'linear-gradient(45deg, #fff1f1, #e8f9f7)',
    },
    badge: '🎨 Border Master',
  },
  // Flexbox Questions
  {
    id: 'flex-1',
    title: 'Basic Flexbox Layout',
    description: 'Create a simple horizontal flex container.',
    hint: 'Use display and justify-content properties.',
    category: 'Flexbox',
    difficulty: 'Basic',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'justify-content', property: 'justifyContent' },
      { label: 'gap', property: 'gap' },
      { label: 'padding', property: 'padding' },
    ],
    solution: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      padding: '10px',
    },
    badge: '🔄 Flex Basic',
  },
  {
    id: 'flex-2',
    title: 'Flex Navigation',
    description: 'Create a responsive navigation menu.',
    hint: 'Use flex properties for spacing.',
    category: 'Flexbox',
    difficulty: 'Easy',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'align-items', property: 'alignItems' },
      { label: 'justify-content', property: 'justifyContent' },
      { label: 'padding', property: 'padding' },
    ],
    solution: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '15px',
    },
    badge: '🎯 Nav Master',
  },
  {
    id: 'flex-3',
    title: 'Complex Flex Grid',
    description: 'Create a flex-based grid layout with wrapping.',
    hint: 'Use flex-wrap and flex-basis.',
    category: 'Flexbox',
    difficulty: 'Medium',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'flex-wrap', property: 'flexWrap' },
      { label: 'gap', property: 'gap' },
      { label: 'flex-basis', property: 'flexBasis' },
    ],
    solution: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      flexBasis: 'calc(33.33% - 15px)',
    },
    badge: '🌟 Flex Grid Pro',
  },
  // Grid Questions
  {
    id: 'grid-1',
    title: 'Basic Grid Layout',
    description: 'Create a simple 2x2 grid.',
    hint: 'Use grid-template-columns property.',
    category: 'Grid',
    difficulty: 'Basic',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'grid-template-columns', property: 'gridTemplateColumns' },
      { label: 'gap', property: 'gap' },
      { label: 'padding', property: 'padding' },
    ],
    solution: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      padding: '10px',
    },
    badge: '📏 Grid Basic',
  },
  {
    id: 'grid-2',
    title: 'Grid Areas',
    description: 'Create a layout using grid areas.',
    hint: 'Use grid-template-areas property.',
    category: 'Grid',
    difficulty: 'Easy',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'grid-template-areas', property: 'gridTemplateAreas' },
      { label: 'grid-template-columns', property: 'gridTemplateColumns' },
      { label: 'gap', property: 'gap' },
    ],
    solution: {
      display: 'grid',
      gridTemplateAreas: '"header header" "sidebar main" "footer footer"',
      gridTemplateColumns: '200px 1fr',
      gap: '15px',
    },
    badge: '🎯 Grid Areas Pro',
  },
  {
    id: 'grid-3',
    title: 'Responsive Grid',
    description: 'Create a responsive grid that adapts to different screen sizes.',
    hint: 'Use minmax and auto-fit.',
    category: 'Grid',
    difficulty: 'Medium',
    inputs: [
      { label: 'display', property: 'display' },
      { label: 'grid-template-columns', property: 'gridTemplateColumns' },
      { label: 'gap', property: 'gap' },
      { label: 'padding', property: 'padding' },
    ],
    solution: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    badge: '🌟 Grid Master',
  },

  // Positioning Questions
  {
    id: 'position-1',
    title: 'Absolute Positioning',
    description: 'Position an element absolutely within a container.',
    hint: 'Set position to absolute and define top, left values.',
    category: 'Positioning',
    difficulty: 'Basic',
    inputs: [
      { label: 'top', property: 'top' },
      { label: 'left', property: 'left' },
      { label: 'width', property: 'width' },
      { label: 'height', property: 'height' },
    ],
    solution: {
      top: '50px',
      left: '100px',
      width: '200px',
      height: '100px',
    },
    badge: '📍 Positioning Pro',
  },

  // Z-Index Questions
  {
    id: 'zindex-1',
    title: 'Z-Index Adjustment',
    description: 'Change the z-index of overlapping elements.',
    hint: 'Adjust the z-index to determine stacking order.',
    category: 'Z-Index',
    difficulty: 'Basic',
    inputs: [
      { label: 'z-index', property: 'zIndex' },
      { label: 'opacity', property: 'opacity' },
    ],
    solution: {
      zIndex: '2',
      opacity: '1',
    },
    badge: '🎚️ Z-Index Guru',
  },

  // Transform Questions
  {
    id: 'transform-1',
    title: 'Scale Transformation',
    description: 'Scale an element to twice its size.',
    hint: 'Use the transform property with scale.',
    category: 'Transform',
    difficulty: 'Basic',
    inputs: [
      { label: 'scale', property: 'transform' },
    ],
    solution: {
      transform: 'scale(2)',
    },
    badge: '🔄 Transform Expert',
  },
];

const CodeOn = () => {
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [styles, setStyles] = useState<{ [key: string]: string }>({});
  const [showBadge, setShowBadge] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const correctCount = Object.entries(currentChallenge.solution).filter(
      ([key, val]) => styles[key]?.trim() === val
    ).length;
    setProgress((correctCount / Object.keys(currentChallenge.solution).length) * 100);
  }, [styles, currentChallenge]);

  const handleChange = (property: string, value: string) => {
    setStyles((prev) => {
      const updated = { ...prev, [property]: value };
      checkSolution(updated);
      return updated;
    });
  };

  const checkSolution = (currentStyles: { [key: string]: string }) => {
    const isCorrect = Object.entries(currentChallenge.solution).every(
      ([key, val]) => currentStyles[key]?.trim() === val
    );
    if (isCorrect && !showBadge) {
      setShowBadge(true);
    } else if (!isCorrect && Object.keys(currentStyles).length === Object.keys(currentChallenge.solution).length) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const reset = () => {
    setStyles({});
    setShowBadge(false);
    setProgress(0);
  };

  const handleChallengeChange = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setCurrentChallenge(challenge);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9]">
      <header className="sticky top-0 z-50 bg-[#0D1117] border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="ri-css3-fill text-2xl text-blue-400"></i>
            <h1 className="text-xl font-bold">CSS Learning Playground</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 text-sm items-center">
              <li><a href="/#box-model" className="hover:text-blue-400">Box Model</a></li>
              <li><a href="/#flexbox" className="hover:text-blue-400">Flexbox</a></li>
              <li><a href="/#grid" className="hover:text-blue-400">Grid</a></li>
              <li><a href="/#positioning" className="hover:text-blue-400">Positioning</a></li>
              <li><a href="/#z-index" className="hover:text-blue-400">Z-Index</a></li>
              <li><a href="/#transform" className="hover:text-blue-400">Transform</a></li>
              <li><a href="/code-on" className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">CodeOn</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <Card className="max-w-5xl mx-auto p-8 bg-[#161B22] rounded-2xl shadow-lg transform transition-all hover:scale-[1.02]">
        <div className="mb-6">
          <select 
            className="w-full p-2 rounded bg-[#21262D] text-white border border-[#30363D]"
            value={currentChallenge.id}
            onChange={(e) => handleChallengeChange(e.target.value)}
          >
            {challenges.map(challenge => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.category} - {challenge.title} ({challenge.difficulty})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">{currentChallenge.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentChallenge.difficulty === 'Easy' ? 'bg-green-600' :
                currentChallenge.difficulty === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                {currentChallenge.difficulty}
              </span>
            </div>

            <p className="mb-1">{currentChallenge.description}</p>
            <p className="text-yellow-400 text-sm mb-2">Hint: {currentChallenge.hint}</p>

            <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4">
              {currentChallenge.inputs.map((input) => (
                <div key={input.property} className="flex gap-2 items-center">
                  <label className="w-40 font-mono">{input.label}:</label>
                  <input
                    className="flex-1 p-2 rounded bg-black text-green-400 font-mono border border-[#30363D] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder={`Enter ${input.label}`}
                    value={styles[input.property] || ''}
                    onChange={(e) => handleChange(input.property, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button 
              onClick={reset} 
              className="mt-6 bg-red-600 hover:bg-red-700 transform active:scale-95 transition-all"
            >
              Reset
            </Button>

            {showBadge && (
              <div className="mt-6 text-green-400 flex items-center gap-2 animate-bounce">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full font-semibold">
                  {currentChallenge.badge}
                </span>
                <span className="text-xs text-gray-400">+10 XP</span>
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
            <div
              className={`bg-white w-full rounded-lg flex transition-all duration-300 border border-dashed border-[#30363D] ${
                showBadge ? 'ring-4 ring-green-500 animate-pulse' : ''
              } ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
              style={{ ...styles, minHeight: '200px' }}
            >
              {currentChallenge.category === 'Grid' ? (
                <>
                  <div className="bg-blue-500 rounded p-4">1</div>
                  <div className="bg-blue-500 rounded p-4">2</div>
                  <div className="bg-blue-500 rounded p-4">3</div>
                  <div className="bg-blue-500 rounded p-4">4</div>
                </>
              ) : (
                <div className={`w-16 h-16 bg-blue-500 rounded transition-all duration-300 ${
                  showBadge ? 'animate-spin' : ''
                }`} />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CodeOn;

