import React, { useState, useEffect } from "react";

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
    changeContent: changeTabIndex,
  };
};

// USETITLE HOOKS
const editTitle = (initalTitle) => {
  const [title, changeTitle] = useState(initalTitle);
  const change = () => {
    const titleDOM = document.querySelector("title");
    titleDOM.innerText = title;
  };
  useEffect(change, [title]);
  return { changeTitle };
};

// USECLICK HOOKS
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const titleRef = useRef();
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.addEventListener("click", onClick);
    }
    return () => {
      titleRef.current.removeEventListener("click", onClick);
    };
  }, []);
  return titleRef;
};

// USECONFIRM HOOK
const useConfirm = (message, onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (!onCancel || typeof onCancel !== "function") {
    return;
  }
  if (confirm(message)) {
    onConfirm();
  } else {
    onCancel();
  }
};

// USEPREVENTLEAVE HOOK
const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "NOPE";
  };
  const protectLeave = () => window.addEventListener("beforeunload", listener);
  const unProtectLeave = () =>
    window.removeEventListener("beforeunload", listener);
  return { protectLeave, unProtectLeave };
};

// USEBEFORELEAVE HOOK
const useBeforeLeave = (beforeLeave) => {
  if (typeof beforeLeave !== "function") {
    return;
  }
  const mouseLeaveHandler = (e) => {
    const { clientY } = e;
    if (clientY <= 0) {
      beforeLeave();
    }
  };
  document.addEventListener("mouseleave", mouseLeaveHandler);
};
