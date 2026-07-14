"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CategoryChartItem {
  name: string;
  courses: number;
}

interface LevelChartItem {
  name: string;
  value: number;
}

interface DashboardChartsProps {
  categoryData: CategoryChartItem[];
  levelData: LevelChartItem[];
}

const pieColors: string[] = [
  "#2563eb",
  "#f59e0b",
  "#0f172a",
];

export default function DashboardCharts({
  categoryData,
  levelData,
}: DashboardChartsProps) {
  const visibleLevelData = levelData.filter(
    (item: LevelChartItem) => item.value > 0,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Courses by category
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Number of courses available in each learning category.
          </p>
        </div>

        <div className="mt-6 h-80 w-full">
          {categoryData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
              No course data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 35,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{
                    fontSize: 11,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fontSize: 12,
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="courses"
                  name="Courses"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Course level distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribution of beginner, intermediate, and advanced courses.
          </p>
        </div>

        <div className="mt-6 h-80 w-full">
          {visibleLevelData.length === 0 ? (
            <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
              No course data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visibleLevelData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius +
                      (outerRadius - innerRadius) * 0.5;

                    const x =
                      cx +
                      radius *
                        Math.cos(-midAngle * RADIAN);

                    const y =
                      cy +
                      radius *
                        Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={13}
                        fontWeight={700}
                      >
                        {`${Math.round((percent ?? 0) * 100)}%`}
                      </text>
                    );
                  }}
                >
                  {visibleLevelData.map(
                    (item: LevelChartItem, index: number) => (
                      <Cell
                        key={item.name}
                        fill={
                          pieColors[
                            index % pieColors.length
                          ]
                        }
                      />
                    ),
                  )}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  formatter={(
                    value: string,
                    entry: {
                      payload?: {
                        value?: number;
                      };
                    },
                  ) =>
                    `${value}: ${entry.payload?.value ?? 0}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>
    </div>
  );
}