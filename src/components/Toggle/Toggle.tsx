import React from "react";

import cn from "classnames";

import * as styles from "./Toggle.module.scss";

interface Props {
  className?: string;
  title: string;
  onClick?: () => void;
}

const Toggle: React.FC<Props> = ({ className, title, onClick }: Props) => (
  <button className={cn(styles.button, className)} onClick={onClick}>
    {title}
  </button>
);

export default Toggle;