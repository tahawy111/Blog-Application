import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-light py-4">
      <h6 className="fw-bold">Welcome to my channel "عامر الطحاوي"</h6>
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
