import React from "react";
import { NavLink } from "react-router-dom";
// import { BsChevronDown, BsChevronUp } from "react-icons/bs";
const navbar = [
  { page: "Home", href: "/" },
  { page: "Post", href: "/posts" },
  { page: "New Post", href: "/newPost" },
  { page: "About", href: "/about" },
  { page: "Counter", href: "/count" },
];

const Navbar = () => {
  return (
    <div className="flex flex-row flex-nowrap gap-4 justify-center">
      {navbar.map((link, i, isActive) => {
        return (
          <NavLink
            to={link.href}
            key={i}
            className={`text-blue-500 font-bold transition ${
              isActive ? "text-red" : null
            }`}
          >
            {link.page}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navbar;
