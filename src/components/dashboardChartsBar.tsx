"use client";

import { MoreHorizontal } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "Monthly book sales chart";

const chartData = [
  { month: "Jan", sales: 500 },
  { month: "Feb", sales: 750 },
  { month: "Mar", sales: 400 },
  { month: "Apr", sales: 600 },
  { month: "May", sales: 350 },
  { month: "Jun", sales: 650 },
  { month: "Jul", sales: 480 },
  { month: "Aug", sales: 720 },
  { month: "Sep", sales: 590 },
  { month: "Oct", sales: 620 },
  { month: "Nov", sales: 540 },
  { month: "Dec", sales: 580 },
];

const chartConfig = {
  sales: {
    label: "Book Sales",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export function ChartBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  // Determine if current theme is dark
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Define colors for light and dark mode
  const gridColor = isDark ? "#727273" : "#e5e7eb";

  return (
    <Card className="w-full bg-white rounded-2xl border shadow-md dark:bg-neutral-950 dark:border-neutral-800">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            Monthly Sales
          </CardTitle>
          <CardDescription className="text-neutral-400 dark:text-neutral-500 mt-1 text-sm">
            Book sales performance throughout the year
          </CardDescription>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            onMouseLeave={() => setHoveredIndex(null)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="0"
              stroke={gridColor}
              strokeWidth={1}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={15}
              axisLine={false}
              tick={{ fontSize: 13, fill: "#9ca3af", fontWeight: 500 }}
            />
            <ChartTooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="text-sm font-medium text-gray-900">
                        {label}
                      </p>
                      <p className="text-sm text-blue-600">
                        Sales: {payload[0].value} books
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="sales"
              radius={[6, 6, 0, 0]}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    hoveredIndex === null || hoveredIndex === index
                      ? "#4f46e5"
                      : "#434445"
                  }
                  style={{
                    transition: "fill 0.3s ease-in-out",
                    cursor: "pointer",
                    opacity:
                      hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
