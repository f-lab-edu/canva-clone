import Canvas from "./components/canvas/Canvas";
import useCanvas from "./components/canvas/Canvas.hooks";
import Palette from "./components/palette/Palette";

function App() {
  const {
    pageList,
    addPage,
    copyPageById,
    removePageById,
    getPageLength,
    updateTextBox,
    addTextBox,
  } = useCanvas();

  return (
    <div className="w-full h-[100vh] bg-gray-200 bg-opacity-100 flex flex-row">
      <Palette addTextBox={addTextBox} />
      <Canvas
        updateTextBox={updateTextBox}
        pageList={pageList}
        addPage={addPage}
        copyPageById={copyPageById}
        removePageById={removePageById}
        getPageLength={getPageLength}
      />
    </div>
  );
}

export default App;
