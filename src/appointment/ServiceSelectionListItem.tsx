import { Service } from "../types";
import { useDispatch } from "react-redux";
import { toggleServiceInAppointment } from "./createAppointment.slice";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import HeartButton from "../components/HeartButton";
import React from "react";

type ServiceListItemProps = {
  service: Service;
};
export const ServiceListItem = ({ service }: ServiceListItemProps) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleServiceInAppointment(service));
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={styles.listItem}>
      <HeartButton
        onToggle={handleToggle}
        selected={!!service.inCurrentAppointment}
      />
      <Text style={{ fontFamily: "ChampagneLimousines", fontSize: 22 }}>
        {service.name}
      </Text>
    </TouchableOpacity>
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
