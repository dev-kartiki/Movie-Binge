import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white position-fixed bottom-0 w-100">
      <div className="container mx-auto text-center d-inline-flex">
        <span>Movie Browser Inc.</span>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
