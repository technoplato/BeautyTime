import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../styles/color";

type DynamicFontBlackButtonFooterProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
export const DynamicFontBlackButtonFooter = ({
  title,
  onPress,
  disabled,
}: DynamicFontBlackButtonFooterProps) => {
  // Styles to ensure the button is always pinned to the bottom of the screen
  const pinnedToBottom = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  };

  const buttonStyles = [
    {
      ...pinnedToBottom,
      width: "100%",
      alignItems: "center",
      marginTop: 50,
      backgroundColor: colors.black,
      padding: 10,
    },
  ];

  const textStyles = [
    {
      fontSize: 24,
      textTransform: "uppercase",
      padding: 22,
      paddingBottom: 80,
      fontFamily: "ChampagneLimousinesBold",
      color: "white",
    },
  ];

  if (disabled) {
    // @ts-ignore
    buttonStyles.push({ backgroundColor: colors.lightGray });
    // @ts-ignore
    textStyles.push({ color: colors.darkGray });
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      // @ts-ignore
      style={buttonStyles}
      onPress={onPress}
    >
      {/*@ts-ignore*/}
      <Text numberOfLines={1} adjustsFontSizeToFit={true} style={textStyles}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DynamicFontBlackButtonFooter;
