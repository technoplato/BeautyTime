import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

const DynamicFontBlackButtonFooter = ({ title, onPress, disabled }) => {
  const buttonStyles = [
    {
      alignItems: "center",
      marginTop: 50,
      backgroundColor: "#000000",
      padding: 10
    }
  ];

  const textStyles = [
    {
      fontSize: 24,
      textTransform: "uppercase",
      padding: 22,
      paddingBottom: 80,
      fontFamily: "champagne-limousines-bold",
      color: "white"
    }
  ];

  if (disabled) {
    buttonStyles.push({ backgroundColor: "#e0e0e0" });
    textStyles.push({ color: "#00000052" });
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      style={buttonStyles}
      onPress={onPress}
    >
      <Text numberOfLines={1} adjustsFontSizeToFit={true} style={textStyles}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DynamicFontBlackButtonFooter;
