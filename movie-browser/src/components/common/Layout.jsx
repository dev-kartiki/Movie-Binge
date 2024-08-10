import React from "react";
import NavBar from "../NavBar";
import Page from "../../Page";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <>
      {/* 
        The NavBar component is placed at the top of the layout. 
        It likely contains the site's primary navigation links.
      */}
      <NavBar />

      {/* 
        The main content of the page is wrapped in a <main> element. 
        This helps screen readers and search engines identify the primary content of the page.
      */}
      <main id="main-content">
        <Page />
      </main>

      {/* 
        The Footer component is placed at the bottom of the layout. 
        It may contain site information, links, and other relevant content.
      */}
      <Footer />
    </>
  );
};

export default Layout;
