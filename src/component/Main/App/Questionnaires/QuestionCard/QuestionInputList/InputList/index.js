import React, { useCallback, useEffect, useState } from "react";
import { Input, Tooltip, Button } from "@nextui-org/react";
import { TbRowRemove, TbRowInsertBottom } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export const InputList = ({ placeholder, max, field }) => {
  const { t } = useTranslation("app");
  const [rows, setRows] = useState([]);

  const valueToRows = useCallback(() => {
    const result = field.value.reduce(
      (preValue, currValue, currIndex) =>
        preValue.push({ key: currIndex, value: currValue }) && preValue,
      []
    );
    return result;
  }, [field.value]);

  useEffect(() => {
    setRows(valueToRows());
  }, [setRows, valueToRows]);

  const handleAddOnClick = () => {
    field.value.push("");
    field.onChange(field.value);
  };

  const handleRemoveOnClick = (index) => () => {
    field.value.splice(index, 1);
    field.onChange(field.value);
  };

  const handleInputOnChange = (index) => (e) => {
    field.value[index] = e.target.value;
    field.onChange(field.value);
  };

  return (
    <div className="flex flex-col gap-4 pt-3">
      {field.value.map((row, idx) => (
        <div key={idx} className="flex gap-4">
          <Input
            className="grow-0"
            value={row}
            placeholder={placeholder}
            onChange={handleInputOnChange(idx)}
          />
          <div className="relative flex items-center gap-2">
            <Tooltip
              color="danger"
              content={t("removeTrender")}
              placement="left"
            >
              <Button
                isIconOnly
                color="danger"
                aria-label="Remove"
                isDisabled={rows.length <= 1}
                onClick={handleRemoveOnClick(idx)}
              >
                <TbRowRemove className="text-3xl" />
              </Button>
            </Tooltip>
          </div>
        </div>
      ))}

      <div className="flex px-4 flex-row-reverse justify-center">
        <div className="px-3">
          <Button
            color="success"
            aria-label="Add"
            className="w-40"
            isDisabled={rows.length >= max && max >= 1}
            onClick={handleAddOnClick}
          >
            <TbRowInsertBottom className="text-3xl" />
            {t("addTrender")}
          </Button>
        </div>
      </div>
    </div>
  );
};
