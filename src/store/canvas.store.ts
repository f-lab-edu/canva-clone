import { create } from "zustand";
import { Element } from "../type/element.type";
import { PageType } from "../type/page.type";

interface CanvasStoreType {
  pageList: PageType[];
  currentPageId: number | null;
  setCurrentPageId: (pageId: number) => void;
  currentElementId: number | null;
  setCurrentElementId: (elementId: number) => void;
  addPage: (page: PageType | null) => PageType | null;
  copyPageById: (pageId: number) => PageType | null;
  removePage: (page: PageType) => void;
  updatePage: (page: PageType) => void;
  addElement: (element: Element) => void;
  updateElement: (element: Element) => void;
  removeElement: (element: Element) => void;
  getElementById: (elementId: number) => Element | null;
  getPageById: (pageId: number) => PageType | null;
}

export const useCanvasStore = create<CanvasStoreType>((set) => ({
  pageList: [
    {
      id: Date.now(),
      elements: [],
      title: "Page 1",
    },
  ],
  currentPageId: null,
  currentElementId: null,
  setCurrentPageId: (pageId: number) => set({ currentPageId: pageId }),
  setCurrentElementId: (elementId: number) =>
    set({ currentElementId: elementId }),
  addPage: (page: PageType | null) => {
    let newPage = null;
    set((state) => {
      newPage = page
        ? page
        : {
            id: Date.now(),
            elements: [],
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
  addElement: (element: Element) =>
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== element.pageId) return page;

        return {
          ...page,
          elements: [...page.elements, element],
        };
      }),
    })),
  updateElement: (element: Element) => {
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== element.pageId) return page;

        const updatedElements = page.elements.map((textBox) => {
          if (textBox.id !== element.id) return textBox;

          return element;
        });

        return {
          ...page,
          elements: updatedElements,
        };
      }),
    }));
  },
  removeElement: (element: Element) =>
    set((state) => ({
      pageList: state.pageList.map((page) => {
        if (page.id !== element.pageId) return page;

        const removedElements = page.elements.filter(
          (textBox) => textBox.id !== element.id
        );

        return {
          ...page,
          elements: removedElements,
        };
      }),
    })),
  getElementById: (elementId: number) => {
    let responseElement: Element | null = null;

    set((state) => {
      state.pageList.forEach((page) => {
        responseElement = page.elements.filter(
          (element) => element.id === elementId
        )[0];
      });

      return state;
    });

    return responseElement;
  },
  getPageById: (pageId: number) => {
    let responsePage: PageType | null = null;
    set((state) => {
      responsePage = state.pageList.filter((page) => page.id === pageId)[0];

      return state;
    });

    return responsePage;
  },
}));
