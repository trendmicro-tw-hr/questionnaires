import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

import QuestionnairesContext from "../../../../../../context/questionnaires";

export const QuestionTextarea = ({ index, placeholder }) => {
  const {
    ctxValue: {
      questionsForm: { control },
    },
  } = useContext(QuestionnairesContext);

  return (
    <Controller
      name={`answer-${index}`}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <Textarea
          {...field}
          variant="faded"
          size="lg"
          placeholder={placeholder}
        />
      )}
    />
  );
};
