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
const useTabs = (index, contents) => {
  const [tabIndex, changeTabIndex] = useState(index);
  let value = contents[tabIndex].content;
  return {
    content: value,
    changeContent: changeTabIndex
  };
};