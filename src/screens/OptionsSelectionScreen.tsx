import React from "react";
import { View } from "react-native";
import ApplicationStyles from "../Themes/ApplicationStyles";

import OptionList from "../components/options/OptionList";
import OptionsSelectionFooter from "../components/options/OptionsSelectionFooter";

import useBeautyServices from "../components/Services/ServicesContext";

const OptionsSelectionScreen = ({ route, navigation }) => {
  const { findServiceByName } = useBeautyServices();
  return (
    <View style={ApplicationStyles.screen.options}>
      <OptionList service={findServiceByName(route.params.name)} />
      <OptionsSelectionFooter route={route} navigation={navigation} />
    </View>
  );
};

export default OptionsSelectionScreen;
