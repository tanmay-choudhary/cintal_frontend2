import React, { useState } from "react";

import { Menu, X } from "lucide-react";
import NavItems from "./NavItems";
import Link from "next/link";

const Navbar = ({ role }) => {
  const [navModal, setNavModal] = useState(false);
  // const [menuHam, setMenuHam] = useState(false)
  // console.log(role);
  return (
    <>
      <section className="sticky top-0 z-50 lg:p-3 flex w-full  ">
        <div className="container hidden w-full justify-between px-4 py-2 lg:flex">
          {/*	<Link href="/">
						<img
							src="/logo.png"
							width={190}
							height={61}
							alt="logo"
						/>
  </Link> */}
          <NavItems role={role} />
        </div>
      </section>
      <section
        className={`sticky top-0 z-50 -mt-3 flex h-20 items-center justify-between  px-4 lg:hidden`}
      >
        <Link href="/">
          <img src="/cintal.png" width={105} height={61} alt="logo" />
        </Link>
        <div>
          {!navModal ? (
            <Menu
              className="h-10 w-10"
              onClick={() =>
                navModal ? setNavModal(false) : setNavModal(true)
              }
            />
          ) : null}
        </div>
        <div
          className={`fixed right-0 top-0 z-50 h-screen px-4 pt-5 shadow-xl shadow-black  bg-white ${
            !navModal ? "hidden" : "block lg:hidden"
          }`}
        >
          <div className="flex items-center justify-between ">
            <Link href="/">
              <img src="/cintal.png" width={95} height={51} alt="logo" />
            </Link>
            <span>
              {navModal ? (
                <X
                  className="h-10 w-10"
                  onClick={() =>
                    navModal ? setNavModal(false) : setNavModal(true)
                  }
                />
              ) : null}
            </span>
          </div>
          <NavItems />
        </div>
      </section>
    </>
  );
};

export default Navbar;
