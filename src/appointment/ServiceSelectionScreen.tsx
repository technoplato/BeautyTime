import React from "react";
import { useSelector } from "react-redux";
import { Service } from "../types";
import { StyleSheet, View } from "react-native";
import { RootState } from "../../App";
import { Headline } from "react-native-paper";
import ServiceSelectionFooter from "../components/ServiceSelectionFooter";
import { ServicesList } from "./ServiceSelectionList";

export const ServiceListScreen = () => {
  const allServices = useSelector<RootState, Service[]>(
    (state) => state.catalog.services as Service[]
  );
  const servicesInAppointment = useSelector<RootState, Service[]>(
    (state) => state.appointment.servicesInAppointment
  );

  return (
    <View style={styles.container}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed
      </Headline>
      <ServicesList
        servicesInAppointment={servicesInAppointment}
        services={allServices}
      />

      <ServiceSelectionFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
  listContainer: {
    alignItems: "center",
  },
  listItem: {
    width: 230,
    flexDirection: "row",
    alignItems: "center",
  },
});
