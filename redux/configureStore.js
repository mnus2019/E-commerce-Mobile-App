import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { campsites } from './campsites';
import { coffees } from "./coffees";
import { suites} from "./suites";
import { locations} from "./locations";
import { clothes} from "./clothes";



export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites:campsites, 
      suites: suites,
      coffees: coffees,
      locations: locations,
      clothes:clothes
          
    }),
    compose(
      applyMiddleware(thunk,logger),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );

  return store;
};
