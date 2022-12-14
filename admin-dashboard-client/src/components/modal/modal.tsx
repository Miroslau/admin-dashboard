import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IProps {
  className?: string;
  el?: string;
  children: React.ReactNode;
}

const Modal: FC<IProps> = ({
  children,
  className = "root-portal",
  el = "div",
}) => {
  const [container] = useState(document.createElement(el));

  useEffect(() => {
    container.setAttribute("id", className);
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Modal;
