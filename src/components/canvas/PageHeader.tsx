import Button from "../../cva/Button/Button";

function PageHeader() {
  return (
    <article className="w-[80%] flex flex-row justify-between">
      <h3>
        <span className="text-base">Page 1</span>
        <span className="text-sm text-gray-500"> - Add page title</span>
      </h3>
      <section className="flex flex-row gap-x-2">
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="/src/assets/page-paste.icon.svg"
          imgAlt="paste page icon"
          imgClassName="w-6 h-6 aspect-square"
        />
        <Button
          className="flex flex-col items-center justify-center gap-1"
          imgSrc="/src/assets/add-page.icon.svg"
          imgAlt="add page icon"
          imgClassName="w-6 h-6 aspect-square"
        />
      </section>
    </article>
  );
}

export default PageHeader;
