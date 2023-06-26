import {
  ProductBrands,
  Service,
  ServiceBrandMap,
  ServiceNames,
} from "../types";

const minutesToSeconds = (minutes: number) => minutes * 60;

const _3minutes = minutesToSeconds(3);
const _4minutes = minutesToSeconds(4);
const _5minutes = minutesToSeconds(5);
const _6minutes = minutesToSeconds(6);
const _8minutes = minutesToSeconds(8);
const _10minutes = minutesToSeconds(10);
const _12minutes = minutesToSeconds(12);

const browLamination: Service = {
  id: "service:2",
  name: ServiceNames.browLamination,
  variants: [
    {
      name: "Fine brows",
      durations: [_4minutes, _4minutes],
      brand: ProductBrands.ElleeplexProFusion,
    },
    {
      name: "Medium brows",
      durations: [_6minutes, _6minutes],
      brand: ProductBrands.ElleeplexProFusion,
    },
    {
      name: "Strong brows",
      durations: [_10minutes, _8minutes],
      brand: ProductBrands.ElleeplexProFusion,
    },
  ],
  steps: [
    {
      title: "Apply Packet #1",
    },
    {
      title: "Apply Packet #2",
    },
  ],
};

const lashLiftAndTint: Service = {
  id: "service:3",
  name: ServiceNames.lashLiftAndTint,
  variants: [
    /***************************************************************************
     * Beautiful Brows and Lashes
     **************************************************************************/
    {
      name: "Very fine lashes",
      durations: [_5minutes, _5minutes, _3minutes],
      brand: ProductBrands.BeautifulBrowsAndLashes,
    },
    {
      name: "Fine or tinted lashes",
      durations: [_6minutes, _5minutes, _3minutes],
      brand: ProductBrands.BeautifulBrowsAndLashes,
    },
    {
      name: "Natural healthy lashes",

      durations: [_8minutes, _6minutes, _3minutes],
      brand: ProductBrands.BeautifulBrowsAndLashes,
    },
    {
      name: "Coarse healthy lashes",

      durations: [_10minutes, _6minutes, _3minutes],
      brand: ProductBrands.BeautifulBrowsAndLashes,
    },
    /***************************************************************************
     * Sarah Maxwell
     **************************************************************************/
    {
      name: "Weak, sparse or dry lashes",
      durations: [_8minutes, _6minutes, _3minutes],
      brand: ProductBrands.SarahMaxwell,
    },
    {
      name: "Natural healthy lashes",

      durations: [_10minutes, _8minutes, _3minutes],
      brand: ProductBrands.SarahMaxwell,
    },
    {
      name: "Coarse healthy lashes",
      durations: [_12minutes, _10minutes, _3minutes],
      brand: ProductBrands.SarahMaxwell,
    },
  ],
  steps: [
    {
      title: /* Lifting */ "Lift",
    },
    {
      title: /* Setting */ "Set",
    },
    {
      title: "Apply Tint",
    },
  ],
};

export const initialServicesCatalog: Readonly<Array<Service>> = [
  browLamination,
  lashLiftAndTint,
] as const;

// By default, we use the brand of the first variant of each respective
// service to create a map of service names to brands.
export const initialServiceBrandMap: Readonly<ServiceBrandMap> =
  initialServicesCatalog.reduce((acc, service) => {
    acc[service.name] = service.variants[0].brand;
    return acc;
  }, {} as ServiceBrandMap);
