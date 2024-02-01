import { Route, Routes } from "react-router-dom";
/*Pages*/
import IndexPage from "./Components/IndexPage";
import NewsFeed from "./Components/NewsFeed";
import References from "./Components/References";
import Contact from "./Components/Contact";
import About from "./Components/About";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<IndexPage />}
        />
        <Route
          path="/news"
          element={<NewsFeed />}
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
      </Routes>
    </div>
  );
}

export default App;
