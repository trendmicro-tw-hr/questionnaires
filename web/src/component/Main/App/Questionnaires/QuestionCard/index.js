import React, { useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Controller } from "react-hook-form";

import QuestionnairesContext from "../../../../../context/questionnaires";

import { QuestionRadioGroup } from "./QuestionRadioGroup";
import { QuestionInputList } from "./QuestionInputList";
import { QuestionTextarea } from "./QuestionTextarea";
import { QuestionCheckboxGroup } from "./QuestionCheckboxGroup";

import "./index.css";

export default function QuestionCard({ step, index }) {
  const {
    ctxValue: {
      questions,
      loading,
      step: currentStep,
      questionsForm: { control },
    },
    setQuestionNo,
    setNextText,
  } = useContext(QuestionnairesContext);

  useEffect(() => {
    if (currentStep === step) {
      setQuestionNo(index + 1);
      setNextText(questions[index].help ? "送出" : "下一題");
    }
  }, [step, currentStep, setQuestionNo, index, setNextText, questions]);

  const {
    question = "",
    answers = [],
    type = "",
    otherAnswer = false,
    placeholder = "Input Some Description",
    max = 0,
  } = questions[index] ?? {};

  if (type === "") return null;

  const renderCardBody = () => {
    switch (type) {
      case "radio":
        return (
          <QuestionRadioGroup {...{ index, answers, otherAnswer, step, max }} />
        );
      case "checkbox":
        return (
          <QuestionCheckboxGroup
            {...{ index, answers, otherAnswer, step, max }}
          />
        );
      case "textarea":
        return <QuestionTextarea {...{ index, placeholder }} />;
      case "inputList":
        return <QuestionInputList {...{ placeholder, max, index }} />;
      default:
        break;
    }
  };

  const processOptionsText = () => {
    const result = [];
    if (type === "checkbox") result.push("多選");
    if (max >= 1) result.push(`最多選 ${max} 個`);

    const resultText = result.join("、");
    return resultText !== "" ? ` (${resultText})` : null;
  };
  return (
    <Card className={`flex-0 w-full ${currentStep !== step ? "h-0" : ""}`}>
      <Skeleton isLoaded={!loading} className="rounded-lg rounded-b-none">
        <CardHeader className="flex gap-3">
          <RiQuestionAnswerFill className="w-10 h-10" />
          <div className="flex">
            <p className="text-md">
              {question}
              {processOptionsText()}
            </p>
          </div>
        </CardHeader>
      </Skeleton>
      <Divider />
      <Skeleton
        isLoaded={!loading}
        className="rounded-lg h-full rounded-t-none"
      >
        <Controller
          name={`question-${index}`}
          control={control}
          defaultValue={question}
          render={() => {}}
        />
        <CardBody>{renderCardBody()}</CardBody>
      </Skeleton>
    </Card>
  );
}
