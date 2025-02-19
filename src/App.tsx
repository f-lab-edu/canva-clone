import Canvas from "./components/canvas/Canvas";
import ColorPicker from "./components/colorPicker/ColorPicker";
import Header from "./components/header/Header";
import Palette from "./components/palette/Palette";

function App() {
  return (
    <div className="w-full min-h-[100vh] overflow-hidden bg-gray-200 ">
      <Header />
      <div className="bg-gray-200 w-full h-[91vh] overflow-hidden flex flex-row">
        <Palette />
        <Canvas />
      </div>
      <ColorPicker />
    </div>
  );
}

export default App;
