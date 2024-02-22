import { Link } from "react-router-dom";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

import useBreakpoint from "../../../Hooks/useBreakpoint";
import MaterialSymbolsChevronRight from "../../Icons/MaterialSymbolsChevronRight";
import MaterialSymbolsCloseRounded from "../../Icons/MaterialSymbolsCloseRounded";

type AdminMenuProps = {
  isClosed: boolean;
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminMenu({ isClosed, setIsClosed }: AdminMenuProps) {
  const { isSm } = useBreakpoint("sm");

  if (!isSm && isClosed) {
    return (
      <ColumnWrapper className="border-r-[1px] border-r-slate-200 min-w-[5%] h-full ease-in-out duration-150">
        <MaterialSymbolsChevronRight
          className="cursor-pointer text-xl"
          onClick={() => setIsClosed(false)}
        />
      </ColumnWrapper>
    );
  }

  //text-nowrap and line-clamp-1 for smoother transition animation
  return (
    <ColumnWrapper className="border-r-[1px] border-r-slate-200 min-w-[30%] h-full ease-in-out duration-150">
      {!isSm && (
        <MaterialSymbolsCloseRounded
          className="cursor-pointer self-end text-lg"
          onClick={() => setIsClosed(true)}
        />
      )}
      <Link
        className={`p-4 ${
          !isSm && "border-t-[1px]"
        } border-b-[1px] border-b-slate-200 text-nowrap line-clamp-1`}
        to={"news/add"}
      >
        Add news
      </Link>
      <Link
        className="p-4 border-b-[1px] border-b-slate-200 text-nowrap line-clamp-1"
        to={"news"}
      >
        Manage news
      </Link>
      <Link
        className="p-4 border-b-[1px] border-b-slate-200 text-nowrap line-clamp-1"
        to={"referrer/"}
      >
        Add reference
      </Link>
      <Link
        className="p-4 border-b-[1px] border-b-slate-200 text-nowrap line-clamp-1"
        to={"referrers/"}
      >
        Manage references
      </Link>

      <Link
        className="p-4 border-b-[1px] border-b-slate-200 text-nowrap line-clamp-1"
        to={"media/"}
      >
        Manage media
      </Link>
    </ColumnWrapper>
  );
}
