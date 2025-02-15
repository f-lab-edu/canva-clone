import { LuRedo2, LuUndo2 } from "react-icons/lu";
import useHistory from "../../hook/History.hook";

function Header() {
  const { historyProcess, redoHistory, undoHistory } = useHistory();

  const handleClickUndo = () => historyProcess(true);
  const handleClickRedo = () => historyProcess(false);

  return (
    <section className="bg-white w-full h-16 px-7 flex flex-row justify-start items-center gap-x-10">
      <h1 className="font-bold font-serif text-2xl">Caraphic</h1>
      <article className="flex flex-row gap-x-5">
        <button onClick={handleClickUndo}>
          <LuUndo2
            size={30}
            className={`border p-1 rounded-md border-black ${
              undoHistory.length === 0 ? "opacity-25" : ""
            }`}
          />
        </button>
        <button onClick={handleClickRedo}>
          <LuRedo2
            size={30}
            className={`border p-1 rounded-md border-black ${
              redoHistory.length === 0 ? "opacity-25" : ""
            }`}
          />
        </button>
      </article>
    </section>
  );
}

export default Header;
