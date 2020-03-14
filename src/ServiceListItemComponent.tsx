import { default as React, useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import HeartButton from "./HeartButton";
import { Service } from "./Types";

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
        <Text>{service.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceListItemComponent;
