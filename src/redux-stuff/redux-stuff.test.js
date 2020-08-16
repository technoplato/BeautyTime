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
  });

  describe("actions", () => {
    describe("toggleSelected", () => {
      test("should create an action to toggle service selected status", () => {
        const serviceId = 1;
        const expectedAction = {
          type: "session/toggleServiceSelected",
          payload: serviceId,
        };

        expect(toggleServiceSelected(1)).toEqual(expectedAction);
      });
    });
  });
});
