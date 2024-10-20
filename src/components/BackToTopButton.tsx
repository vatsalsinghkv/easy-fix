import React, { useEffect, useState } from "react";

import topImage from "./assets/icons8-top-48.png";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);


  const toggleVisibility = () => {
    if (window.pageYOffset > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <img src={topImage} alt="Go to top" className="back-to-top-image" />
    </button>
  );
};

export default BackToTopButton;
