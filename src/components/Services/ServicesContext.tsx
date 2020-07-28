import React, { createContext, useContext, useEffect, useState } from "react";
import servicesJSON from "../../../BEAUTY_SERVICES";
import { Service, Option } from "../../Types";

type ServicesContextProps =
  | {
      selectService: (service: Service, boolean) => void;
      allServices: Service[];
      selectedServices: Service[];
      getNextSelectedServiceWithOptions: (
        current: Service
      ) => Service | undefined;
      selectOptionForService: (
        options: Option,
        service: Service,
        selected: boolean
      ) => void;
      findServiceByName: (string) => Service;
      firstServiceToConfigure: Service;
      markStepComplete: (
        serviceTitle: string,
        optionTitle: string,
        stepTitle: string,
        specifier: string
      ) => void;
      sessionComplete: boolean;
      reset: () => void;
    }
  | undefined;

export const ServiceContext = createContext<ServicesContextProps>(undefined);

const configureServiceContext = (): ServicesContextProps => {
  const [allServices, setAllServices] = useState<Service[]>(servicesJSON);
  const [firstServiceToConfigure, setFirstServiceToConfigure] = useState<
    Service
  >(null);
  const selectedServices = allServices.filter((service) => service.selected);

  const sessionComplete: boolean =
    selectedServices.length > 0 && selectedServices.every((s) => s.completed);

  console.table(selectedServices);
  console.log({ sessionComplete });
  useEffect(() => {
    const first = selectedServices.find(
      (s) => s?.options.filter((o) => !o.isDefault).length >= 1
    );
    setFirstServiceToConfigure(first);
  }, [selectedServices]);

  const getNextSelectedServiceWithOptions = (
    current: Service
  ): Service | undefined => {
    let next: Service = undefined;
    const currentIndex = selectedServices.findIndex(
      (s) => s.title === current.title
    );
    const start = Math.max(currentIndex + 1, 0);

    for (let i = start; i < selectedServices.length; i++) {
      const s = selectedServices[i];
      if (s?.options.filter((o) => !o.isDefault).length >= 1) {
        next = s;
        break;
      }
    }

    return next;
  };

  const selectService = (service: Service, selected: boolean = true) => {
    setAllServices((old) => {
      const tmp = [...old];
      tmp[service.index] = {
        ...service,
        selected,
        options: [...(service.options || [])],
      };
      return tmp;
    });
  };

  const selectOptionForService = (
    option: Option,
    service: Service,
    selected: boolean = true
  ) => {
    setAllServices((prev) => {
      const tmp = prev.slice();
      const optionsCopy = [...service.options].map((o) => {
        o.selected = !service.singleOption && o.selected;
        return o;
      });
      const optionIndex = optionsCopy.findIndex(
        (o) => o.title === option.title
      );
      optionsCopy[optionIndex] = { ...option, selected };
      tmp[service.index] = { ...service, options: optionsCopy };
      return tmp;
    });
  };

  const findServiceByName = (name: string): Service =>
    allServices.find((s) => s.title === name);

  const markStepComplete = (
    serviceTitle: string,
    optionTitle: string,
    // If undefined, force next uncompleted step to be completed
    stepTitle: string | undefined,
    specifier: "left" | "right" | "both" = "both"
  ): void => {
    setAllServices((prev) => {
      const servicesCopy = prev.slice();
      const service = servicesCopy.find((s) => s.title === serviceTitle);
      const selectedOption: Option = service.options.find(
        (o) => o.title === optionTitle
      );
      if (stepTitle === undefined) {
        specifier = "both";
        for (let i = 0; i < selectedOption.steps.length - 1; i++) {
          const step = selectedOption.steps[i];
          if (!step.completed) {
            stepTitle = step.title;
          }
        }
      }
      const step = selectedOption.steps.find((s) => s.title === stepTitle);

      console.table(serviceTitle, optionTitle, stepTitle, specifier);

      console.log(service);
      console.log(selectedOption);
      console.log(step);

      const stalePartial = service.partialCompletion || {};
      const stepCompletion = stalePartial[stepTitle] || {};
      stepCompletion[specifier] = true;
      const stepCompleted =
        stepCompletion["both"] ||
        (stepCompletion["left"] && stepCompletion["right"]);
      const serviceCompleted = selectedOption.steps.every((s) => s.completed);

      servicesCopy[service.index] = {
        ...service,
        completed: serviceCompleted,
        options: [],
        partialCompletion: {
          ...stalePartial,
          [stepTitle]: { ...stepCompletion },
        },
      };

      return servicesCopy;
    });
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
    markStepComplete,
    sessionComplete,
    reset,
  };
};

export const ServiceProvider = (props) => (
  <ServiceContext.Provider value={configureServiceContext()}>
    {props.children}
  </ServiceContext.Provider>
);

export default () => useContext<ServicesContextProps>(ServiceContext);
