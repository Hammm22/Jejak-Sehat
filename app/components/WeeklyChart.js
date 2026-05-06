"use client";
import Card from "./glowcard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyChart({ data }) {
  return (
    <Card colors={["#ffffff", "#18181B", "#4DD658"]} backgroundColor="#09090B">
      <div className="relative z-10 p-4">
        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#27272a"
              />

              <XAxis
                dataKey="day"
                stroke="#a1a1aa"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
              />

              <YAxis
                stroke="#a1a1aa"
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
                allowDecimals={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(34,197,94,0.1)" }}
                contentStyle={{
                  backgroundColor: "#18181B",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "white",
                }}
                labelStyle={{ color: "#a1a1aa" }}
              />

              <defs>
                <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <Bar
                dataKey="total"
                fill="url(#colorTrips)"
                radius={[10, 10, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
