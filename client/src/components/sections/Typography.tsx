import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Typography = () => {
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [textAlign, setTextAlign] = useState("left");
  
  const getTypographyCode = () => {
    return `.text-element {
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing}px;
  font-family: ${fontFamily};
  text-align: ${textAlign};
}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Typography</CardTitle>
        <CardDescription>
          Learn how typography properties affect text appearance and readability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Typography visualization */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 overflow-auto">
            <div 
              className="w-full min-h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
            >
              <h2
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  fontFamily: fontFamily,
                  textAlign: textAlign as any
                }}
                className="mb-4 text-gray-900 dark:text-gray-100"
              >
                Typography Example Heading
              </h2>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  lineHeight: lineHeight,
                  letterSpacing: `${letterSpacing}px`,
                  fontFamily: fontFamily,
                  textAlign: textAlign as any
                }}
                className="text-gray-700 dark:text-gray-300"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
              </p>
            </div>
          </div>
          
          {/* Controls for typography */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Typography Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">font-size: {fontSize}px</label>
                  </div>
                  <Slider 
                    value={[fontSize]} 
                    min={12} 
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
                  <label className="block text-sm font-medium mb-1">font-family</label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="'Inter', sans-serif">Inter (Sans-serif)</SelectItem>
                      <SelectItem value="'Fira Code', monospace">Fira Code (Monospace)</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="cursive">Cursive</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">text-align</label>
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
              </div>
            </div>
            
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