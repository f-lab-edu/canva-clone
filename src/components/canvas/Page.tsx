import { PageType } from "../../type/page.type";
import DrawArea from "./DrawArea";
import PageHeader from "./PageHeader";

interface PageProps {
  page: PageType;
}

function Page({ page }: PageProps) {
  return (
    <article className="w-full flex flex-col justify-center items-center gap-y-2">
      <PageHeader page={page} />
      <DrawArea page={page} />
    </article>
  );
}

export default Page;
