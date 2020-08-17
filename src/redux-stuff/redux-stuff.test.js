import servicesReducer, {
  toggleServiceSelected,
  INITIAL_STATE,
} from "./serviceSlice";

describe("Getting started with Redux", () => {
  describe("services reducer", () => {
    it("should return the default state", () => {
      expect(servicesReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it("should add a newly selected service when toggle is called", () => {
      expect(servicesReducer(INITIAL_STATE, toggleServiceSelected(1))).toEqual({
        ...INITIAL_STATE,
        browsAndLashes: [1],
      });
    });

    it("should remove a service when toggle is called if already selected", () => {
      expect(
        servicesReducer({ browsAndLashes: [1] }, toggleServiceSelected(1))
      ).toEqual({
        browsAndLashes: [],
      });
    });

    it("has a working 'isDoingFacialSelector'", () => {
        const facial:  = {

        }
      expect(servicesReducer({services: []}))
    });
  });
});
