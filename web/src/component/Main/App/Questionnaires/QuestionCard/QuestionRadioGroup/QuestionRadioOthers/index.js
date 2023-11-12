import React, { useContext, useImperativeHandle, useState } from "react";
import { Radio, Input } from "@nextui-org/react";

import QuestionnairesContext from "../../../../../../../context/questionnaires";

export const QuestionRadioOthers = ({ step, name, radioOthersRef }) => {
  const [dataSelected, setDataSelected] = useState(false);
  const [radioValue, setRadioValue] = useState("其他");

  const {
    ctxValue: {
      questionsForm: { setValue },
    },
  } = useContext(QuestionnairesContext);

  useImperativeHandle(radioOthersRef, () => ({
    updateSelect: () => {
      setDataSelected(false);
    },
  }));

  const handleChange = (e) => {
    setValue(name, e.target.value);
    setRadioValue(e.target.value);

    setDataSelected(true);
  };

  const handleClick = () => {
    setDataSelected(true);
    setValue(name, radioValue);
  };

  return (
    <div
      data-selected={dataSelected}
      key={`${step}-other-radio`}
      onClick={handleClick}
      className="flex gap-4 p-4 cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent border-transparent bg-content1 hover:bg-content4 flex-row-reverse border-2 border-transparent data-[selected=true]:border-primary"
    >
      <Radio className="flex-none" value={radioValue} size="lg"></Radio>
      <Input
        className="grow other-input"
        labelPlacement="outside-left"
        label="其他"
        placeholder="其他1 , 其他2 , 其他3 ..."
        description="提示：請用 , 分隔多個答案"
        onChange={handleChange}
      />
    </div>
  );
};
