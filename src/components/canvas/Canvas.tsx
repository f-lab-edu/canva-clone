function Canvas() {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-y-2">
      <article className="w-[80%] flex flex-row justify-between">
        <h3>
          <span className="text-base">Page 1</span>
          <span className="text-sm text-gray-500"> - Add page title</span>
        </h3>
        <section className="flex flex-row gap-x-2">
          <button className="flex flex-col items-center justify-center gap-1">
            <img
              className="w-6 h-6 aspect-square"
              src="/src/assets/page-paste.icon.svg"
              alt="paste page icon"
            />
          </button>
          <button className="flex flex-col items-center justify-center gap-1">
            <img
              className="w-6 h-6 aspect-square"
              src="/src/assets/add-page.icon.svg"
              alt="add page icon"
            />
          </button>
        </section>
      </article>
      <article className="w-[80%] aspect-video bg-white"></article>
    </section>
  );
}

export default Canvas;
