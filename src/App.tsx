import Canvas from "./components/canvas/Canvas";
import Palette from "./components/palette/Palette";

function App() {
  return (
    <div className="w-full h-[100vh] bg-gray-200 bg-opacity-100 flex flex-row">
      <Palette />
      <Canvas />
    </div>
  );
}

export default App;
