import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-light d-flex align-items-center flex-column">
      <h6 className="fw-bold pt-4">Welcome to my channel "عامر الطحاوي"</h6>
      <a
        href="https://www.youtube.com/@tahawy111"
        target="_blank"
        rel="noopener noreferrer"
        className="text-info"
      >
        https://www.youtube.com/@tahawy111
      </a>
      <p className="mt-2">Copyright &copy; {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
