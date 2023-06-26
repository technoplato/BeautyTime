import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Service } from "../types";
import { useAppointment } from "../appointment/useAppointment";

import DynamicFontBlackButtonFooter from "./DynamicFontBlackButtonFooter";

const serviceSelectionButtonText = (selected: Service[]): string => {
  const anyServiceRequiresBrandSelection = selected.some(
    (service) =>
      new Set(service.variants.map((variant) => variant.brand)).size > 1
  );
  if (selected.length === 0) {
    return "Please Select at Least One Service";
  } else if (anyServiceRequiresBrandSelection) {
    return "NEXT: Select Brands for Services";
  } else {
    return "NEXT: Configure Services";
  }
};

const ServiceSelectionFooter = ({}) => {
  const navigation = useNavigation();
  const { services } = useAppointment();

  const anyServiceRequiresBrandSelection = services.some(
    (service) =>
      new Set(service.variants.map((variant) => variant.brand)).size > 1
  );

  return (
    <DynamicFontBlackButtonFooter
      title={serviceSelectionButtonText(services)}
      onPress={() => {
        // @ts-ignore
        if (anyServiceRequiresBrandSelection) {
          navigation.navigate("BrandSelectionScreen");
        } else {
          navigation.navigate("ServiceConfigurationScreen");
        }
      }}
      disabled={services.length === 0}
    />
  );
};

export default ServiceSelectionFooter;
