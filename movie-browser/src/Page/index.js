import React from "react";
import AppRouter from "./Router";

/**
 * Main component that serves as the entry point for the application.
 * It wraps the Router component in a main element with a dark background.
 * 
 * @returns {JSX.Element} The main component with routing functionality.
 */
const App = () => {
  return (
    <main className="bg-dark" role="main">
      {/* The Router component handles the application's routing */}
      <AppRouter />
    </main>
  );
};

export default App;
