import React from "react";
import { StyleSheet, View } from "react-native";
import { Headline } from "react-native-paper";
import BeautyServiceOptionListItem from "./BeautyServiceOptionListItem";
import useBeautyServices from "./BeautyServicesContext";
import { BeautyService, BeautyServiceOption } from "../Types";

type Props = {
  service: BeautyService;
};

const BeautyServiceOptionList = ({ service }: Props) => {
  const { selectOptionForService } = useBeautyServices();

  return (
    <View style={styles.container}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select option{!service.singleOption && "s"} for {service.title}
      </Headline>
      {service.options?.map((option: BeautyServiceOption) => {
        return (
          <BeautyServiceOptionListItem
            key={option.title}
            onToggle={selected =>
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
    justifyContent: "center"
  }
});

export default BeautyServiceOptionList;
