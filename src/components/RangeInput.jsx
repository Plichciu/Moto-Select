import React from "react";

const RangeInput = ({
  labelFrom,
  labelTo,
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
  placeholderFrom,
  placeholderTo,
  unit,
}) => {
  return (
    <>
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          {labelFrom}
        </label>
        <input
          type="number"
          value={valueFrom}
          onChange={(e) => onChangeFrom(e.target.value)}
          placeholder={placeholderFrom}
          className="w-full h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          {labelTo}
        </label>
        <input
          type="number"
          value={valueTo}
          onChange={(e) => onChangeTo(e.target.value)}
          placeholder={placeholderTo}
          className="w-full h-12 px-4 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </>
  );
};

export default RangeInput;
