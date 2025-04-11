import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoxModel from "@/components/sections/BoxModel";
import Flexbox from "@/components/sections/Flexbox";
import Grid from "@/components/sections/Grid";
import Positioning from "@/components/sections/Positioning";
import ZIndex from "@/components/sections/ZIndex";
import Transform from "@/components/sections/Transform";
import Transitions from "@/components/sections/Transitions";
import Typography from "@/components/sections/Typography";

const Home = () => {
  return (
    <div className="bg-primary-dark text-gray-100 font-sans min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Introduction section */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Learn CSS Without Coding</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Interactive visualizations to help you understand essential CSS concepts. 
            Adjust controls to see how properties affect elements in real-time.
          </p>
        </section>

        <BoxModel />
        <Flexbox />
        <Grid />
        <Positioning />
        <ZIndex />
        <Transform />
        <Transitions />
        <Typography />
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;
