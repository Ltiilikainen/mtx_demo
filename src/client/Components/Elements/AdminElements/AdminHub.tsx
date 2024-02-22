import { Navigate, Route, Routes } from "react-router-dom";
import AdminHubNewsAddEdit from "./AdminHubNewsAddEdit";
import AdminNewsList from "./AdminNewsList";
import AdminHubReferrerAddEdit from "./AdminHubReferrerAddEdit";
import AdminRefList from "./AdminRefList";
import AdminMediaHub from "./AdminMediaHub";
import AdminMenu from "./AdminMenu";
import { useState } from "react";

export default function AdminHub() {
  const [menuClosed, setMenuClosed] = useState(true);

  return (
    <div className="flex h-full">
      <AdminMenu
        isClosed={menuClosed}
        setIsClosed={setMenuClosed}
      />
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
