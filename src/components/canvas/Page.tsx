import DrawArea from "./DrawArea";
import PageHeader from "./PageHeader";

function Page() {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-y-2">
      <PageHeader />
      <DrawArea />
    </section>
  );
}

export default Page;
