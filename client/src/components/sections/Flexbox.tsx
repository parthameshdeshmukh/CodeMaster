import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Flexbox = () => {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [flexWrap, setFlexWrap] = useState("nowrap");
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    if (items.length < 8) {
      setItems([...items, items.length + 1]);
    }
  };

  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  const getFlexboxCode = () => {
    return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flexbox</CardTitle>
        <CardDescription>
          Learn how items align and distribute in a flexible container.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Flexbox visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg h-[400px] flex p-2"
              style={{
                flexDirection: flexDirection as any,
                justifyContent: justifyContent,
                alignItems: alignItems,
                flexWrap: flexWrap as any
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex-item bg-blue-500 dark:bg-blue-600 text-white p-4 m-1 rounded-md flex items-center justify-center min-w-16 min-h-16">
                  Item {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls for flexbox */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Container Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">flex-direction</label>
                  <Select value={flexDirection} onValueChange={setFlexDirection}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
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
                  <label className="block text-sm font-medium mb-1">justify-content</label>
                  <Select value={justifyContent} onValueChange={setJustifyContent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select justification" />
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
                  <label className="block text-sm font-medium mb-1">align-items</label>
                  <Select value={alignItems} onValueChange={setAlignItems}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select alignment" />
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
                  <label className="block text-sm font-medium mb-1">flex-wrap</label>
                  <Select value={flexWrap} onValueChange={setFlexWrap}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wrap behavior" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">nowrap</SelectItem>
                      <SelectItem value="wrap">wrap</SelectItem>
                      <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Items</h3>
              <div className="flex gap-2">
                <Button onClick={addItem} disabled={items.length >= 8} size="sm">Add Item</Button>
                <Button onClick={removeItem} disabled={items.length <= 1} variant="outline" size="sm">Remove Item</Button>
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