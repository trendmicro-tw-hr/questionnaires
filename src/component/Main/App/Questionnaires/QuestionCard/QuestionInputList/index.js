import React, { useContext } from "react";
import { Controller } from "react-hook-form";

import QuestionnairesContext from "../../../../../../context/questionnaires";

import { InputList } from "./InputList";

export const QuestionInputList = ({ index, placeholder, max }) => {
  const {
    ctxValue: {
      questionsForm: { control },
    },
  } = useContext(QuestionnairesContext);

  return (
    <Controller
      name={`answer-${index}`}
      control={control}
      defaultValue={[""]}
      render={({ field }) => {
        return <InputList {...{ placeholder, max, field }} />;
      }}
    />
  );
};
