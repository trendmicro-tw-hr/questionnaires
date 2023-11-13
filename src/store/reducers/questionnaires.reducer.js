import _ from "lodash";

import * as actionType from "../actions/questionnaires.actionType";

export const initialState = {
  step: 0,
  maxStep: 0,
  questions: [],
  key: "",
  nextText: "下一題",
  loading: true,
  questionsForm: {},
  personalForm: {},
  formId: "",
  questionNo: 0,
};

const azurePageReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case actionType.SET_MAX_STEP:
      return {
        ...state,
        maxStep: action.payload,
      };
    case actionType.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case actionType.SET_KEY:
      return {
        ...state,
        key: action.payload,
      };
    case actionType.SET_QUESTION_NO:
      return {
        ...state,
        questionNo: action.payload,
      };
    case actionType.SET_NEXT_TEXT:
      return {
        ...state,
        nextText: action.payload,
      };
    case actionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionType.SET_QUESTIONS_FORM:
      return {
        ...state,
        questionsForm: action.payload,
      };
    case actionType.SET_PERSONAL_FORM:
      return {
        ...state,
        personalForm: action.payload,
      };
    case actionType.SET_FORM_ID:
      return {
        ...state,
        formId: action.payload,
      };
    case actionType.RESET_TO_DEFAULT:
      return _.cloneDeep(initialState);
    default:
      return state;
  }
};

export default azurePageReducer;
