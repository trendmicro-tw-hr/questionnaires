import React, { useContext, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
      step: currentStep,
      questionsForm: { control },
    },
    setQuestionNo,
    setNextText,
  } = useContext(QuestionnairesContext);
  const { t } = useTranslation(["questionnaires", "app"]);

  useEffect(() => {
    if (currentStep === step) {
      setQuestionNo(index + 1);
      setNextText(
        questions[index].help
          ? t("submit", { ns: "app" })
          : t("next", { ns: "app" })
      );
    }
  }, [step, currentStep, setQuestionNo, index, setNextText, questions, t]);

  const {
    question = "",
    description = "",
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
        return <QuestionTextarea placeholder={t(placeholder)} {...{ index }} />;
      case "inputList":
        return (
          <QuestionInputList placeholder={t(placeholder)} {...{ max, index }} />
        );
      default:
        break;
    }
  };

  const processOptionsText = () => {
    let result = [];
    if (type === "checkbox") result.push(t("multipleChoice", { ns: "app" }));
    if (max >= 1) result.push(t("maxItem", { ns: "app", max }));
    if (description !== "") result = [t(description)];

    const resultText = result.join("、");
    return resultText !== "" ? ` (${resultText})` : null;
  };
  return (
    <Card className={`flex-0 w-full ${currentStep !== step ? "h-0" : ""}`}>
      <CardHeader className="flex gap-3">
        <RiQuestionAnswerFill className="w-10 h-10" />
        <div className={`text-lg ${(processOptionsText() && "h-full") || ""}`}>
          <strong>{index + 1}.</strong>
        </div>
        <div className="flex">
          <span className="text-lg">
            <p>
              <strong>{t(question)}</strong>
            </p>
            <p className="text-base">{processOptionsText()}</p>
          </span>
        </div>
      </CardHeader>
      <Divider />
      <Controller
        name={`question-${index}`}
        control={control}
        defaultValue={question}
        render={() => {}}
      />
      <CardBody>{renderCardBody()}</CardBody>
    </Card>
  );
}
