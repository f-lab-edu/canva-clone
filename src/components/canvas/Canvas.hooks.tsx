import { useState } from "react";

function useCanvas() {
  const [pageList, setPageList] = useState([]);

  return { pageList };
}

export default useCanvas;
