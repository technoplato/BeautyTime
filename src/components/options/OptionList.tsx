import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";
import OptionListItem from "./OptionListItem";
import useBeautyServices from "../Services/ServicesContext";
import { Service, Option } from "../../Types";

type Props = {
  service: Service;
};

const OptionList = ({ service }: Props) => {
  const { selectOptionForService } = useBeautyServices();

  return (
    <View style={styles.container}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select option{!service.singleOption && "s"} for {service.title}
      </Headline>
      {service.options?.map((option: Option) => {
        return (
          <OptionListItem
            key={option.title}
            onToggle={(selected) =>
              selectOptionForService(option, service, selected)
            }
            option={option}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
  },
});

export default OptionList;
