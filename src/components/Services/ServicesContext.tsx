import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

import servicesJSON from "../../../BEAUTY_SERVICES";
import { Service, Option } from "../../Types";

type ServicesContextProps =
  | {
      selectService: (service: Service, boolean) => void;
      services: Service[];
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
        serviceIndex: number,
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
  const [services, updateServices] = useImmer<Service[]>(servicesJSON);
  const [firstServiceToConfigure, setFirstServiceToConfigure] = useState<
    Service
  >(null);
  const selectedServices = services.filter((service) => service.selected);
  console.log(selectedServices);

  const sessionComplete: boolean =
    selectedServices.length > 0 && selectedServices.every((s) => s.completed);

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

  // function updateName(name) {
  //   updatePerson((draft) => {
  //     draft.name = name;
  //   });
  // }

  const selectService = (service: Service, selected: boolean = true) => {
    updateServices((draft) => {
      draft[service.index].selected = selected;
    });
  };

  const selectOptionForService = (
    option: Option,
    s: Service,
    selected: boolean = true
  ) => {
    updateServices((draft) => {
      const service = draft[s.index];
      if (service.singleOption) {
        service.options = service.options.map((o) => ({
          ...o,
          selected: false,
        }));
      }
      const index = service.options.findIndex((o) => o.title === option.title);
      service.options[index] = { ...option, selected };
    });
  };

  const findServiceByName = (name: string): Service =>
    services.find((s) => s.title === name);

  const markStepComplete = (
    serviceIndex: number,
    optionTitle: string,
    // If undefined, force next uncompleted step to be completed
    stepTitle: string | undefined,
    specifier: "left" | "right" | "both" = "both"
  ): void => {
    updateServices((draft) => {
      const service = draft[serviceIndex];
      const options = service.options;
      const optionIndex = options.findIndex((o) => o.title === optionTitle);
      const option = options[optionIndex];

      if (stepTitle === undefined) {
        specifier = "both";
        for (let i = 0; i < option.steps.length - 1; i++) {
          const step = option.steps[i];
          if (!step.completed) {
            stepTitle = step.title;
            break;
          }
        }
      }

      const stepIndex = option.steps.findIndex((s) => s.title === stepTitle);
      const step = option.steps[stepIndex];

      const stalePartial = service.partialCompletion || {};
      const stepCompletion = stalePartial[stepTitle] || {};
      stepCompletion[specifier] = true;
      const stepCompleted =
        stepCompletion["both"] ||
        (stepCompletion["left"] && stepCompletion["right"]);
      const serviceCompleted = option.steps.every((s) => s.completed);

      step.completed = stepCompleted;
      options[optionIndex].steps[stepIndex] = step;
      draft[serviceIndex] = {
        ...service,
        completed: serviceCompleted,
        options,
        partialCompletion: {
          ...stalePartial,
          [stepTitle]: stepCompletion,
        },
      };
      // servicesCopy[service.index] = {
      //   ...service,
      //   completed: serviceCompleted,
      //   options: [],
      //   partialCompletion: {
      //     ...stalePartial,
      //     [stepTitle]: { ...stepCompletion },
      //   },
      // };
      // return servicesCopy;
    });
  };

  const reset = () =>
    updateServices((draft) => {
      draft = servicesJSON;
    });

  return {
    selectService,
    services,
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
