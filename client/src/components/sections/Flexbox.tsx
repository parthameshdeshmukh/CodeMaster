import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Flexbox = () => {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [gap, setGap] = useState(10);
  
  // Generate the CSS code based on current state
  const getFlexboxCode = () => {
    return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flexbox</CardTitle>
        <CardDescription>
          Learn how CSS Flexbox works with containers and items for layout.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Flexbox visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <div 
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded"
                style={{ 
                  display: 'flex',
                  flexDirection: flexDirection as any,
                  justifyContent: justifyContent,
                  alignItems: alignItems,
                  flexWrap: flexWrap as any,
                  gap: `${gap}px`,
                  minHeight: '300px'
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`flex items-center justify-center p-4 text-lg font-medium bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded`}
                    style={{ 
                      width: '80px',
                      height: i % 3 === 0 ? '120px' : i % 3 === 1 ? '80px' : '100px'
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Controls for flexbox */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Flexbox Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">flex-direction</label>
                  <Select value={flexDirection} onValueChange={setFlexDirection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flex direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">row</SelectItem>
                      <SelectItem value="row-reverse">row-reverse</SelectItem>
                      <SelectItem value="column">column</SelectItem>
                      <SelectItem value="column-reverse">column-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">justify-content</label>
                  <Select value={justifyContent} onValueChange={setJustifyContent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select justify content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="space-between">space-between</SelectItem>
                      <SelectItem value="space-around">space-around</SelectItem>
                      <SelectItem value="space-evenly">space-evenly</SelectItem>
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
                      <SelectItem value="flex-start">flex-start</SelectItem>
                      <SelectItem value="flex-end">flex-end</SelectItem>
                      <SelectItem value="center">center</SelectItem>
                      <SelectItem value="baseline">baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">flex-wrap</label>
                  <Select value={flexWrap} onValueChange={setFlexWrap}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flex wrap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">nowrap</SelectItem>
                      <SelectItem value="wrap">wrap</SelectItem>
                      <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">gap: {gap}px</label>
                  </div>
                  <Slider 
                    value={[gap]} 
                    min={0} 
                    max={40} 
                    step={5}
                    onValueChange={(value) => setGap(value[0])}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getFlexboxCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Flexbox;