import React, {
  Context,
  createContext,
  Provider,
  useContext,
  useEffect,
  useState
} from "react";
import servicesJSON from "../../BEAUTY_SERVICES";
import { BeautyService, BeautyServiceOption } from "../Types";

type BeautyServicesContextProps =
  | {
      selectService: (service: BeautyService, boolean) => void;
      allServices: BeautyService[];
      selectedServices: BeautyService[];
      getNextSelectedServiceWithOptions: (
        current: BeautyService
      ) => BeautyService | undefined;
      selectOptionForService: (
        options: BeautyServiceOption,
        service: BeautyService,
        selected: boolean
      ) => void;
      findServiceByName: (string) => BeautyService;
      firstServiceToConfigure: BeautyService;
      markOptionComplete: (
        serviceName: string,
        optionName: string,
        specifier: string
      ) => void;
      sessionComplete: boolean;
      reset: () => void;
    }
  | undefined;

export const BeautyServiceContext = createContext<BeautyServicesContextProps>(
  undefined
);

const configureBeautyServiceContext = (): BeautyServicesContextProps => {
  const [allServices, setAllServices] = useState<BeautyService[]>(servicesJSON);
  const [firstServiceToConfigure, setFirstServiceToConfigure] = useState<
    BeautyService
  >(null);
  const selectedServices = allServices.filter(service => service.selected);

  const sessionComplete: boolean =
    selectedServices.length > 0 && selectedServices.every(s => s.completed);

  useEffect(() => {
    const first = selectedServices.find(
      s => s?.options.filter(o => !o.isDefault).length >= 1
    );
    setFirstServiceToConfigure(first);
  }, [selectedServices]);

  const getNextSelectedServiceWithOptions = (
    current: BeautyService
  ): BeautyService | undefined => {
    let next: BeautyService = undefined;
    const currentIndex = selectedServices.findIndex(
      s => s.title === current.title
    );
    const start = Math.max(currentIndex + 1, 0);

    for (let i = start; i < selectedServices.length; i++) {
      const s = selectedServices[i];
      if (s?.options.filter(o => !o.isDefault).length >= 1) {
        next = s;
        break;
      }
    }

    return next;
  };

  const selectService = (service: BeautyService, selected: boolean = true) => {
    setAllServices(old => {
      const tmp = [...old];
      tmp[service.index] = {
        ...service,
        selected,
        options: [...(service.options || [])]
      };
      return tmp;
    });
  };

  const selectOptionForService = (
    option: BeautyServiceOption,
    service: BeautyService,
    selected: boolean = true
  ) => {
    setAllServices(prev => {
      const tmp = prev.slice();
      const optionsCopy = [...service.options].map(o => {
        o.selected = !service.singleOption && o.selected;
        return o;
      });
      const optionIndex = optionsCopy.findIndex(o => o.title === option.title);
      optionsCopy[optionIndex] = { ...option, selected };
      tmp[service.index] = { ...service, options: optionsCopy };
      return tmp;
    });
  };

  const findServiceByName = (name: string): BeautyService =>
    allServices.find(s => s.title === name);

  const markOptionComplete = (
    serviceName: string,
    optionName: string,
    specifier: "left" | "right" | "force" | "both" = "both"
  ): void => {
    if (specifier === "force") {
      setAllServices(prev => {
        const copy = prev.slice();
        const service = copy.find(s => s.title === serviceName);
        copy[service.index] = { ...service, completed: true };
        return copy;
      });
    } else {
      setAllServices(prev => {
        const copy = prev.slice();
        const service = copy.find(s => s.title === serviceName);
        const stalePartial = service.partialCompletion || {};
        const optionCompletion = stalePartial[optionName] || {};
        optionCompletion[specifier] = true;
        const completed =
          optionCompletion["both"] ||
          (optionCompletion["left"] && optionCompletion["right"]);

        copy[service.index] = {
          ...service,
          completed,
          partialCompletion: {
            ...stalePartial,
            [optionName]: { ...optionCompletion }
          }
        };

        return copy;
      });
    }
  };

  const reset = () => setAllServices(servicesJSON);

  return {
    selectService,
    allServices,
    selectedServices,
    getNextSelectedServiceWithOptions,
    selectOptionForService,
    findServiceByName,
    firstServiceToConfigure,
    markOptionComplete,
    sessionComplete,
    reset
  };
};

export const BeautyServiceProvider = props => (
  <BeautyServiceContext.Provider value={configureBeautyServiceContext()}>
    {props.children}
  </BeautyServiceContext.Provider>
);

export default () =>
  useContext<BeautyServicesContextProps>(BeautyServiceContext);
