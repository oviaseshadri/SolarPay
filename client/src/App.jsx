import { Navbar, Welcome, Footer, Services } from "./components";
import ElectricityBill from "./components/ElectricityBill";
import HelloWorld from "./components/HelloWorld/HelloWorld";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-services">
      <Navbar />
      <Welcome />
      <ElectricityBill />
    </div>
    <Services />
    <Footer />
  </div>
);

export default App;
