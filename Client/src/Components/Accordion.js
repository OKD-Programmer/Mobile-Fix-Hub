import { useState } from "react";
import "../Styles/accordion.css";

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button
        className={open ? "active" : ""}
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      <div className={`panel ${open ? "show" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
