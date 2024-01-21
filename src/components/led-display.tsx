import c from "classnames";

import "./led-display.css";

type Props = {
  color: "blue" | "red" | "yellow";
  isActive?: boolean;
};

export function LedDisplay({ color, isActive }: Props) {
  return (
    <div
      className={c("led-display", color, isActive && "led-display--active")}
    ></div>
  );
}
