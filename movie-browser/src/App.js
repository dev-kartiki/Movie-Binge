import React from "react";
import SEO from "./components/common/SEO/SEO";
import Layout from "./components/common/Layout";
import Page from "./Page";

function App() {
  return (
    <div className="bg-dark">
      {/* SEO Component for setting meta tags */}
      <SEO
        title="Movie Browser"
        description="Browse and search for your favorite movies."
      />
      {/* Layout component to wrap around the main content */}
      <Layout>
        <Page />
      </Layout>
    </div>
  );
}

export default App;
