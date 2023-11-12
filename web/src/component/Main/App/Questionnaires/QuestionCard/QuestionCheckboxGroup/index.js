import React, { useContext, useRef } from "react";
import { Controller } from "react-hook-form";
import { CheckboxGroup } from "@nextui-org/react";

import QuestionnairesContext from "../../../../../../context/questionnaires";
import { QuestionCheckbox } from "./QuestionCheckbox";
import { QuestionCheckboxOthers } from "./QuestionCheckboxOthers";

export const QuestionCheckboxGroup = ({
  index,
  answers,
  otherAnswer,
  step,
  max,
}) => {
  const childRef = useRef();
  const {
    ctxValue: {
      questionsForm: { control },
    },
  } = useContext(QuestionnairesContext);

  const renderGroupList = (isMax, fieldValue) => {
    const groupList = answers.map((answer) => {
      return (
        <QuestionCheckbox
          key={`${index}-${answer.name}`}
          value={answer.name}
          size="lg"
          isDisabled={isMax && fieldValue.indexOf(answer.name) <= -1}
        >
          <p>{answer.name}</p>
          {answer.description ? <p className="text-foreground/70">({answer.description})</p> : null}
        </QuestionCheckbox>
      );
    });

    if (otherAnswer) {
      groupList.push(
        <QuestionCheckboxOthers
          {...{
            key: `${index}-other`,
            step,
            name: `answer-${index}`,
            radioCheckboxRef: childRef,
            isMax: isMax,
            fieldValue: fieldValue,
          }}
        />
      );
    }

    return groupList;
  };

  return (
    <Controller
      name={`answer-${index}`}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const isMax = max >= 1 && field.value.length >= max;
        return (
          <CheckboxGroup
            {...field}
            onChange={(e) => {
              if (childRef.current) childRef.current.updateSelect();

              field.onChange(e);
            }}
          >
            {renderGroupList(isMax, field.value)}
          </CheckboxGroup>
        );
      }}
    />
  );
};
