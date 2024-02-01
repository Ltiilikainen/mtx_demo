import { useState } from "react";
import useBreakpoint from "../../Hooks/useBreakpoint";
import NavLink from "./NavLink";
import MaterialSymbolsCloseRounded from "../Icons/MaterialSymbolsCloseRounded";

export default function NavContainer() {
  const { isMd } = useBreakpoint("md");

  const [showNav, setShowNav] = useState(false);

  if (isMd) {
    return (
      <div className="flex gap-4 justify-end flex-grow mr-4">
        <NavLink
          to="/"
          text="Home"
        />
        <NavLink
          to="/news"
          text="News"
        />
        <NavLink
          to="/references"
          text="References"
        />
        <NavLink
          to="/about"
          text="About"
        />
        <NavLink
          to="/contact"
          text="Contact"
        />
      </div>
    );
  }

  return (
    <div className="flex-grow ">
      <div
        className="flex justify-end mr-4 cursor-pointer"
        onClick={() => setShowNav(true)}
      >
        <p>Menu</p>
      </div>
      {showNav && (
        <div
          className="w-full h-full absolute top-0 left-0 flex flex-col gap-2 p-2 bg-white"
          onClick={() => setShowNav(false)}
        >
          <div className="flex justify-end text-black cursor-pointer">
            <MaterialSymbolsCloseRounded />
          </div>
          <NavLink to="/">
            <h4>Home</h4>
          </NavLink>
          <NavLink to="/news">
            <h4>News</h4>
          </NavLink>
          <NavLink to="/references">
            <h4>References</h4>
          </NavLink>
          <NavLink to="/about">
            <h4>About</h4>
          </NavLink>
          <NavLink to="/contact">
            <h4>Contact</h4>
          </NavLink>
        </div>
      )}
    </div>
  );
}
