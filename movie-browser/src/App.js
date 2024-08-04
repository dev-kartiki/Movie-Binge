import React from "react";
import SEO from "./components/common/SEO/SEO";
import Layout from "./components/common/Layout";
import Page from "./Page";

function App() {
  return (
    <div className="bg-dark">
      <SEO
        title="Movie Browser"
        description="Browse and search for your favorite movies."
      />
      <Layout children={<Page />} />
    </div>
  );
}

export default App;
