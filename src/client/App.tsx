import { Route, Routes } from "react-router-dom";
/*Pages*/
import IndexPage from "./Components/IndexPage";
import NewsFeed from "./Components/NewsFeed";
import References from "./Components/References";
import Contact from "./Components/Contact";
import About from "./Components/About";
import NavBar from "./Components/TopNav/NavBar";
import NotFound from "./Components/NotFound";
import NewsItem from "./Components/Elements/NewsItem";
import AdminHub from "./Components/AdminHub";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div
        id="main"
        className="h-[91%] w-full overflow-y-auto "
      >
        <Routes>
          <Route
            path="/"
            element={<IndexPage />}
          />
          <Route
            path="/news/*"
            element={<NewsFeed />}
          />
          <Route
            path="/news/:id"
            element={<NewsItem />}
          />
          <Route
            path="/references"
            element={<References />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/adminhub/*"
            element={<AdminHub />}
          />
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
