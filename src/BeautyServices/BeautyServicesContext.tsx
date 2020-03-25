import React, {
  Context,
  createContext,
  Provider,
  useContext,
  useState
} from "react";
import servicesJSON from "../../BEUATY_SERVICES";
import { BeautyService, BeautyServiceOption } from "../Types";

type BeautyServicesContextProps =
  | {
      selectService: (service: BeautyService, boolean) => void;
      allServices: BeautyService[];
      selectedServices: BeautyService[];
      // selectOptions: (
      //   options: BeautyServiceOption[],
      //   service: BeautyService
      // ) => void;
      // runningServices: BeautyService[];
    }
  | undefined;

export const BeautyServiceContext = createContext<BeautyServicesContextProps>(
  undefined
);

const configureBeautyServiceContext = (): BeautyServicesContextProps => {
  const [allServices, setAllServices] = useState<BeautyService[]>(servicesJSON);
  const selectedServices = allServices.filter(service => service.selected);

  const selectService = (service: BeautyService, selected: boolean = true) => {
    setAllServices(old => {
      const tmp = [...old];
      tmp[service.index] = { ...service, selected };
      return tmp;
    });
  };

  return {
    selectService,
    allServices,
    selectedServices
  };
};

export const BeautyServiceProvider = props => (
  <BeautyServiceContext.Provider value={configureBeautyServiceContext()}>
    {props.children}
  </BeautyServiceContext.Provider>
);

export default () =>
  useContext<BeautyServicesContextProps>(BeautyServiceContext);
