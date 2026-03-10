import React from "react";
import { Textarea } from "@/components/ui/textarea";

function TextAreaField({ item, handleInputChange, carInfo, error }) {
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)}
        defaultValue={carInfo?.[item.name]}
        className={`
          ${error ? "border-red-500 focus-visible:ring-red-500" : ""}
        `}
      />
    </div>
  );
}

export default TextAreaField;
