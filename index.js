import React, { useState, useEffect } from "react";

// USEINPUT HOOK
export const getInput = (input, validator) => {
  const [value, setValue] = useState(input);
  let willUpdate = false;
  const onChange = (e) => {
    const { value } = e.target;
    if (typeof validator === "function") {
      willUpdate = validator(value);
      if (willUpdate) {
        setValue(value)
      }
    }
  };
  return { value, onChange };
};

// USETABS HOOK
const useTabs = (index, contents) => {
  const [tabIndex, changeTabIndex] = useState(index);
  let value = contents[tabIndex].content;
  return {
    content: value,
    changeContent: changeTabIndex,
  };
};

// USETITLE HOOK
const editTitle = (initalTitle) => {
  const [title, changeTitle] = useState(initalTitle);
  const change = () => {
    const titleDOM = document.querySelector("title");
    titleDOM.innerText = title;
  };
  useEffect(change, [title]);
  return { changeTitle };
};

// USECLICK HOOK
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const titleRef = useRef();
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.addEventListener("click", onClick);
    }
    return () => 
      titleRef.current.removeEventListener("click", onClick);
    };
  }, []);
  return titleRef;
};


// USECONFIRM HOOK
const useConfirm = (message, originalFunction) => {
  if (typeof originalFunction !== "function") {
    return;
  }
  if (confirm(message)) {
    originalFunction();
  } else {
    console.log("abort");
  }
};