import { combineReducers, createStore } from 'redux';
import { actions as filterActions } from './filter';
import filter from './filter';

//ACTION CREATORS
function addActivity(activity) {
  return { type: "ADD_DATA", activity };
}
function removeActivity(activity) {
  return { type: "REMOVE_DATA", activity };
}

export let actions = {...filterActions, addActivity, removeActivity};

//REDUCERS
function activities(state = [], action) {
  switch (action.type) {
    case "ADD_DATA":
      let ret = [
        ...state,
        action.activity
      ];
      return ret;
    case "REMOVE_DATA":
      let activities = state.activities;
      let i = activities.findIndex(action.activity);
      if (i!==-1) activities.splice(i,1);
      return activities;
    default:
      return state;
  }
}

//COMBINE REDUCERS
const app = combineReducers({
  activities,
  filter
});

//CREATE STORE
const store = createStore(app);
// store.subscribe(()=>{
//   console.log(store.getState());
// });
export default store;
