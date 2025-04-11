import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Typography = () => {
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [textAlign, setTextAlign] = useState("left");
  const [color, setColor] = useState("#1a365d");
  const [activeTab, setActiveTab] = useState("properties");
  const [textSample, setTextSample] = useState("The quick brown fox jumps over the lazy dog.");
  
  // Generate the CSS code based on current state
  const getTypographyCode = () => {
    return `.typography-sample {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}px;
  font-family: ${fontFamily};
  text-align: ${textAlign};
  color: ${color};
}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography</CardTitle>
        <CardDescription>
          Learn how CSS typography properties control text appearance and readability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Typography visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <div className="flex flex-col h-full">
                {/* Text sample */}
                <div className="mb-6">
                  <Label htmlFor="text-sample" className="mb-2 block text-sm">Sample Text</Label>
                  <Input
                    id="text-sample"
                    value={textSample}
                    onChange={(e) => setTextSample(e.target.value)}
                    placeholder="Enter sample text..."
                    className="resize-none"
                  />
                </div>
                
                {/* Text display */}
                <div 
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded flex-grow"
                >
                  <div 
                    style={{ 
                      fontSize: `${fontSize}px`,
                      fontWeight: fontWeight,
                      lineHeight: lineHeight,
                      letterSpacing: `${letterSpacing}px`,
                      fontFamily: fontFamily,
                      textAlign: textAlign as any,
                      color: color,
                    }}
                  >
                    {textSample || "The quick brown fox jumps over the lazy dog."}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls for typography */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid grid-cols-2">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Typography Properties</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">font-size: {fontSize}px</label>
                      </div>
                      <Slider 
                        value={[fontSize]} 
                        min={8} 
                        max={36} 
                        step={1}
                        onValueChange={(value) => setFontSize(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">font-weight: {fontWeight}</label>
                      </div>
                      <Slider 
                        value={[fontWeight]} 
                        min={100} 
                        max={900} 
                        step={100}
                        onValueChange={(value) => setFontWeight(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">line-height: {lineHeight}</label>
                      </div>
                      <Slider 
                        value={[lineHeight]} 
                        min={1} 
                        max={2.5} 
                        step={0.1}
                        onValueChange={(value) => setLineHeight(value[0])}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">letter-spacing: {letterSpacing}px</label>
                      </div>
                      <Slider 
                        value={[letterSpacing]} 
                        min={-2} 
                        max={10} 
                        step={0.5}
                        onValueChange={(value) => setLetterSpacing(value[0])}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">font-family</label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="'Inter', sans-serif">Inter (Sans-serif)</SelectItem>
                          <SelectItem value="serif">Serif</SelectItem>
                          <SelectItem value="monospace">Monospace</SelectItem>
                          <SelectItem value="'Fira Code', monospace">Fira Code (Monospace)</SelectItem>
                          <SelectItem value="cursive">Cursive</SelectItem>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">text-align</label>
                      <Select value={textAlign} onValueChange={setTextAlign}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select text alignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">left</SelectItem>
                          <SelectItem value="center">center</SelectItem>
                          <SelectItem value="right">right</SelectItem>
                          <SelectItem value="justify">justify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">color</label>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <Input
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          placeholder="#000000"
                          className="w-36"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="fundamentals">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Typography Fundamentals</h3>
                  
                  <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <h4 className="font-medium mb-1">Font Categories</h4>
                      <p><span className="font-semibold">Sans-serif:</span> Clean, modern fonts without decorative finishes (e.g., Arial, Helvetica).</p>
                      <p><span className="font-semibold">Serif:</span> Traditional fonts with small decorative lines (e.g., Times New Roman, Georgia).</p>
                      <p><span className="font-semibold">Monospace:</span> Fixed-width fonts where each character takes the same space (e.g., Courier, Consolas).</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Sizing Terminology</h4>
                      <p><span className="font-semibold">em:</span> Relative to the font-size of the element (2em = 2 times the size).</p>
                      <p><span className="font-semibold">rem:</span> Relative to font-size of the root element.</p>
                      <p><span className="font-semibold">px:</span> Pixels, a fixed-size unit.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Font Weight</h4>
                      <p>Ranges from 100 (thin) to 900 (extra black). 400 is normal, 700 is bold.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Line Height</h4>
                      <p>Controls vertical spacing between lines. Values between 1.4-1.6 are common for body text.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Generated CSS</h3>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700 text-sm overflow-x-auto">
                {getTypographyCode()}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Typography;