import { PageType } from "../../type/page.type";
import PageBody from "./PageBody";
import PageHeader from "./PageHeader";

interface PageProps {
  page: PageType;
}

function Page({ page }: PageProps) {
  return (
    <article className="min-w-[80%] max-w-[90%] flex flex-col justify-center items-center gap-y-2">
      <PageHeader page={page} />
      <PageBody page={page} />
    </article>
  );
}

export default Page;
