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
import axios from "axios";
import AES from "crypto-js/aes";
import encUtf8 from "crypto-js/enc-utf8";

import QuestionnairesContext from "../../../context/questionnaires";
import Questionnaires from "./Questionnaires";

import "./index.css";

export default function App() {
  const bearer =
    "U2FsdGVkX195MBfjRB3n3A+jvrvhf4vOf35h41lEI/fvwHsjN/U55coaj+0ZG8YjrrFTE5yViaSAfLGaAfstPJAJZLm2sehIoLBJZMAO1Bsqgl/tNXni7eIp5goVlQ7ML8TCLaKflzeu9Uy9YDscPg==";
  const { onOpen: onModalOpen } = useDisclosure();
  const [submitLoading, setSubmitLoading] = useState(false);

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

  const postQuestionnaires = async () => {
    setSubmitLoading(true);
    const bearerBytes = AES.decrypt(bearer, key);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerBytes.toString(encUtf8)}`,
    };
    const postData = {
      ...getQuestionsFormValues(),
      time: new Date().toISOString(),
      formId,
    };

    await axios.post(
      "https://api.github.com/repos/trendmicro-tw-hr/questionnaires/dispatches",
      {
        event_type: "submit-request",
        client_payload: {
          questionnaires: JSON.stringify(postData),
        },
      },
      {
        headers: headers,
      }
    );

    setSubmitLoading(false);
    handleNext();
  };

  const postPersonalInfo = async () => {
    setSubmitLoading(true);
    const bearerBytes = AES.decrypt(bearer, key);
    const headers = {
      "Content-Type": "application/json",
      Authorization: bearerBytes.toString(encUtf8),
    };
    const postData = {
      ...getPersonalFormValues(),
      time: new Date().toISOString(),
      formId,
    };

    await axios.post(
      "https://api.github.com/repos/trendmicro/2023-tw-devops-days/dispatches",
      {
        event_type: "submit-request",
        client_payload: {
          users: JSON.stringify(postData),
        },
      },
      {
        headers: headers,
      }
    );

    setSubmitLoading(false);
  };

  const handleSubmit = () => {
    postPersonalInfo();
    onModalOpen();
  };

  const disableNextButton = () => {
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
        return (
          <Button color="primary" variant="shadow" onClick={() => handleNext()}>
            開始填寫
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
            送出
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
            重新填寫
          </Button>
        );
      default:
    }
  };

  return (
    <>
      <Navbar className="flex max-md:px-3 navbar">
        <NavbarBrand className="flex-none max-w-[150px]">
          <div className="max-sm:w-[35px] max-sm:relative overflow-hidden logo-div">
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
            {step !== 0 ? "感恩大放送>>>雞不可失" : ""}
          </h1>
        </NavbarContent>
      </Navbar>
      <article className="flex-grow px-6 pt-6 max-md:px-3 max-md:pt-3">
        <Questionnaires />
      </article>
      <footer className="flex flex-col px-6">
        <div
          className={`flex w-full ${
            step !== maxStep && step >= 2 ? "justify-between" : "justify-end"
          } py-6 max-md:py-3`}
        >
          {step !== maxStep && step >= 2 ? (
            <Button
              color="warning"
              variant="ghost"
              isDisabled={step <= 1}
              onClick={() => handlePrev()}
            >
              上一步
            </Button>
          ) : null}
          {loading ? (
            <Button color="primary" variant="shadow" isDisabled isLoading>
              開始填寫
            </Button>
          ) : (
            renderNextButton()
          )}
        </div>
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
      </footer>
    </>
  );
}
