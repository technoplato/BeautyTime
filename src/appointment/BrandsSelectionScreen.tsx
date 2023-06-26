import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App";
import { ProductBrand, Service, ServiceBrandMap } from "../types";
import { useNavigation } from "@react-navigation/native";
import DynamicFontBlackButtonFooter from "../components/DynamicFontBlackButtonFooter";
import { Card, Title } from "react-native-paper";
import { HeartToggleListItem } from "./HeartToggleListItem";
import { toggleBrandForService } from "./createAppointment.slice";
const BrandSelectionSection = ({
  service,
  handleBrandToggleForService,
  selectedBrand,
}: {
  service: Service;
  handleBrandToggleForService: (service: Service, brand: ProductBrand) => void;
  selectedBrand: ProductBrand;
}) => {
  const uniqueBrands: ProductBrand[] = [
    ...new Set(service.variants.map((variant) => variant.brand)),
  ];
  const activeBrand = selectedBrand || uniqueBrands[0];

  return (
    <Card style={{ margin: 8, padding: 4 }} key={service.id}>
      <Card.Content>
        <Title>{service.name}</Title>
        {uniqueBrands.map((brand) => {
          return (
            <HeartToggleListItem
              key={brand}
              title={brand}
              handleToggle={() => handleBrandToggleForService(service, brand)}
              selected={activeBrand === brand}
            />
          );
        })}
      </Card.Content>
    </Card>
  );
};

type BrandOptionsList = {
  servicesWithMultipleBrands: Service[];
  handleBrandToggleForService: (service: Service, brand: ProductBrand) => void;
  serviceBrandMap: ServiceBrandMap;
};

const BrandSelectionList = ({
  servicesWithMultipleBrands,
  handleBrandToggleForService,
  serviceBrandMap,
}: BrandOptionsList) => {
  return (
    <View>
      {servicesWithMultipleBrands.map((service) => {
        return (
          <BrandSelectionSection
            key={service.id}
            service={service}
            handleBrandToggleForService={handleBrandToggleForService}
            selectedBrand={serviceBrandMap[service.name]}
          />
        );
      })}
    </View>
  );
};

export function BrandsSelectionScreen() {
  const dispatch = useDispatch();
  const servicesInAppointment = useSelector<RootState, Service[]>(
    (state) => state.appointment.servicesInAppointment
  );
  const serviceBrandMap = useSelector<RootState, ServiceBrandMap>(
    (state) => state.appointment.serviceBrandMap
  );
  const servicesWithMultipleBrands = servicesInAppointment.filter(
    (service) =>
      new Set(service.variants.map((variant) => variant.brand)).size > 1
  );

  const handleBrandToggleForService = (
    service: Service,
    brand: ProductBrand
  ) => {
    dispatch(
      toggleBrandForService({
        serviceName: service.name,
        brand,
      })
    );
  };

  const allBrandsSelected = Object.values(serviceBrandMap).every(
    (brand) => brand !== undefined
  );

  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        <BrandSelectionList
          {...{
            servicesWithMultipleBrands,
            handleBrandToggleForService,
            serviceBrandMap,
          }}
        />
      </ScrollView>
      <DynamicFontBlackButtonFooter
        disabled={!allBrandsSelected}
        title={
          allBrandsSelected
            ? "Choose Variants"
            : "Please select a brand for each service"
        }
        onPress={() => {
          // @ts-ignore
          navigate("ServiceConfigurationScreen");
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
