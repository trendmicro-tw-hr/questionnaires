import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { TbRowRemove, TbRowInsertBottom } from "react-icons/tb";

export const InputList = ({ placeholder, max, field }) => {
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
    <>
      <Table hideHeader aria-label="Input List">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn width="50">ACTION</TableColumn>
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>
                <Input
                  value={item.value}
                  placeholder={placeholder}
                  onChange={handleInputOnChange(item.key)}
                />
              </TableCell>
              <TableCell width="50">
                <div className="relative flex items-center gap-2">
                  <Tooltip color="danger" content="Remove">
                    <Button
                      isIconOnly
                      color="danger"
                      aria-label="Remove"
                      isDisabled={rows.length <= 1}
                      onClick={handleRemoveOnClick(item.key)}
                    >
                      <TbRowRemove className="text-3xl" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex px-4 flex-row-reverse justify-center">
        <div className="px-3">
          <Tooltip color="success" content="Add">
            <Button
              isIconOnly
              color="success"
              aria-label="Add"
              className="w-40"
              isDisabled={rows.length >= max}
              onClick={handleAddOnClick}
            >
              <TbRowInsertBottom className="text-3xl" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
