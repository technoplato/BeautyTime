import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

import { ClientsScreen } from "./src/clients/ClientsScreen";
import { ServiceListScreen } from "./src/appointment/ServiceSelectionScreen";
import { BrandsSelectionScreen } from "./src/appointment/BrandsSelectionScreen";
import { ServiceConfigurationScreen } from "./src/appointment/ServiceConfigurationScreen";
import { ActiveAppointmentScreen } from "./src/screens/ActiveAppointmentScreen";
import { ClientNotesScreen } from "./src/clients/ClientNotesScreen";

import serviceSliceReducer from "./src/appointment/createAppointment.slice";
import catalogSliceReducer from "./src/catalog/serviceCatalog.slice";
import timerSliceReducer from "./src/timer/timer.slice";
import createSagaMiddleware from "redux-saga";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Service } from "./src/types";
import { rootSaga } from "./src/rootSaga";
import { Header } from "./src/components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { colors } from "./src/styles/color";
import { useSignIn } from "./src/clients/api.clients";

import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  appointment: serviceSliceReducer,
  catalog: catalogSliceReducer,
  timer: timerSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
const isDevelopment = process.env.NODE_ENV === "development";
const storeEnhancers = isDevelopment ? composeWithDevTools({}) : undefined;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  // @ts-ignore
  enhancers: isDevelopment ? [storeEnhancers] : [],
});

sagaMiddleware.run(rootSaga);

type RootStackParamList = {
  // AppointmentListScreen: undefined;
  ClientsScreen: undefined;
  ClientNotesScreen: undefined;
  ServiceListScreen: undefined;
  BrandSelectionScreen: undefined;
  ServiceConfigurationScreen: { service: Service };
  ActiveAppointmentScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const fontConfig = {
  fontFamily: "ChampagneLimousines",

  regular: { fontSize: 20, fontFamily: "ChampagneLimousinesBold" },
  medium: { fontSize: 20, fontFamily: "ChampagneLimousinesBold" },
  light: { fontSize: 20, fontFamily: "ChampagneLimousinesItalic" },
  thin: { fontSize: 20, fontFamily: "ChampagneLimousinesItalic" },
};

const App = () => {
  const { uid, isSignedIn } = useSignIn();
  useKeepAwake();
  // useAppointment();
  const [fontsLoaded] = useFonts({
    ChampagneLimousines: require("./assets/fonts/ChampagneLimousines.ttf"),
    ChampagneLimousinesBold: require("./assets/fonts/ChampagneLimousinesBold.ttf"),
    ChampagneLimousinesItalic: require("./assets/fonts/ChampagneLimousinesItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <PaperProvider
      theme={{
        ...MD3LightTheme,
        fonts: configureFonts({ config: fontConfig }),
      }}
    >
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.pink,
          },
        }}
      >
        <Provider store={store}>
          <Stack.Navigator
            screenOptions={{
              header: (props) => (
                <>
                  <Header />
                  {/*<TextInput>{uid}</TextInput>*/}
                </>
              ),
            }}
          >
            <Stack.Screen name="ClientsScreen" component={ClientsScreen} />
            <Stack.Screen
              name="ServiceListScreen"
              component={ServiceListScreen}
            />
            <Stack.Screen
              name="BrandSelectionScreen"
              component={BrandsSelectionScreen}
            />
            <Stack.Screen
              name="ServiceConfigurationScreen"
              component={ServiceConfigurationScreen}
            />
            <Stack.Screen
              name="ActiveAppointmentScreen"
              component={ActiveAppointmentScreen}
            />
            <Stack.Screen
              name="ClientNotesScreen"
              component={ClientNotesScreen}
            />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
