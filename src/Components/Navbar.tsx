import React from "react";
import Link from "next/link";

import Styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={Styles.navBarContainer}>
      <div>Logo</div>
      <ul className={Styles.navLinksContainer}>
        <Link className={Styles.link} href="/developers">
          <li className={Styles.navLink}>Developers</li>
        </Link>
        <Link className={Styles.link} href="/contract/upload">
          <li className={Styles.navLink}>Upload</li>
        </Link>
        {/* <Link className={Styles.link} href="#">
          <li className={Styles.navLink}>Leaderboard</li>
        </Link>
        <Link className={Styles.link} href="#">
          <li className={Styles.navLink}>Commpetition</li>
        </Link>
        <Link className={Styles.link} href="#">
          <li className={Styles.navLink}>Reports</li>
        </Link>
        <Link className={Styles.link} href="#">
          <li className={Styles.navLink}>Docs</li>
        </Link>
        <Link className={Styles.link} href="#">
          <li className={Styles.navLink}>Helps</li>
        </Link> */}
      </ul>
    </nav>
  );
};

export default Navbar;
