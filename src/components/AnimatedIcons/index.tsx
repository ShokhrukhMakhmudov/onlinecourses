"use client";
import { FC } from "react";
import Lottie from "lottie-react";

import successAnimation from "../../../public/animations/success.json";
import errorAnimation from "../../../public/animations/settings-error.json";

import { LottieAnimationProps } from "@/types";

const LottieAnimation: FC<LottieAnimationProps> = ({
  type = "success",
  loop = false,
  autoplay = true,
  className = "",
  style = {},
}) => {
  return (
    <Lottie
      animationData={type === "success" ? successAnimation : errorAnimation}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
};

export default LottieAnimation;
