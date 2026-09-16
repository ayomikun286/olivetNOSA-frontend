import React from 'react'
import {
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import AdminSection from "./AdminSection";

const CollectionTrendChart = ({ data = [] }) => {
  const formatAmount = (value) => {
    return `₦${Number(value || 0).toLocaleString()}`;
  };

  return (
    <AdminSection
      title="Monthly Collection"
      description="Successful payments received this year."
      icon={BarChart3}
    >
      <div className="h-[300px] w-full p-4 sm:p-5">
        {data.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <BarChart3
              size={22}
              className="text-(--text-muted)"
            />

            <p className="text-sm text-(--secondary) mt-3">
              No collection data available yet.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text-muted)",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text-muted)",
                }}
                tickFormatter={(value) => {
                  if (value >= 1000000) {
                    return `₦${(value / 1000000).toFixed(1)}M`;
                  }

                  if (value >= 1000) {
                    return `₦${(value / 1000).toFixed(0)}k`;
                  }

                  return `₦${value}`;
                }}
                width={65}
              />

              <Tooltip
                formatter={(value) => [
                  formatAmount(value),
                  "Collected",
                ]}
                contentStyle={{
                  background: "var(--bg-white)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </AdminSection>
  );
};

export default CollectionTrendChart