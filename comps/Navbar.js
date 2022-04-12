import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href={"/"}>
          <a>minus1 🌍</a>
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
