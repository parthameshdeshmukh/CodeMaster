import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Grid = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(10);
  const [justifyItems, setJustifyItems] = useState("stretch");
  const [alignItems, setAlignItems] = useState("stretch");
  
  // Generate the CSS code based on current state
  const getGridCode = () => {
    return `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Grid</CardTitle>
        <CardDescription>
          Learn how CSS Grid works with rows, columns, and grid areas for complex layouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grid visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <div 
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded"
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                  gap: `${gap}px`,
                  justifyItems: justifyItems,
                  alignItems: alignItems,
                  minHeight: '300px'
                }}
              >
                {Array.from({ length: columns * rows }).map((_, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-center p-4 text-lg font-medium bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded`}
                    style={{ 
                      // Apply different min-heights to make alignment effects visible
                      minHeight: i % 3 === 0 ? '80px' : i % 3 === 1 ? '60px' : '40px'
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Controls for grid */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Grid Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">grid-template-columns: repeat({columns}, 1fr)</label>
                  </div>
                  <Slider 
                    value={[columns]} 
                    min={1} 
                    max={6} 
                    step={1}
                    onValueChange={(value) => setColumns(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">grid-template-rows: repeat({rows}, 1fr)</label>
                  </div>
                  <Slider 
                    value={[rows]} 
                    min={1} 
                    max={4} 
                    step={1}
                    onValueChange={(value) => setRows(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">gap: {gap}px</label>
                  </div>
                  <Slider 
                    value={[gap]} 
                    min={0} 
                    max={30} 
                    step={5}
                    onValueChange={(value) => setGap(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">justify-items</label>
                  <Select value={justifyItems} onValueChange={setJustifyItems}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select justify items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="start">start</SelectItem>
                      <SelectItem value="end">end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">align-items</label>
                  <Select value={alignItems} onValueChange={setAlignItems}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select align items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stretch">stretch</SelectItem>
                      <SelectItem value="start">start</SelectItem>
                      <SelectItem value="end">end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getGridCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Grid;