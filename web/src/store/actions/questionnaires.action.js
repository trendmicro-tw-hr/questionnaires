import * as actionType from "./questionnaires.actionType";

export const setStep = (payload) => {
  return {
    type: actionType.SET_STEP,
    payload,
  };
};

export const setMaxStep = (payload) => {
  return {
    type: actionType.SET_MAX_STEP,
    payload,
  };
};

export const setQuestions = (payload) => {
  return {
    type: actionType.SET_QUESTIONS,
    payload,
  };
};

export const setKey = (payload) => {
  return {
    type: actionType.SET_KEY,
    payload,
  };
};

export const setQuestionNo = (payload) => {
  return {
    type: actionType.SET_QUESTION_NO,
    payload,
  };
};

export const setNextText = (payload) => {
  return {
    type: actionType.SET_NEXT_TEXT,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: actionType.SET_LOADING,
    payload,
  };
};

export const setQuestionsForm = (payload) => {
  return {
    type: actionType.SET_QUESTIONS_FORM,
    payload,
  };
};

export const setPersonalForm = (payload) => {
  return {
    type: actionType.SET_PERSONAL_FORM,
    payload,
  };
};

export const setFormId = (payload) => {
  return {
    type: actionType.SET_FORM_ID,
    payload,
  };
};

export const resetToDefault = () => {
  return {
    type: actionType.RESET_TO_DEFAULT,
  };
};
