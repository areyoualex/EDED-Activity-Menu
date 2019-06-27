import { combineReducers } from 'redux';

//ACTION CREATORS
function changeFilterTerm(type, term) {
  return { type: "CHANGE_"+type.toUpperCase(), filter: term };
}
function addFilterTerm(type, term) {
  return { type: "ADD_"+type.toUpperCase(), filter: term };
}
function removeFilterTerm(type, term) {
  return { type: "REMOVE_"+type.toUpperCase(), filter: term };
}

export let actions = {changeFilterTerm, addFilterTerm, removeFilterTerm};


//REDUCERS
function category(state = [], action) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.filter];
    case "REMOVE_CATEGORY":
      let s = state;
      let i = s.findIndex(action.filter);
      if (i!==-1) s.splice(i,1);
      return s;
    default:
      return state;
  }
}
function type(state = [], action) {
  switch (action.type) {
    case "ADD_TYPE":
      return [...state, action.filter];
    case "REMOVE_TYPE":
      let s = state;
      let i = s.findIndex(action.filter);
      if (i!==-1) s.splice(i,1);
      return s;
    default:
      return state;
  }
}
function gradeLevel(state = [], action) {
  switch (action.type) {
    case "ADD_GRADE_LEVEL":
      return [...state, action.filter];
    case "REMOVE_GRADE_LEVEL":
      let s = state;
      let i = s.findIndex(action.filter);
      if (i!==-1) s.splice(i,1);
      return s;
    default:
      return state;
  }
}
function points(state = "0-*", action) {
  switch (action.type) {
    case "CHANGE_POINTS":
      return action.filter;
    default:
      return state;
  }
}
function searchTerm(state = "", action) {
  switch (action.type) {
    case "CHANGE_SEARCH_TERM":
      return action.filter;
    default:
      return state;
  }
}

//combine reducers
const filter = combineReducers({
  category,
  type,
  gradeLevel,
  points,
  searchTerm
});

export default filter;
