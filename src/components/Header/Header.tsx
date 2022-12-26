import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { MenuIcon } from "../../icons/icons";
import SideBar from "./SideBar";

import s from "./header.module.css";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [open, setOpen] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (open) {
      window.document.body.classList.add("overflow-hidden");
    } else {
      window.document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <Fragment>
      <header
        className={classNames(
          s["header"],
          "p-4 fixed w-full bg-transparent",
          s["header__scroll"]
        )}
        style={{}}
      >
        <button
          className="bg-transparent border-none"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MenuIcon />
        </button>
      </header>
      <SideBar open={open} setOpen={setOpen} />
    </Fragment>
  );
}
