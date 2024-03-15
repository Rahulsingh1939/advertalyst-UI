import "./App.css";
import Card from "./Components/Card";

function App() {
  return (
    <>
      <div className="h-32">
        <p className="text-5xl font-bold from-stone-900" style={{fontFamily:"SAMAN"}}>Weather App</p>
      </div>
      {/* grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-20 h-fit text-xl">
        {/* product cards */}
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}

export default App;
