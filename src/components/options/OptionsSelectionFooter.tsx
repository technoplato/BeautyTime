import React from "react";

import DynamicFontBlackButtonFooter from "../DynamicFontBlackButtonFooter";
import { Service } from "../../Types";

import useBeautyServices from "../Services/ServicesContext";

const optionsSelectionButtonText = (
  current: Service,
  next: Service
): string => {
  const selectedOptionsCount = current.options.filter((o) => o.selected).length;

  if (selectedOptionsCount === 0 && !current.singleOption) {
    return "Please Select at Least One Option";
  } else if (selectedOptionsCount === 0 && current.singleOption) {
    return "Please Select One Option";
  } else if (next !== undefined) {
    return `NEXT: Select Options for ${next.title}`;
  } else {
    return "Start Session";
  }
};

const OptionsSelectionFooter = ({ route, navigation }) => {
  const {
    findServiceByName,
    getNextSelectedServiceWithOptions,
  } = useBeautyServices();
  const service = findServiceByName(route.params.name);
  const nextService = getNextSelectedServiceWithOptions(service);
  return (
    <DynamicFontBlackButtonFooter
      title={optionsSelectionButtonText(service, nextService)}
      onPress={() => {
        if (nextService) {
          navigation.navigate("Options", {
            name: nextService.title,
          });
        } else {
          navigation.navigate("ActiveServices");
        }
      }}
      disabled={service.options.filter((o) => o.selected).length === 0}
    />
  );
};

export default OptionsSelectionFooter;
