import React from "react";
import { Checkbox, cn } from "@nextui-org/react";

export const QuestionCheckbox = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Checkbox
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content4 items-center justify-between",
          "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 max-md:p-1 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Checkbox>
  );
};
