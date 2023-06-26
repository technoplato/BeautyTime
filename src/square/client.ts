// import { ___j } from "../utilities/logging";
// import { bookingsFixture } from "./bookingsFixtures";
//
// // Replace YOUR_ACCESS_TOKEN and YOUR_LOCATION_ID with your actual access token and location ID
// const SQUARE_API_URL = "https://connect.squareup.com/v2";
// const ACCESS_TOKEN =
//   "TOKEN TOKEN YOUR TOKEN TOKEN";
//
// export const getNextAppointment = async () => {
//   const currentTime = new Date().toISOString();
//
//   const requestOptions = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${ACCESS_TOKEN}`,
//     },
//   };
//   // https://developer.squareup.com/explorer/square/catalog-api/retrieve-catalog-object
//   const json = await fetch(
//     `${SQUARE_API_URL}/bookings?start_at_min=${currentTime}&status=ACCEPTED`,
//     requestOptions
//   ).then((response) => response.json());
//   // const appointments= json.bookings[0].object;
//   const appointments = await Promise.all(
//     bookingsFixture
//       // json.bookings
//       // @ts-ignore
//       .map(async (appointment) => {
//         const services = await getServicesForAppointment(appointment);
//         const smallServices = services.map((service) => {
//           const itemData = service.related_objects[0].item_data;
//           const itemVariationData = service.object.item_variation_data;
//           const newVar = {
//             id: appointment.id,
//             name: itemData.name,
//             description: itemData.description,
//             duration_unkownTimeunit: itemVariationData.service_duration,
//           };
//           return newVar;
//         });
//
//         // map each ID to a summary of how many times that ID appears in the array and include name and duraiton
//
//         const newVar1 = {
//           ...appointment,
//           // services: smallServices,
//           services,
//         };
//         return newVar1;
//       })
//   );
//   ___j(appointments);
//   const slimAppointments = appointments.map((appointment) => {
//     const { id, services } = appointment;
//     const slimServices = services.map((service) => {
//       // const { object, related_objects } = service;
//       // const itemVariationData = object.item_variation_data;
//       // const relatedObject = related_objects[0];
//       // const objectId = object.id;
//       // const itemId = itemVariationData.item_id;
//       // const relatedObjectId = relatedObject.id;
//       // const relatedObjectItemData = relatedObject.item_data;
//       // const name = relatedObjectItemData.name;
//       // const relatedObjectItemDataVariation =
//       //   relatedObjectItemData.variations[0];
//       // const itemVariationId = relatedObjectItemDataVariation.id;
//       function extractIdProperties(obj) {
//         const excludedKeys = [
//           "object.item_variation_data.location_overrides",
//           "object.item_variation_data.nam",
//           "object.item_variation_data.team_member_ids",
//           "related_objects.0.item_data.variations.0.item_variation_data.name",
//           "related_objects.0.item_data.variations.0.item_variation_data.location_overrides",
//           "related_objects.0.item_data.variations.0.item_variation_data.team_member_ids",
//         ];
//         let result = {};
//         for (const [key, value] of Object.entries(obj)) {
//           // if (excludedKeys.includes(key) || excludedValues.includes(value)) {
//           //   continue;
//           // }
//           if (key.includes("id")) {
//             result[key] = value;
//           } else if (key.includes("name")) {
//             result[key] = value;
//           } else if (typeof value === "object") {
//             const nestedIdProperties = extractIdProperties(value);
//             for (const [nestedKey, nestedValue] of Object.entries(
//               nestedIdProperties
//             )) {
//               result[`${key}.${nestedKey}`] = nestedValue;
//             }
//           }
//         }
//
//         for (excludedKey of excludedKeys) {
//           delete result[excludedKey];
//         }
//
//         return result;
//       }
//
//       const newVar = extractIdProperties(service);
//       return newVar;
//     });
//
//     const appt = {
//       id,
//       services: slimServices,
//     };
//     return appt;
//   });
//
//   ___j(slimAppointments);
//
//   // Collect all services form all appointments
//   const allServices = appointments.flatMap(
//     (appointment) => appointment.services
//   );
//   // Count how many times each service appears
//   const serviceCounts = allServices.reduce((acc, service) => {
//     const count = acc[service.id]?.count || 0;
//     return {
//       ...acc,
//       [service.id]: { count: count + 1, name: service.name },
//     };
//   }, {});
// };
//
// async function getServicesForAppointment(appointment: SquareAppointment) {
//   const serviceRequests = appointment.appointment_segments
//     .map((segment) => segment.service_variation_id)
//     .map(async (serviceVariationId) => {
//       const requestOptions = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//       };
//       // curl https://connect.squareup.com/v2/catalog/object/5NVLKMBLWIDSTJL7M52JQMGN?include_related_objects=true \
//
//       return fetch(
//         `${SQUARE_API_URL}/catalog/object/${serviceVariationId}?include_related_objects=true`,
//         requestOptions
//       )
//         .then((response) => response.json())
//         .catch((error) => {
//           ___j(error);
//         });
//     });
//
//   const services = await Promise.all(serviceRequests);
//   return services;
// }
//
// // type BookingResponse = {
// //   bookings: SquareAppointment[];
// //   errors: Error[];
// //   cursor: string | null;
// // };
//
// export type SquareAppointment = {
//   id: string;
//   version: number;
//   status: string;
//   created_at: string;
//   updated_at: string;
//   location_id: string;
//   customer_id: string;
//   customer_note: string;
//   seller_note: string;
//   start_at: string;
//   appointment_segments: AppointmentSegment[];
// };
//
// type AppointmentSegment = {
//   duration_minutes: number;
//   service_variation_id: string;
//   team_member_id: string;
//   service_variation_version: number;
// };
//
// type Error = {
//   category: string;
//   code: string;
//   detail: string;
// };
//
// // type CatalogObjectResponse = {
// //   object: CatalogObject;
// // };
//
// export type SquareCatalogObject = {
//   type: string;
//   id: string;
//   is_deleted: boolean;
//   present_at_all_locations: boolean;
//   item_data: ItemData;
//   related_objects: RelatedObject[];
// };
//
// type ItemData = {
//   name: string;
//   description: string;
//   category_id: string;
//   variations: ItemVariation[];
// };
//
// type ItemVariationData = {
//   item_id: string;
//   name: string;
//   ordinal: number;
//   pricing_type: string;
//   price_money: {
//     amount: number;
//     currency: string;
//   };
//   service_duration: number;
//   available_for_booking: boolean;
//   no_show_fee: {
//     amount: number;
//     currency: string;
//   };
//   transition_time: number;
//   sellable: boolean;
//   stockable: boolean;
//   team_member_ids: string[];
// };
//
// type ItemVariation = {
//   type: string;
//   id: string;
//   updated_at: string;
//   version: number;
//   is_deleted: boolean;
//   present_at_all_locations: boolean;
//   item_variation_data: ItemVariationData;
// };
//
// type RelatedObject = {
//   type: string;
//   id: string;
//   item_data: ItemData;
// };
//
// type PriceMoney = {
//   amount: number;
//   currency: string;
// };
