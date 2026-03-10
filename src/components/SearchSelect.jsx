import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Dowolny",
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isObjectOptions = options.length > 0 && typeof options[0] === "object";

  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          {label}
        </label>
      )}

      {isMobile ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-3 border rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">{placeholder}</option>

          {options.map((opt) => {
            const val = isObjectOptions ? opt.value : opt;
            const lbl = isObjectOptions ? opt.label : opt;

            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      ) : (
        <Select value={value || undefined} onValueChange={onChange}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((opt) => {
              const val = isObjectOptions ? opt.value : opt;
              const lbl = isObjectOptions ? opt.label : opt;

              return (
                <SelectItem key={val} value={val}>
                  {lbl}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default SearchSelect;
