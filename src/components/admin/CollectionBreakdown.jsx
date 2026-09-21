import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { CircleDollarSign } from "lucide-react";

const CollectionBreakdown = ({
  data = [],
  totalCollected = 0,
}) => {
    console.log("chat data",data)
    console.log("total ", totalCollected)
  const formatCurrency = (amount = 0) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  const categories = [
    {
      key: "individual",
      label: "Individual",
      color: "var(--primary)",
    },
    {
      key: "yearSet",
      label: "Year Set",
      color: "var(--warning)",
    },
    {
      key: "chapter",
      label: "Chapter",
      color: "var(--success)",
    },
  ];

  const chartData = categories.map((category) => {
    const item = data.find(
      (entry) =>
        entry.category?.toLowerCase() ===
        category.key.toLowerCase()
    );

    return {
      name: category.label,
      value: Number(item?.amount) || 0,
      color: category.color,
    };
  });

  const hasCollection = chartData.some(
    (item) => item.value > 0
  );

  return (
    <div className="bg-(--bg-white) border border-(--border) rounded overflow-hidden h-full">

      {/* HEADER */}
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-sm font-semibold text-(--primary)">
              Collection Breakdown
            </h2>

            <p className="text-xs text-(--secondary) mt-1">
              Collected by payment category
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-(--primary-light) flex items-center justify-center">
            <CircleDollarSign
              size={18}
              className="text-(--primary)"
            />
          </div>

        </div>
      </div>

      {/* CHART AREA */}
      <div className="relative h-[320px] mt-2">

        {hasCollection ? (
          <>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="76%"
                  paddingAngle={2}
                  stroke="var(--bg-white)"
                  strokeWidth={2}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    formatCurrency(value),
                    name,
                  ]}
                  contentStyle={{
                    background: "var(--bg-white)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "none",
                  }}
                  labelStyle={{
                    color: "var(--primary)",
                  }}
                  itemStyle={{
                    color: "var(--secondary)",
                  }}
                />

              </PieChart>
            </ResponsiveContainer>

            {/* CENTER */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

              <p className="text-xs text-(--secondary)">
                Total Collected
              </p>

              <p className="text-xl font-bold text-(--primary) mt-1">
                {formatCurrency(totalCollected)}
              </p>

            </div>
          </>
        ) : (

          /* EMPTY STATE */
          <div className="h-full flex items-center justify-center">

            <div className="relative w-[220px] h-[220px] flex items-center justify-center">

              {/* EMPTY DONUT */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(var(--bg-soft) 0deg, var(--bg-soft) 360deg)",
                }}
              />

              <div className="absolute inset-[28px] rounded-full bg-(--bg-white) flex flex-col items-center justify-center">

                <p className="text-xs text-(--secondary)">
                  Total Collected
                </p>

                <p className="text-xl font-bold text-(--primary) mt-1">
                  {formatCurrency(totalCollected)}
                </p>

                <p className="text-[10px] text-(--text-muted) mt-1">
                  No collections yet
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* BREAKDOWN */}
      <div className="px-5 pb-5">

        <div className="border-t border-(--border) pt-4 space-y-3">

          {chartData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-2.5">

                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-xs text-(--secondary)">
                  {item.name}
                </span>

              </div>

              <span className="text-xs font-semibold text-(--primary)">
                {formatCurrency(item.value)}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CollectionBreakdown;