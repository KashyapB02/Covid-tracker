export const defaultState = {
  globalData: {},
  selectedCountry: "Worldwide",
  isSelected: false,
  allCountries: [],
  mapCountries: [],
  casesType: "cases",
  tableData: [],
  infoBox: {},
  mapCenter: { lat: 23.512, lng: 80.329 },
  mapZoom: 4.5,
};

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "FETCH_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload.countries,
        tableData: action.payload.data,
        mapCountries: action.payload.data,
      };
    case "FETCH_GLOBAL":
      return {
        ...state,
        globalData: action.payload,
      };
    case "COUNTRY_CHANGE":
      if (action.payload.name) {
        return {
          ...state,
          isSelected: action.payload.bool,
          mapCenter: action.payload.center,
        };
      } else {
        return {
          ...state,
          isSelected: action.payload.bool,
          mapCenter: action.payload.center,
          selectedCountry: action.payload.country,
          infoBox: action.payload.box,
          mapZoom: action.payload.zoom,
        };
      }
    case "SET_CASE_TYPES":
      return {
        ...state,
        casesType: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
