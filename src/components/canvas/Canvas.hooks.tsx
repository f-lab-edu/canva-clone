import { useState } from "react";
import { PageType } from "../../type/page";
import { TextBoxType } from "../../type/textBox";

const firstPage = {
  id: 123,
  title: "Page 1",
  textBoxs: [],
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
        textBoxs: [],
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

  const addTextBox = (pageId: number, newTextBox: TextBoxType) => {
    setPageList((prevPageList) =>
      prevPageList.map((page) => {
        if (page.id !== pageId) return page;

        return {
          ...page,
          textBoxs: [...page.textBoxs, newTextBox],
        };
      })
    );
  };
  const updateTextBox = (pageId: number, textBox: TextBoxType) => {
    setPageList((prevPageList) =>
      prevPageList.map((page) => {
        if (page.id !== pageId) return page;

        const updatedTextBoxs = page.textBoxs.map((prevTextBox) => {
          if (prevTextBox.id !== textBox.id) return prevTextBox;

          return textBox;
        });

        return {
          ...page,
          textBoxs: updatedTextBoxs,
        };
      })
    );
  };

  return {
    pageList,
    addPage,
    copyPageById,
    removePageById,
    getPageLength,
    updateTextBox,
    addTextBox,
  };
}

export default useCanvas;
