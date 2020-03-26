import { default as React } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Title } from "react-native-paper";
import HeartButton from "../HeartButton";
import { BeautyService, BeautyServiceOption } from "../Types";

interface Props {
  onToggle: (nowSelected: boolean) => void;
  option: BeautyServiceOption;
}

const BeautyServiceListItem = ({ onToggle, option }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onToggle(!option.selected)}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 60,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <HeartButton
          onToggle={() => onToggle(!option.selected)}
          selected={option.selected}
        />
        <Title>{option.title}</Title>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BeautyServiceListItem;
