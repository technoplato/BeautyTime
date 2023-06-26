import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import {
  ProductBrand,
  Service,
  ServiceBrandMap,
  ServiceVariant,
} from "../types";
import { useNavigation } from "@react-navigation/native";
import { toggleVariantInAppointmentForService } from "./createAppointment.slice";
import DynamicFontBlackButtonFooter from "../components/DynamicFontBlackButtonFooter";
import { Card, Title } from "react-native-paper";
import { HeartToggleListItem } from "./HeartToggleListItem";

const ServiceConfigurationSection = ({
  service,
  handleVariantToggle,
  activeBrand,
}: {
  service: Service;
  handleVariantToggle: (service: Service, variant: ServiceVariant) => void;
  activeBrand: ProductBrand;
}) => {
  return (
    <Card style={{ margin: 8, padding: 4 }} key={service.id}>
      <Card.Content>
        <Title>{service.name}</Title>
        {service.variants
          .filter((variant) => variant.brand === activeBrand)
          .map((variant) => {
            return (
              <HeartToggleListItem
                key={variant.name}
                title={variant.name}
                handleToggle={() => handleVariantToggle(service, variant)}
                selected={!!variant.active}
              />
            );
          })}
      </Card.Content>
    </Card>
  );
};

type ServiceOptionsListProps = {
  services: Service[];
  handleVariantToggle: (service: Service, variant: ServiceVariant) => void;
  activeBrandsForServices: ServiceBrandMap;
};

const ServiceOptionsList = ({
  services,
  handleVariantToggle,
  activeBrandsForServices,
}: ServiceOptionsListProps) => {
  return (
    <View>
      {services.map((service) => {
        return (
          <ServiceConfigurationSection
            key={service.id}
            service={service}
            handleVariantToggle={handleVariantToggle}
            activeBrand={activeBrandsForServices[service.name]}
          />
        );
      })}
    </View>
  );
};

export function ServiceConfigurationScreen() {
  const dispatch = useDispatch();

  const servicesInAppointmentThatNeedConfiguration = useSelector<
    RootState,
    Service[]
  >((state) =>
    state.appointment.servicesInAppointment.filter(
      (s) => s.variants && s.variants.length > 1
    )
  );

  const activeBrandsForServices = useSelector<RootState, ServiceBrandMap>(
    (state) => state.appointment.serviceBrandMap
  );

  const allServicesConfigured =
    servicesInAppointmentThatNeedConfiguration.every(
      (s) => s.variants && s.variants.some((v) => v.active)
    );

  const handleVariantToggle = (service: Service, variant: ServiceVariant) => {
    dispatch(
      toggleVariantInAppointmentForService({
        serviceId: service.id,
        variantName: variant.name,
      })
    );
  };

  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        <ServiceOptionsList
          {...{
            services: servicesInAppointmentThatNeedConfiguration,
            handleVariantToggle,
            activeBrandsForServices,
          }}
        />
      </ScrollView>
      <DynamicFontBlackButtonFooter
        disabled={!allServicesConfigured}
        title={
          allServicesConfigured
            ? "Start Appointment"
            : "Please configure all services"
        }
        onPress={() => {
          // @ts-ignore
          navigate("ActiveAppointmentScreen");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  list: {
    marginBottom: 100,
  },
});
