import { useState } from "react";

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    onChange: function(e) {
      setValue(e.target.value);
    },
    value
  };
};
