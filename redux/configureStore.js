import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { campsites } from './campsites';
import { coffees } from "./coffees";
import { suites} from "./suites";
import { locations} from "./locations";
import { clothes} from "./clothes";
import { comments } from './comments';
import { cartItems } from './cartItems';
import { favorites } from './favorites';



export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites:campsites,
      comments:comments, 
      suites: suites,
      coffees: coffees,
      locations: locations,
      clothes:clothes,
      cartItems:cartItems,
      favorites: favorites
          
    }),
    compose(
      applyMiddleware(thunk,logger),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );

  return store;
};
