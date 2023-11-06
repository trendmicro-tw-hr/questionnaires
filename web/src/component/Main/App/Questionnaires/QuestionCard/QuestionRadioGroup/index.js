import React, { useContext, useRef } from "react";
import { Controller } from "react-hook-form";
import { RadioGroup } from "@nextui-org/react";

import QuestionnairesContext from "../../../../../../context/questionnaires";
import { QuestionRadio } from "./QuestionRadio";
import { QuestionRadioOthers } from "./QuestionRadioOthers";

export const QuestionRadioGroup = ({ index, answers, otherAnswer, step }) => {
  const childRef = useRef();
  const {
    ctxValue: {
      questionsForm: { control },
    },
  } = useContext(QuestionnairesContext);

  const groupList = answers.map((answer) => {
    return (
      <QuestionRadio key={`${index}-${answer}`} value={answer} size="lg">
        {answer}
      </QuestionRadio>
    );
  });

  if (otherAnswer) {
    groupList.push(
      <QuestionRadioOthers
        {...{
          key: `${index}-other`,
          step,
          name: `answer-${index}`,
          radioOthersRef: childRef,
        }}
      />
    );
  }
  return (
    <Controller
      name={`answer-${index}`}
      control={control}
      defaultValue={""}
      render={({ field }) => (
        <RadioGroup
          {...field}
          onChange={(e) => {
            if (childRef.current) childRef.current.updateSelect();
            field.onChange(e);
          }}
        >
          {groupList}
        </RadioGroup>
      )}
    />
  );
};
