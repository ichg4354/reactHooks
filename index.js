import React, { useState } from "react";

const getInput = (input, validator) => {
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

export default App = () => {
  const maxLen = (value) => value.length <= 10;
  const name = getInput("Mr.", maxLen);
  return (
    <div>
      <input placeholder="Name" {...name} />
    </div>
  );
};
