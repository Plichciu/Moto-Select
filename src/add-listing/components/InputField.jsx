import { Input } from "@/components/ui/input";
import React from "react";

function InputField({ item, handleInputChange, carInfo, error }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        defaultValue={carInfo?.[item.name]}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        className={`
          ${error ? "border-red-500 focus-visible:ring-red-500" : ""}
        `}
      />
    </div>
  );
}

export default InputField;
