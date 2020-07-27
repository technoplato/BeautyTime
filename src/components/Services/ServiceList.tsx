import React from "react";
import { StyleSheet, View } from "react-native";
import ServiceListItem from "./ServiceListItem";
import useBeautyServices from "./ServicesContext";
import { BeautyService } from "../../Types";

const ServiceList = () => {
  const { allServices, selectService } = useBeautyServices();
  return (
    <View style={styles.container}>
      {allServices.map((service: BeautyService) => {
        return (
          <ServiceListItem
            key={service.title}
            onToggle={(selected) => selectService(service, selected)}
            service={service}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceList;
