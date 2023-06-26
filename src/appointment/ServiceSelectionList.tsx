import { StyleSheet, View } from "react-native";
import { Service } from "../types";
import { ServiceListItem } from "./ServiceSelectionListItem";

type ServiceListProps = {
  services: Service[];
  servicesInAppointment: Service[];
};
export const ServicesList = ({
  services,
  servicesInAppointment,
}: ServiceListProps) => {
  return (
    <View style={styles.listContainer}>
      {services.map((s) => {
        const service: Service = {
          ...s,
          inCurrentAppointment:
            -1 !==
            servicesInAppointment.findIndex((service) => service.id === s.id),
        };

        return <ServiceListItem key={service.id} service={service} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
  },
});
