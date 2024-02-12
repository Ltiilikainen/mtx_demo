import { Link, Navigate, Route, Routes } from "react-router-dom";
import NewsPostForm from "./Elements/NewsPostForm";
import AdminHubNewsAddEdit from "./Elements/AdminHubNewsAddEdit";
import AdminNewsList from "./Elements/AdminNewsList";
import AdminHubReferrerAddEdit from "./Elements/AdminHubReferrerAddEdit";
import AdminRefList from "./Elements/AdminRefList";

export default function AdminHub() {
  return (
    <div className="flex h-full">
      <div className="flex flex-col border-r-[1px] border-r-slate-200 min-w-[30%] h-full">
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
          to={"referrer/"}
        >
          Add reference
        </Link>
        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"referrers/"}
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
            path="news/:id"
            element={<AdminHubNewsAddEdit />}
          />

          <Route
            path="news/"
            element={<AdminNewsList />}
          />

          <Route
            path="referrer/"
            element={<AdminHubReferrerAddEdit />}
          />

          <Route
            path="referrer/:id"
            element={<AdminHubReferrerAddEdit />}
          />

          <Route
            path="referrers/"
            element={<AdminRefList />}
          />
        </Routes>
      </div>
    </div>
  );
}
