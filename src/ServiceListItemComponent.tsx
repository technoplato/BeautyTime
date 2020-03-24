import { default as React } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import HeartButton from "./HeartButton";
import { Service } from "./Types";
import { Headline, Text, Title } from "react-native-paper";
import Fonts from "../src/Themes/Fonts";

interface Props {
  onToggle: (nowSelected: boolean) => void;
  selected: boolean;
  service: Service;
}

const ServiceListItemComponent = ({ onToggle, selected, service }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={() => onToggle(!selected)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <HeartButton onToggle={() => onToggle(!selected)} selected={selected} />
        <Title>{service.title}</Title>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceListItemComponent;
