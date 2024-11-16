import React from "react";
import { hp } from "../../constants/common";
import { theme } from "../../constants/theme";
// import { getUserImageSrc } from "../services/imageService";
import { Image } from "expo-image";
import styles from "./styles";

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {},
}) => {
  return (
    <Image
      source={uri ? uri : require("../../assets/images/defaultUser.png")}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

export default Avatar;
