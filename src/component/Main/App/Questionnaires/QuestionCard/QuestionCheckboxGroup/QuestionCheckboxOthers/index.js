import React, { useContext, useImperativeHandle, useState } from "react";
import { Checkbox, Input } from "@nextui-org/react";
import QuestionnairesContext from "../../../../../../../context/questionnaires";
import { useTranslation } from "react-i18next";

export const QuestionCheckboxOthers = ({
  step,
  name,
  radioCheckboxRef,
  isMax,
  fieldValue,
  maxIgnoresOtherAnswer,
}) => {
  const [dataSelected, setDataSelected] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState("");
  const { t } = useTranslation("app");

  const {
    ctxValue: {
      questionsForm: { setValue, getValues },
    },
  } = useContext(QuestionnairesContext);

  useImperativeHandle(radioCheckboxRef, () => ({
    updateSelect: () => {
      setDataSelected(getValues(name).includes(checkboxValue));
    },
  }));

  const handleChange = (e) => {
    const prevValue = getValues(name);

    const existIdx = prevValue.indexOf(checkboxValue);
    if (existIdx !== -1) prevValue.splice(existIdx, 1);

    setValue(name, [...prevValue, e.target.value]);
    setCheckboxValue(e.target.value);

    setDataSelected(true);

    e.stopPropagation();
  };

  const handleCheckboxChange = (e) => {
    radioCheckboxRef.current.updateSelect();
  };

  const handleClick = () => {
    if (isMax && fieldValue.indexOf(checkboxValue) <= -1) return;
    const nextValue = getValues(name);

    const existIdx = nextValue.indexOf(checkboxValue);
    if (existIdx !== -1) {
      nextValue.splice(existIdx, 1);
      setCheckboxValue("");
    } else {
      nextValue.push(checkboxValue);
    }

    setValue(name, nextValue);

    radioCheckboxRef.current.updateSelect();
  };

  return (
    <div
      data-selected={dataSelected}
      key={`${step}-other-checkbox`}
      onClick={handleClick}
      className="flex gap-4 p-4 max-md:p-1 cursor-pointer rounded-lg border-2 border-transparent border-transparent bg-content1 hover:bg-content4 flex-row-reverse border-2 border-transparent data-[selected=true]:border-primary"
    >
      <Checkbox
        className="flex-none"
        value={checkboxValue}
        size="lg"
        onChange={handleCheckboxChange}
        isDisabled={
          !maxIgnoresOtherAnswer &&
          isMax &&
          fieldValue.indexOf(checkboxValue) <= -1
        }
      />
      <Input
        className="grow other-input"
        labelPlacement="outside-left"
        label={t("othersLabel")}
        placeholder={t("othersPlaceholder")}
        description={t("othersDescription")}
        onChange={handleChange}
        value={checkboxValue}
        isDisabled={
          !maxIgnoresOtherAnswer &&
          isMax &&
          fieldValue.indexOf(checkboxValue) <= -1
        }
      />
    </div>
  );
};
