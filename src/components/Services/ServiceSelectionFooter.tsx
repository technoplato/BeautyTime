import React from "react";
import { BeautyService } from "../../Types";

import useBeautyServices from "./ServicesContext";
import DynamicFontSizeBlackButtonFooter from "../DynamicFontBlackButtonFooter";

const serviceSelectionButtonText = (
  first: BeautyService,
  selected: BeautyService[]
): string => {
  if (selected.length === 0) {
    return "Please Select at Least One Service";
  } else if (first === undefined) {
    return "Start Session";
  } else {
    return "NEXT: Select Options for Services";
  }
};

const ServiceSelectionFooter = ({ navigation }) => {
  const { firstServiceToConfigure, selectedServices } = useBeautyServices();

  return (
    <DynamicFontSizeBlackButtonFooter
      title={serviceSelectionButtonText(
        firstServiceToConfigure,
        selectedServices
      )}
      onPress={() => {
        if (firstServiceToConfigure) {
          navigation.navigate("Options", {
            name: firstServiceToConfigure.title
          });
        } else {
          navigation.navigate("ActiveServices");
        }
      }}
      disabled={selectedServices.length === 0}
    />
  );
};

export default ServiceSelectionFooter;
