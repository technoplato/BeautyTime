import { default as React } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Title } from "react-native-paper";
import HeartButton from "../HeartButton";
import { BeautyService } from "../Types";

interface Props {
  onToggle: (nowSelected: boolean) => void;
  service: BeautyService;
}

const BeautyServiceListItem = ({ onToggle, service }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onToggle(!service.selected)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <HeartButton
          onToggle={() => onToggle(!service.selected)}
          selected={service.selected}
        />
        <Title>{service.title}</Title>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BeautyServiceListItem;
