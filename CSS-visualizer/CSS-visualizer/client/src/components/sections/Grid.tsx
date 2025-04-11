import { useState } from "react";

const Grid = () => {
  const [gridColumns, setGridColumns] = useState("repeat(3, 1fr)");
  const [gridRows, setGridRows] = useState("auto");
  const [gridGap, setGridGap] = useState(16);
  const [justifyContent, setJustifyContent] = useState("start");
  const [alignContent, setAlignContent] = useState("start");
  const [gridItems, setGridItems] = useState([1, 2, 3, 4, 5, 6]);

  const addGridItem = () => {
    setGridItems([...gridItems, gridItems.length + 1]);
  };

  const removeGridItem = () => {
    if (gridItems.length > 1) {
      setGridItems(gridItems.slice(0, -1));
    }
  };

  const updateGridCode = () => {
    return `.container {
  display: grid;
  grid-template-columns: ${gridColumns};
  grid-template-rows: ${gridRows};
  gap: ${gridGap}px;
  justify-content: ${justifyContent};
  align-content: ${alignContent};
}`;
  };

  return (
    <section id="grid" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-layout-grid-line mr-2"></i> Grid Layout
          </h2>
          <p className="text-gray-300 mt-1">Learn how to create complex layouts with CSS Grid.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Grid visualization */}
          <div className="bg-primary-light p-4 rounded-lg">
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg h-96 grid p-4"
              style={{
                gridTemplateColumns: gridColumns,
                gridTemplateRows: gridRows,
                gap: `${gridGap}px`,
                justifyContent: justifyContent,
                alignContent: alignContent
              }}
            >
              {gridItems.map((item, index) => (
                <div key={index} className="grid-item bg-accent text-white p-4 rounded-md flex items-center justify-center">
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls for grid */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Grid Container</h3>
              
              <div className="mb-4">
                <label htmlFor="grid-template-columns" className="block text-sm mb-2">Grid Template Columns</label>
                <select 
                  id="grid-template-columns" 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={gridColumns}
                  onChange={(e) => setGridColumns(e.target.value)}
                >
                  <option value="repeat(1, 1fr)">1 column</option>
                  <option value="repeat(2, 1fr)">2 equal columns</option>
                  <option value="repeat(3, 1fr)">3 equal columns</option>
                  <option value="repeat(4, 1fr)">4 equal columns</option>
                  <option value="1fr 2fr 1fr">1-2-1 columns</option>
                  <option value="auto 1fr 1fr">Auto + 2 equal columns</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="grid-template-rows" className="block text-sm mb-2">Grid Template Rows</label>
                <select 
                  id="grid-template-rows" 
                  className="w-full bg-primary border border-gray-600 rounded-md px-3 py-2 text-sm"
                  value={gridRows}
                  onChange={(e) => setGridRows(e.target.value)}
                >
                  <option value="auto">Auto rows</option>
                  <option value="repeat(2, 1fr)">2 equal rows</option>
                  <option value="repeat(3, 1fr)">3 equal rows</option>
                  <option value="1fr 2fr">1fr + 2fr rows</option>
                  <option value="auto 1fr auto">Header/Content/Footer</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="grid-gap" className="block text-sm mb-1">Gap Size</label>
                <div className="flex items-center">
                  <input 
                    id="grid-gap" 
                    type="range" 
                    min="0" 
                    max="40" 
                    value={gridGap} 
                    className="w-full mr-2"
                    onChange={(e) => setGridGap(parseInt(e.target.value))}
                  />
                  <span id="grid-gap-value" className="text-sm w-12 text-right">{gridGap}px</span>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Justify Content</label>
                <div className="grid grid-cols-2 gap-2">
                  {["start", "center", "end", "space-between"].map((justify) => (
                    <button 
                      key={justify}
                      className={`py-2 px-3 ${justifyContent === justify ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                      onClick={() => setJustifyContent(justify)}
                    >
                      {justify.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Align Content</label>
                <div className="grid grid-cols-2 gap-2">
                  {["start", "center", "end", "space-between"].map((align) => (
                    <button 
                      key={align}
                      className={`py-2 px-3 ${alignContent === align ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                      onClick={() => setAlignContent(align)}
                    >
                      {align.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Grid Items</h3>
              <p className="text-sm text-gray-300 mb-3">Modify number of grid items:</p>
              <div className="flex gap-2">
                <button 
                  className="py-2 px-4 bg-accent hover:bg-accent-hover rounded-md text-sm"
                  onClick={addGridItem}
                >
                  Add Item
                </button>
                <button 
                  className="py-2 px-4 bg-primary hover:bg-primary-light border border-gray-600 rounded-md text-sm"
                  onClick={removeGridItem}
                >
                  Remove Item
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code display */}
        <div className="px-6 pb-6">
          <div className="bg-code-bg rounded-lg p-4 code-display overflow-x-auto">
            <pre className="text-code-text font-mono text-sm whitespace-pre-wrap">
              {updateGridCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grid;
