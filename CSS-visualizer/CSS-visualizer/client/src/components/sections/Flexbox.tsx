import { useState } from "react";

const Flexbox = () => {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [items, setItems] = useState([1, 2, 3, 4]);

  const addFlexItem = () => {
    setItems([...items, items.length + 1]);
  };

  const removeFlexItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  const updateFlexboxCode = () => {
    return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
}`;
  };

  return (
    <section id="flexbox" className="mb-16">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-primary-light border-b border-gray-700">
          <h2 className="text-2xl font-bold flex items-center">
            <i className="ri-layout-row-line mr-2"></i> Flexbox
          </h2>
          <p className="text-gray-300 mt-1">Learn how items align and distribute in a flexible container.</p>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Flexbox visualization */}
          <div className="bg-primary-light p-4 rounded-lg">
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg h-96 flex p-2"
              style={{
                flexDirection: flexDirection as any,
                justifyContent: justifyContent,
                alignItems: alignItems,
                flexWrap: flexWrap as any
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex-item bg-accent text-white p-4 m-1 rounded-md flex items-center justify-center">
                  Item {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls for flexbox */}
          <div className="space-y-6">
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Container Properties</h3>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Flex Direction</label>
                <div className="grid grid-cols-2 gap-2">
                  {["row", "column", "row-reverse", "column-reverse"].map((direction) => (
                    <button 
                      key={direction}
                      className={`py-2 px-3 ${flexDirection === direction ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                      onClick={() => setFlexDirection(direction)}
                    >
                      {direction.charAt(0).toUpperCase() + direction.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Justify Content</label>
                <div className="grid grid-cols-2 gap-2">
                  {["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"].map((justify) => (
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
              
              <div className="mb-4">
                <label className="block text-sm mb-2">Align Items</label>
                <div className="grid grid-cols-2 gap-2">
                  {["stretch", "flex-start", "flex-end", "center", "baseline"].map((align) => (
                    <button 
                      key={align}
                      className={`py-2 px-3 ${alignItems === align ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                      onClick={() => setAlignItems(align)}
                    >
                      {align.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Flex Wrap</label>
                <div className="grid grid-cols-2 gap-2">
                  {["nowrap", "wrap", "wrap-reverse"].map((wrap) => (
                    <button 
                      key={wrap}
                      className={`py-2 px-3 ${flexWrap === wrap ? 'bg-accent' : 'bg-primary hover:bg-primary-light border border-gray-600'} rounded-md text-sm`}
                      onClick={() => setFlexWrap(wrap)}
                    >
                      {wrap === "nowrap" ? "No Wrap" : wrap.charAt(0).toUpperCase() + wrap.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-primary-light p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Item Properties</h3>
              <div className="mb-4">
                <label className="block text-sm mb-2">Add/Remove Items</label>
                <div className="flex gap-2">
                  <button 
                    className="py-2 px-4 bg-accent hover:bg-accent-hover rounded-md text-sm"
                    onClick={addFlexItem}
                  >
                    Add Item
                  </button>
                  <button 
                    className="py-2 px-4 bg-primary hover:bg-primary-light border border-gray-600 rounded-md text-sm"
                    onClick={removeFlexItem}
                  >
                    Remove Item
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
              {updateFlexboxCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flexbox;
