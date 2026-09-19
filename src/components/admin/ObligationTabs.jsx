import React from "react";

const tabs = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "individual",
    label: "Individual",
  },
  {
    id: "yearSet",
    label: "Year Set",
  },
  {
    id: "chapter",
    label: "Chapter",
  },
];

const ObligationTabs = ({ activeTab, onChange }) => {
  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative whitespace-nowrap pb-3 text-sm font-medium transition ${
                active
                  ? "text-[#123B6D]"
                  : "text-slate-500 hover:text-[#123B6D]"
              }`}
            >
              {tab.label}

              {active && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#123B6D]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ObligationTabs;