import CarSpecification from "@/Shared/CarSpecification";
import IconField from "@/add-listing/components/IconField";
import React from "react";

function Specification({ carDetail }) {
  return (
    <div className="mt-10 bg-white rounded-xl border shadow-sm">
      <h2 className="px-6 py-4 border-b font-semibold text-xl">
        Specifications
      </h2>

      {!carDetail ? (
        <div className="p-6">
          <div className="w-full h-[200px] rounded bg-slate-200 animate-pulse" />
        </div>
      ) : (
        <ul className="divide-y">
          {CarSpecification.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 text-gray-600">
                <IconField icon={item.icon} />
                <span className="text-sm">{item.label}</span>
              </div>

              {/* RIGHT */}
              <span className="font-medium text-gray-900">
                {carDetail?.[item.name] || "—"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Specification;
