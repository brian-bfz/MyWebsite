import React from "react";

import cn from "classnames";
import { Link } from "gatsby";
import { FaDownload } from "react-icons/fa";

import * as styles from "./NewButton.module.scss";

interface Props {
  className?: string;
  title: string;
  to: string;
  download?: boolean;
}

const Button: React.FC<Props> = ({ className, title, to, download }: Props) => {
  if (download) {
    return (
      <a
        href={to}
        download
        className={cn(styles.button, className)}
      >
        <FaDownload /> {title}
      </a>
    );
  } else {
    return (
      <Link className={cn(styles.button, className)} to={to}>
      {title}
    </Link>
      );
  }
};

export default Button;
