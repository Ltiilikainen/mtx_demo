import { Link, Navigate, Route, Routes } from "react-router-dom";
import AdminHubNewsAddEdit from "./AdminHubNewsAddEdit";
import AdminNewsList from "./AdminNewsList";
import AdminHubReferrerAddEdit from "./AdminHubReferrerAddEdit";
import AdminRefList from "./AdminRefList";
import AdminMediaHub from "./AdminMediaHub";
import ColumnWrapper from "../Wrappers/ColumnWrapper";

export default function AdminHub() {
  return (
    <div className="flex h-full">
      <ColumnWrapper className="border-r-[1px] border-r-slate-200 min-w-[30%] h-full">
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

        <Link
          className="p-4 border-b-[1px] border-b-slate-200"
          to={"media/"}
        >
          Manage media
        </Link>
      </ColumnWrapper>
      <div className="h-[95%] flex-grow my-6 mx-auto">
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

          <Route
            path="media/"
            element={<AdminMediaHub />}
          />
        </Routes>
      </div>
    </div>
  );
}
