import { Link, Navigate, Route, Routes } from "react-router-dom";
import NewsPostForm from "./Elements/NewsPostForm";
import AdminHubNewsAddEdit from "./Elements/AdminHubNewsAddEdit";
import AdminNewsList from "./Elements/AdminNewsList";

export default function AdminHub() {
  return (
    <div className="flex">
      <div className="flex flex-col border-r-[1px] border-r-slate-200 min-w-[30%]">
        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"news/add"}
        >
          Add news
        </Link>
        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"news"}
        >
          Manage news
        </Link>
        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"/"}
        >
          Add reference
        </Link>
        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"/"}
        >
          Manage references
        </Link>
      </div>
      <div className="h-full flex-grow overflow-y-auto my-6 mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={"news/add"}
                replace={true}
              />
            }
          />
          <Route
            index
            path="news/add"
            element={<AdminHubNewsAddEdit />}
          />
          <Route
            index
            path="news/:id"
            element={<AdminHubNewsAddEdit />}
          />

          <Route
            index
            path="news/"
            element={<AdminNewsList />}
          />
        </Routes>
      </div>
    </div>
  );
}
