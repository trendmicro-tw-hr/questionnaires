import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Image,
  Button,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { useTranslation, Trans } from "react-i18next";

import { postQuestionnairesData, postUsersData } from "../../../utils/api";

import QuestionnairesContext from "../../../context/questionnaires";
import Questionnaires from "./Questionnaires";
import ResultModel from "./ResultModel";

import "./index.css";

export default function App() {
  const {
    onOpen: onResultModalOpen,
    isOpen: isResultModalOpen,
    onOpenChange: onResultModalOpenChange,
  } = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);
  const cookies = new Cookies(null, { path: "/", maxAge: 2630000 });
  const { i18n } = useTranslation([
    "app",
    "welcome_card",
    "questionnaires",
    "thanks",
    "result",
  ]);

  const {
    ctxValue: {
      step,
      maxStep,
      key,
      formId,
      loading,
      questions,
      questionNo,
      nextText,
    },
    setStep,
    setQuestionsForm,
    setPersonalForm,
  } = useContext(QuestionnairesContext);

  const questionsForm = useForm({});
  const { getValues: getQuestionsFormValues, watch: questionsWatch } =
    questionsForm;

  const personalForm = useForm({});
  const { getValues: getPersonalFormValues, watch: personalWatch } =
    personalForm;

  useEffect(() => {
    setQuestionsForm(questionsForm);
    setPersonalForm(personalForm);
  }, [setQuestionsForm, questionsForm, setPersonalForm, personalForm]);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(step + 1);
  };

  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(step - 1);
  };

  const handleShowResult = () => {
    onResultModalOpen();
  };

  const processStrUpperCase = (string) => {
    const result = string
      .replace(/(-|_)+/i, " ")
      .replace(/\s{2,}/i, " ")
      .trim();
    const resultArr = result
      .split(" ")
      .reduce(
        (prevValue, curValue) =>
          prevValue.push(
            curValue.charAt(0).toUpperCase() + curValue.slice(1)
          ) && prevValue,
        []
      );

    return resultArr.join(" ");
  };

  const postQuestionnaires = async () => {
    setSubmitLoading(true);

    const forData = getQuestionsFormValues();
    Object.keys(forData).forEach((key) => {
      if (key.indexOf("answer-") >= 0) {
        cookies.set(`${questions.title}.${key}`, forData[key]);
      }

      if (!Array.isArray(forData[key])) return;

      const questionsIdx = key.split("answer-")[1] ?? -1;
      const questionsConfig = questions[questionsIdx] ?? {};

      if (questionsConfig.answerUpperCase) {
        forData[key].forEach((val, idx) => {
          forData[key][idx] = processStrUpperCase(val);
        });
      }

      if (questionsConfig.otherAnswer) {
        forData[key].forEach((val) => {
          const multipleVal = val
            .split(",")
            .reduce((prev, current) => prev.push(current.trim()) && prev, []);
          if (multipleVal.length >= 2) {
            forData[key] = forData[key].filter((item) => item !== val);
            forData[key].push(...multipleVal);
          }
        });
      }
    });

    await postQuestionnairesData(
      {
        ...forData,
        time: new Date().toISOString(),
        formId,
      },
      { key }
    );

    setSubmitLoading(false);
    handleNext();
  };

  const postPersonalInfo = async () => {
    setSubmitLoading(true);

    await postUsersData(
      {
        ...getPersonalFormValues(),
        time: new Date().toISOString(),
        formId,
      },
      { key }
    );

    setSubmitLoading(false);
    handleShowResult();
  };

  const handleSubmit = () => {
    postPersonalInfo();
  };

  const disableNextButton = () => {
    if (questions[questionNo - 1]?.allowEmptyValue ?? false) return false;

    const answer = questionsWatch(`answer-${questionNo - 1}`);
    if (Array.isArray(answer)) {
      return answer.filter((el) => el).length <= 0;
    } else {
      return answer === "";
    }
  };

  const disableFinishButton = () => {
    const answer = personalWatch([
      "name",
      "email",
      "company",
      "getRecruitInfo",
    ]);
    return answer.filter((value) => value !== "").length < 4;
  };

  const renderNextButton = () => {
    switch (true) {
      case step <= 0:
        if (typeof cookies.get(`${questions.title}.answer-0`) !== "undefined") {
          return (
            <Button
              color="warning"
              variant="shadow"
              onClick={() => handleNext()}
            >
              <Trans i18nKey="startAgain" ns="app">
                提醒你已經填寫過囉!(每人一次抽獎機會)
              </Trans>
            </Button>
          );
        }
        return (
          <Button color="primary" variant="shadow" onClick={() => handleNext()}>
            <Trans i18nKey="start" ns="app">
              開始填寫
            </Trans>
          </Button>
        );
      case step <= maxStep - 2:
        return (
          <Button
            color="primary"
            variant="shadow"
            isDisabled={disableNextButton()}
            onClick={() => handleNext()}
          >
            {nextText}
          </Button>
        );
      case step <= maxStep - 1:
        return (
          <Button
            color="success"
            variant="shadow"
            isDisabled={disableNextButton()}
            onClick={() => postQuestionnaires()}
            isLoading={submitLoading}
          >
            <Trans i18nKey="submit" ns="app">
              送出
            </Trans>
          </Button>
        );
      case step === maxStep:
        return (
          <Button
            color="success"
            variant="shadow"
            isDisabled={disableFinishButton()}
            onClick={() => handleSubmit()}
            isLoading={submitLoading}
          >
            <Trans i18nKey="complete" ns="app">
              登記抽 Kudos Points 200點
            </Trans>
          </Button>
        );
      default:
    }
  };

  const handleSwitchLang = () => {
    switch (i18n.language) {
      case "en":
        i18n.changeLanguage("zh-tw");
        break;
      case "zh-tw":
        i18n.changeLanguage("en");
        break;
      default:
    }
  };

  return (
    <>
      <Navbar className="flex max-md:px-3 navbar">
        <NavbarBrand className="flex-none max-w-[150px]">
          <div
            className={`${
              (step >= 1 && "max-sm:w-[35px]") || ""
            } max-sm:relative overflow-hidden logo-div`}
          >
            <Image
              width={150}
              alt="Trend Micro"
              src={process.env.PUBLIC_URL + "/logo.png"}
            />
          </div>
        </NavbarBrand>
        <NavbarContent
          className="grow justify-end md:justify-center"
          justify="none"
        >
          <h1 className="text-2xl max-md:text-base font-bold text-inherit">
            {step !== 0 ? (
              <Trans i18nKey="thanksgivingSpecial" ns="app">
                <span className="text-4xl max-md:text-2xl">感恩大放送</span>
                <span>{" >>> "}</span>
                <span>“雞”不可失</span>
              </Trans>
            ) : (
              ""
            )}
          </h1>
        </NavbarContent>
      </Navbar>
      <article className="flex-grow px-6 pt-6 max-md:px-3 max-md:pt-3">
        <Questionnaires />
        <ResultModel
          isOpen={isResultModalOpen}
          onOpenChange={onResultModalOpenChange}
        />
      </article>
      <footer className="flex flex-col px-6">
        <div
          className={`flex w-full ${
            step === 1 ? "justify-end" : "justify-between"
          } py-6 max-md:py-3`}
        >
          {step !== maxStep && step >= 2 ? (
            <Button
              color="warning"
              variant="ghost"
              isDisabled={step <= 1}
              onClick={() => handlePrev()}
            >
              <Trans i18nKey="previous" ns="app">
                上一步
              </Trans>
            </Button>
          ) : null}

          {step <= 0 ? (
            <Button
              color="secondary"
              variant="ghost"
              onClick={handleSwitchLang}
            >
              <Trans i18nKey="switchLanguage" ns="app">
                切換語言
              </Trans>
            </Button>
          ) : null}
          {step === maxStep && step >= 2 ? (
            <>
              <Button
                color="danger"
                variant="ghost"
                onClick={() => handleShowResult()}
              >
                <Trans i18nKey="giveUp" ns="app">
                  放棄抽獎
                </Trans>
              </Button>
            </>
          ) : null}
          {loading ? (
            <Button color="primary" variant="shadow" isDisabled isLoading>
              <Trans i18nKey="start" ns="app">
                開始填寫
              </Trans>
            </Button>
          ) : (
            renderNextButton()
          )}
        </div>

        {step === 0 || step === maxStep ? null : (
          <Progress
            size="md"
            value={questionNo}
            label={<></>}
            valueLabel={`${questionNo} / ${questions.length}`}
            maxValue={questions.length}
            color="success"
            showValueLabel={true}
            className="w-full pb-4"
          />
        )}
      </footer>
    </>
  );
}
