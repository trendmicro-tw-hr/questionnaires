import React, { useContext, useEffect } from "react";
import { Card, CardBody, Divider, Input, CardHeader } from "@nextui-org/react";
import { BsChatTextFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import QuestionnairesContext from "../../../../../context/questionnaires";

export default function ThanksCard({ step }) {
  const {
    ctxValue: {
      step: currentStep,
      personalForm: { control },
    },
    setMaxStep,
  } = useContext(QuestionnairesContext);
  const { t } = useTranslation("thanks");

  useEffect(() => {
    setMaxStep(step);
  }, [setMaxStep, step]);

  const renderForm = () => {
    if (!control) return null;

    return (
      <>
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <Input
              {...field}
              className="flex-1"
              key="name"
              label={t("name")}
              labelPlacement="outside"
              placeholder="Apple Hong"
              size="lg"
              startContent={
                <FaUserAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <Input
              {...field}
              className="flex-1"
              key="email"
              type="email"
              label={t("email")}
              labelPlacement="outside"
              placeholder="apple_hong@trendmicro.com"
              size="lg"
              startContent={
                <HiOutlineMailOpen className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          )}
        />
      </>
    );
  };
  return (
    <Card className={`flex-0 w-full ${currentStep !== step ? "h-0" : ""}`}>
      <CardHeader className="flex gap-3">
        <BsChatTextFill className="w-10 h-10" />
        <div className="flex flex-col">
          <p className="text-2xl">{t("header-1")}</p>
          <p className="text-2xl">{t("header-2")}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex py-5 gap-4 flex-col">{renderForm()}</div>
      </CardBody>
    </Card>
  );
}
