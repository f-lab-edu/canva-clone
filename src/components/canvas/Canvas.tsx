import useCanvas from "./Canvas.hooks";
import Page from "./Page";

function Canvas() {
  const { pageList } = useCanvas();

  return (
    <>
      {pageList.map(() => (
        <Page />
      ))}
    </>
  );
}

export default Canvas;
