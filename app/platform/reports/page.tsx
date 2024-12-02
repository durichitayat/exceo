"use client";

import React from "react";
import {
  Calendar,
  ChevronDown,
  BarChart2,
  PieChart,
  TrendingUp,
  Mail,
  Clock,
  Users,
  TrendingDown,
  AlertCircle,
  Lightbulb,
  Target,
  Filter,
  Download,
} from "lucide-react";
import Button from "@/components/ui/button";
import { Tab, TabGroup, TabPanels, TabList, TabPanel } from "@headlessui/react";
import Progress from "@/components/ui/progress";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
  Pie,
  Tooltip, // Add Tooltip from recharts
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const config = {
  high: {
    label: "High Priority",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium Priority",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low Priority",
    color: "hsl(var(--chart-3))",
  },
};

export default function ReportPage() {
  return (
    <>
      <div className="container mx-auto ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Executive Reports
          </h2>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline-secondary"
              size="sm"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Date
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Emails Processed"
            value="1,234"
            change="+15%"
            icon={<Mail className="h-4 w-4" />}
          />
          <SummaryCard
            title="Average Response Time"
            value="2.5 hours"
            change="-30 min"
            icon={<Clock className="h-4 w-4" />}
          />
          <SummaryCard
            title="Delegated Tasks"
            value="45"
            change="85% completed"
            icon={<Users className="h-4 w-4" />}
          />
          <SummaryCard
            title="AI Assistance Rate"
            value="78%"
            change="+5%"
            icon={<BarChart2 className="h-4 w-4" />}
          />
        </div>

        {/* Detailed Analytics */}
        <TabGroup>
          <TabList className="space-y-4 px-2 -z-10">
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-secondary-dark text-white p-2 mr-2 border outline-none"
                  : "border-secondary text-secondary-dark p-2 mr-2 border hover:bg-secondary-dark/20"
              }
            >
              Communication Efficiency
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-secondary-dark text-white p-2 mr-2 border outline-none"
                  : "border-secondary text-secondary-dark p-2 mr-2 border hover:bg-secondary-dark/20"
              }
            >
              Delegation Effectiveness
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-secondary-dark text-white p-2 mr-2 border outline-none"
                  : "border-secondary text-secondary-dark p-2 mr-2 border hover:bg-secondary-dark/20"
              }
            >
              Time Management
            </Tab>
          </TabList>
          <TabPanels className="bg-white z-10">
            <TabPanel className="space-y-4 rounded-none">
              <Card>
                <CardHeader>
                  <CardTitle>Email Response Times</CardTitle>
                  <CardDescription>
                    Track your response times for different priority levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <LineChart data={emailResponseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip /> {/* Use Recharts' Tooltip component */}
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="high"
                        stroke={config.high.color}
                        name={config.high.label}
                      />
                      <Line
                        type="monotone"
                        dataKey="medium"
                        stroke={config.medium.color}
                        name={config.medium.label}
                      />
                      <Line
                        type="monotone"
                        dataKey="low"
                        stroke={config.low.color}
                        name={config.low.label}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delegation Performance</CardTitle>
                  <CardDescription>
                    Task completion rates by team member
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={delegationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {delegationData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip /> {/* Use Recharts' Tooltip component */}
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Time Allocation</CardTitle>
                  <CardDescription>
                    Breakdown of time spent on various activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart data={timeAllocationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip /> {/* Use Recharts' Tooltip component */}
                      <Legend />
                      <Bar
                        dataKey="hours"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        {/* Key Actions and Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Key Actions and Insights</CardTitle>
            <CardDescription>
              AI-generated recommendations and trends based on your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <InsightSection
                title="Communication Efficiency"
                insights={[
                  {
                    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
                    content:
                      "Response time to high-priority emails decreased by 20% this week.",
                    recommendation:
                      "Apply similar strategies to medium-priority emails to further improve efficiency.",
                  },
                  {
                    icon: <TrendingDown className="h-5 w-5 text-red-500" />,
                    content:
                      "Response times for emails from Client X increased by 15%.",
                    recommendation:
                      "Set up auto-reminders or delegate initial responses to improve engagement.",
                  },
                ]}
              />
              <InsightSection
                title="Delegation Effectiveness"
                insights={[
                  {
                    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
                    content:
                      "Team Member A maintained a 95% task completion rate.",
                    recommendation:
                      "Consider delegating more complex tasks or increasing their responsibilities.",
                  },
                  {
                    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
                    content:
                      "Team Member B's task completion rate dropped to 78%.",
                    recommendation:
                      "Schedule a check-in to identify blockers and provide necessary support.",
                  },
                ]}
              />
              <InsightSection
                title="Time Management"
                insights={[
                  {
                    icon: <TrendingUp className="h-5 w-5 text-red-500" />,
                    content:
                      "Time spent in meetings increased by 15% compared to last month.",
                    recommendation:
                      "Review your calendar and consider delegating or declining non-essential meetings.",
                  },
                  {
                    icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
                    content:
                      "You've had 20% less uninterrupted focus time this week.",
                    recommendation:
                      "Block out specific hours for deep work and communicate 'do not disturb' periods to your team.",
                  },
                ]}
              />
              <InsightSection
                title="Strategic Recommendations"
                insights={[
                  {
                    icon: <Target className="h-5 w-5 text-primary" />,
                    content:
                      "Recent project requirements suggest a need for data analytics skills.",
                    recommendation:
                      "Consider upskilling in data analytics to improve decision-making in upcoming strategic initiatives.",
                  },
                  {
                    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
                    content: "AI assistance rate increased to 78%.",
                    recommendation:
                      "Explore advanced features like automated report generation and predictive analytics to further enhance productivity.",
                  },
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

function SummaryCard({ title, value, change, icon }: SummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
        <Progress
          value={33}
          className="mt-2"
        />
      </CardContent>
    </Card>
  );
}

interface Insight {
  icon: React.ReactNode;
  content: string;
  recommendation: string;
}

interface InsightSectionProps {
  title: string;
  insights: Insight[];
}

function InsightSection({ title, insights }: InsightSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul className="space-y-4">
        {insights.map((insight, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-start">
              {insight.icon}
              <div className="ml-4">
                <p className="font-semibold">{insight.content}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {insight.recommendation}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const emailResponseData = [
  { name: "Mon", high: 1, medium: 2, low: 4 },
  { name: "Tue", high: 0.8, medium: 1.8, low: 3.5 },
  { name: "Wed", high: 1.2, medium: 2.2, low: 3.8 },
  { name: "Thu", high: 0.9, medium: 1.9, low: 3.2 },
  { name: "Fri", high: 1.1, medium: 2.1, low: 3.6 },
];

const delegationData = [
  { name: "Alice", value: 400 },
  { name: "Bob", value: 300 },
  { name: "Charlie", value: 200 },
  { name: "David", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const timeAllocationData = [
  { name: "Meetings", hours: 10 },
  { name: "Emails", hours: 8 },
  { name: "Projects", hours: 12 },
  { name: "Admin", hours: 4 },
  { name: "Breaks", hours: 2 },
];
