"use client";

import { MoreHorizontal, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Completed", value: 75.55, color: "#6366f1" },
  { name: "Remaining", value: 24.45, color: "#f1f5f9" },
];

const targetData = [
  { label: "Target", value: "Rp.20jt", trend: "down", color: "text-red-500" },
  {
    label: "Revenue",
    value: "Rp.16jt",
    trend: "up",
    color: "text-emerald-500",
  },
  { label: "Today", value: "Rp.1.5jt", trend: "up", color: "text-emerald-500" },
];

export function ChartPie() {
  return (
    <Card className="w-full bg-white rounded-2xl border dark:border-neutral-800 dark:bg-neutral-950">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Target
          </CardTitle>
          <CardDescription className="text-neutral-400 dark:text-neutral-500 mt-1 text-sm">
            Target you've set for each month
          </CardDescription>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </CardHeader>
      <CardContent className="pt-0">
        {/* Donut Chart */}
        <div className="relative h-52 w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 dark:text-white">
              75.55%
            </div>
            <div className="flex items-center text-sm text-emerald-500 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +10%
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8 px-2">
          <p className="text-neutral-400 dark:text-neutral-600 text-sm leading-relaxed">
            You earn Rp.3jt today, it's higher than last month.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          {targetData.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                {item.label}
              </p>
              <div
                className={`text-lg font-bold ${item.color} flex items-center justify-center`}
              >
                {item.value}
                {item.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 ml-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 ml-1 rotate-180" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
