import { create } from "zustand";
import { TextBoxType } from "../type/element.type";
import { PageType } from "../type/page.type";

interface CanvasStoreType {
  pageList: PageType[];
  addPage: (page: PageType | null) => PageType | null;
  copyPageById: (pageId: number) => PageType | null;
  removePage: (page: PageType) => void;
  updatePage: (page: PageType) => void;
  addTextBox: (pageId: number, textBox: TextBoxType) => void;
  updateTextBox: (pageId: number, textBox: TextBoxType) => void;
  removeTextBox: (pageId: number, textBox: TextBoxType) => void;
}

export const useCanvasStore = create<CanvasStoreType>((set) => ({
  pageList: [
    {
      id: 123,
      textBoxs: [],
      title: "Page 1",
    },
  ],
  addPage: (page: PageType | null) => {
    let newPage = null;
    set((state) => {
      newPage = page
        ? page
        : {
            id: Date.now(),
            textBoxs: [],
            title: `Page ${
              Number(
                state.pageList[state.pageList.length - 1].title.replace(
                  /[^0-9]/g,
                  ""
                )
              ) + 1
            }`,
          };

      return {
        pageList: [...state.pageList, newPage],
      };
    });
    return newPage;
  },
  copyPageById: (pageId: number) => {
    let pastePage = null;
    set((state) => {
      const targetPage = state.pageList.filter((page) => page.id === pageId)[0];

      pastePage = {
        ...targetPage,
        id: Date.now(),
        title: `copyed ${targetPage.title}`,
      };

      return { pageList: [...state.pageList, pastePage] };
    });
    return pastePage;
  },
  removePage: (targetPage: PageType) =>
    set((state) => ({
      pageList: state.pageList.filter((page) => page.id !== targetPage.id),
    })),
  updatePage: (targetPage: PageType) =>
    set((state) => ({
      pageList: [
        ...state.pageList.map((page) => {
          if (page.id === targetPage.id) return targetPage;

          return page;
        }),
      ],
    })),
  addTextBox: (pageId: number, textBox: TextBoxType) =>
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== pageId) return page;

        return {
          ...page,
          textBoxs: [...page.textBoxs, textBox],
        };
      }),
    })),
  updateTextBox: (pageId: number, targetTextBox: TextBoxType) => {
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== pageId) return page;

        const updatedTextBox = page.textBoxs.map((textBox) => {
          if (textBox.id !== targetTextBox.id) return textBox;

          return targetTextBox;
        });

        return {
          ...page,
          textBoxs: updatedTextBox,
        };
      }),
    }));
  },
  removeTextBox: (pageId: number, targetTextBox: TextBoxType) =>
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== pageId) return page;

        const removedTextBox = page.textBoxs.filter(
          (textBox) => textBox.id !== targetTextBox.id
        );

        return {
          ...page,
          textBoxs: removedTextBox,
        };
      }),
    })),
}));
