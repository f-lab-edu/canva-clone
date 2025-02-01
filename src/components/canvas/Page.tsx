import { PageType } from "../../type/page.type";
import DrawArea from "./DrawArea";
import PageHeader from "./PageHeader";

interface PageProps {
  page: PageType;
}

function Page({ page }: PageProps) {
  return (
    <article className="min-w-[80%] max-w-[90%] flex flex-col justify-center items-center gap-y-2">
      <PageHeader page={page} />
      <DrawArea page={page} />
    </article>
  );
}

export default Page;
