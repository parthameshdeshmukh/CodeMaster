import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Grid = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(10);
  const [templateColumns, setTemplateColumns] = useState("1fr 1fr 1fr");
  const [templateRows, setTemplateRows] = useState("1fr 1fr 1fr");
  
  const updateGridCode = () => {
    return `.grid-container {
  display: grid;
  grid-template-columns: ${templateColumns};
  grid-template-rows: ${templateRows};
  gap: ${gap}px;
}`;
  };

  const generateGridItems = () => {
    const items = [];
    for (let i = 0; i < columns * rows; i++) {
      items.push(
        <div 
          key={i} 
          className="bg-purple-500 dark:bg-purple-600 text-white p-4 rounded-md flex items-center justify-center"
        >
          Item {i + 1}
        </div>
      );
    }
    return items;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSS Grid</CardTitle>
        <CardDescription>
          Learn how grid layout works with columns, rows, and gap properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grid visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg min-h-[400px] p-4 grid"
              style={{
                gridTemplateColumns: templateColumns,
                gridTemplateRows: templateRows,
                gap: `${gap}px`,
              }}
            >
              {generateGridItems()}
            </div>
          </div>
          
          {/* Controls for grid */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Grid Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Columns: {columns}</label>
                  <Slider 
                    value={[columns]} 
                    min={1} 
                    max={6} 
                    step={1}
                    onValueChange={(value) => {
                      setColumns(value[0]);
                      setTemplateColumns(Array(value[0]).fill("1fr").join(" "));
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Rows: {rows}</label>
                  <Slider 
                    value={[rows]} 
                    min={1} 
                    max={6} 
                    step={1}
                    onValueChange={(value) => {
                      setRows(value[0]);
                      setTemplateRows(Array(value[0]).fill("1fr").join(" "));
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Gap: {gap}px</label>
                  <Slider 
                    value={[gap]} 
                    min={0} 
                    max={30} 
                    step={1}
                    onValueChange={(value) => setGap(value[0])}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Column Template</label>
                  <Select 
                    value={templateColumns}
                    onValueChange={setTemplateColumns}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1fr 1fr 1fr">Equal (1fr 1fr 1fr)</SelectItem>
                      <SelectItem value="2fr 1fr 1fr">First larger (2fr 1fr 1fr)</SelectItem>
                      <SelectItem value="1fr 2fr 1fr">Middle larger (1fr 2fr 1fr)</SelectItem>
                      <SelectItem value="100px 1fr 100px">Fixed sides (100px 1fr 100px)</SelectItem>
                      <SelectItem value="repeat(3, 1fr)">Repeat (repeat(3, 1fr))</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {updateGridCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Grid;