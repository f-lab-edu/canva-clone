import ButtonList from "./components/buttons/ButtonList";
import Canvas from "./components/canvas/Canvas";

function App() {
  return (
    <div className="w-full h-[100vh] bg-gray-200 bg-opacity-100 flex flex-row">
      <ButtonList />
      <Canvas />
    </div>
  );
}

export default App;
