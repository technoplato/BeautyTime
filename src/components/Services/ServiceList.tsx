import React from "react";
import { StyleSheet, View } from "react-native";
import ServiceListItem from "./ServiceListItem";
import useBeautyServices from "./ServicesContext";
import { Service } from "../../Types";

const ServiceList = () => {
  const { services, selectService } = useBeautyServices();
  return (
    <View style={styles.container}>
      {services.map((service: Service) => {
        return (
          <ServiceListItem
            key={service.title}
            onToggle={selected => selectService(service, selected)}
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
    alignItems: "center"
  }
});

export default ServiceList;
