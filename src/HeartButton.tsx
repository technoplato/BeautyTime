import * as React from "react";
import { Colors, IconButton } from "react-native-paper";

interface Props {
  onToggle?: (selected: boolean) => void;
  selected?: boolean;
}

const HeartButton: React.FunctionComponent<Props> = ({
  selected,
  onToggle
}: Props) => {
  return (
    <IconButton
      icon={selected ? "heart" : "heart-outline"}
      color={Colors.pink200}
      size={35}
      onPress={() => onToggle(selected)}
    />
  );
};

export default HeartButton;
