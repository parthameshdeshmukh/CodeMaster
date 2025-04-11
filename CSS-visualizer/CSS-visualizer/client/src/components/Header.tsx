import { Link } from "wouter";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary-dark border-b border-gray-700 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="ri-css3-fill text-2xl text-accent"></i>
          <h1 className="text-xl font-bold">CSS Learning Playground</h1>
        </div>
        <nav>
          <ul className="flex space-x-1 md:space-x-4 text-sm items-center">
            <li><a href="#box-model" className="px-2 py-1 rounded hover:bg-primary-light">Box Model</a></li>
            <li><a href="#flexbox" className="px-2 py-1 rounded hover:bg-primary-light">Flexbox</a></li>
            <li><a href="#grid" className="px-2 py-1 rounded hover:bg-primary-light">Grid</a></li>
            <li><a href="#positioning" className="px-2 py-1 rounded hover:bg-primary-light">Positioning</a></li>
            <li><a href="#z-index" className="px-2 py-1 rounded hover:bg-primary-light">Z-Index</a></li>
            <li><a href="#transform" className="px-2 py-1 rounded hover:bg-primary-light">Transform</a></li>
            <li><a href="/code-on" className="ml-4 px-4 py-2 bg-accent rounded-full hover:bg-accent-hover">CodeOn</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
