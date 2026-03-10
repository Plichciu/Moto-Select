import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownField({ item, handleInputChange, carInfo, error }) {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        defaultValue={carInfo?.[item?.name]}
      >
        <SelectTrigger
          className={`w-full ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        >
          <SelectValue
            placeholder={
              carInfo?.[item?.name] ? carInfo?.[item?.name] : item.label
            }
          />
        </SelectTrigger>

        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropdownField;
