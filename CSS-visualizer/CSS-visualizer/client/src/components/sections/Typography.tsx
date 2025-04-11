
import { useState } from "react";

const Typography = () => {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textAlign, setTextAlign] = useState("left");
  const [fontFamily, setFontFamily] = useState("sans-serif");

  return (
    <section id="typography" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-font-size-2 mr-2"></i> Typography
          </h2>
          <p className="text-gray-300 mt-1">Explore text styling and formatting options.</p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="min-h-[24rem] bg-white text-black rounded-lg p-6">
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight,
                  fontWeight,
                  letterSpacing: `${letterSpacing}px`,
                  textAlign: textAlign as any,
                  fontFamily,
                }}
              >
                The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                How vexingly quick daft zebras jump! The five boxing wizards jump quickly.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Text Properties</h3>

              <div className="mb-4">
                <label className="block text-sm mb-1">Font Size</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={fontSize}
                    className="w-full mr-2"
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{fontSize}px</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Line Height</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.1"
                    value={lineHeight}
                    className="w-full mr-2"
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{lineHeight}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Font Weight</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={fontWeight}
                    className="w-full mr-2"
                    onChange={(e) => setFontWeight(parseInt(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{fontWeight}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Letter Spacing</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={letterSpacing}
                    className="w-full mr-2"
                    onChange={(e) => setLetterSpacing(parseInt(e.target.value))}
                  />
                  <span className="text-sm w-12 text-right">{letterSpacing}px</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Text Align</label>
                <div className="grid grid-cols-2 gap-2">
                  {["left", "center", "right", "justify"].map((align) => (
                    <button
                      key={align}
                      className={`py-2 px-3 ${
                        textAlign === align ? "bg-accent" : "bg-primary hover:bg-primary-light border border-gray-600"
                      } rounded-md text-sm`}
                      onClick={() => setTextAlign(align)}
                    >
                      {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Font Family</label>
                <select
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
{`.text {
  font-size: ${fontSize}px;
  line-height: ${lineHeight};
  font-weight: ${fontWeight};
  letter-spacing: ${letterSpacing}px;
  text-align: ${textAlign};
  font-family: ${fontFamily};
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Typography;
