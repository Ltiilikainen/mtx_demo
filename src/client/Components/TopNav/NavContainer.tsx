import { useState } from "react";
import useBreakpoint from "../../Hooks/useBreakpoint";
import TopLink from "./TopLink";
import MaterialSymbolsCloseRounded from "../Icons/MaterialSymbolsCloseRounded";

export default function NavContainer() {
  const { isMd } = useBreakpoint("md");

  const [showNav, setShowNav] = useState(false);

  if (isMd) {
    return (
      <div className="flex gap-4 justify-end flex-grow mr-4">
        <TopLink
          to="/"
          text="Home"
        />
        <TopLink
          to="/news"
          text="News"
        />
        <TopLink
          to="/references"
          text="References"
        />
        <TopLink
          to="/about"
          text="About"
        />
        <TopLink
          to="/contact"
          text="Contact"
        />
      </div>
    );
  }

  return (
    <div className="flex-grow ">
      <div className="flex justify-end">
        <p
          className="px-4  cursor-pointer"
          onClick={() => setShowNav(true)}
        >
          Menu
        </p>
      </div>
      {showNav && (
        <div
          className="w-full h-full absolute top-0 left-0 flex flex-col gap-2 p-2 bg-white z-[99]"
          onClick={() => setShowNav(false)}
        >
          <div className="flex justify-end text-black cursor-pointer">
            <MaterialSymbolsCloseRounded />
          </div>
          <TopLink to="/">
            <h4>Home</h4>
          </TopLink>
          <TopLink to="/news">
            <h4>News</h4>
          </TopLink>
          <TopLink to="/references">
            <h4>References</h4>
          </TopLink>
          <TopLink to="/about">
            <h4>About</h4>
          </TopLink>
          <TopLink to="/contact">
            <h4>Contact</h4>
          </TopLink>
        </div>
      )}
    </div>
  );
}
