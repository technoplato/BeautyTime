import React from "react";
import { StyleSheet, View } from "react-native";
import BeautyServiceListItemComponent from "./BeautyServiceListItemComponent";
import useBeautyServices from "./BeautyServicesContext";
import { BeautyService } from "../Types";

const BeautyServiceList = () => {
  const { allServices, selectService } = useBeautyServices();
  return (
    <View style={styles.container}>
      {allServices.map((service: BeautyService) => {
        return (
          <BeautyServiceListItemComponent
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
    justifyContent: "center"
  }
});

export default BeautyServiceList;
