import React, { useState } from "react";

// USEINPUT HOOKS
export const getInput = (input, validator) => {
  const [value, setValue] = useState(input);
  let willUpdate = false;
  const onChange = (e) => {
    const { value } = e.target;
    if (typeof validator === "function") {
      willUpdate = validator(value);
      if (willUpdate) {
        setValue(value);
      }
    }
  };
  return { value, onChange };
};

// USETABS HOOKS
const changeSection = (index, wholeFile) => {
  const [indexNum, setIndexNum] = useState(index);
  return {
    valueText: wholeFile[indexNum].title,
    changeIndex: setIndexNum,
  };
};
