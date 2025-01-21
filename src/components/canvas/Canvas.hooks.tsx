import { useState } from "react";
import { PageType } from "../../type/page";

const firstPage = {
  id: Date.now(),
  title: "Page 1",
};

function useCanvas() {
  const [pageList, setPageList] = useState<PageType[]>([firstPage]);

  const addPage = (page: PageType | null) => {
    let newPage = null;

    if (!page) {
      const regex = /[^0-9]/g;
      newPage = {
        id: Date.now(),
        title: `Page ${
          Number(pageList[pageList.length - 1].title.replace(regex, "")) + 1
        }`,
      };
    } else newPage = page;

    setPageList((prevPageList) => [...prevPageList, newPage]);
  };
  const copyPageById = (pastePageId: number) => {
    const targetPage = getPageById(pastePageId);

    const pastePage = {
      ...targetPage,
      title: `copyed ${targetPage.title}`,
    };

    addPage(pastePage);
  };
  const getPageById = (id: number) =>
    pageList.filter((page) => page.id === id)[0];

  const removePageById = (id: number) =>
    setPageList((prevPageList) =>
      prevPageList.filter((page) => page.id !== id)
    );

  const getPageLength = () => pageList.length;

  return { pageList, addPage, copyPageById, removePageById, getPageLength };
}

export default useCanvas;
