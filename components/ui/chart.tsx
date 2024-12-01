import React from "react";

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <div className="chart-container">{children}</div>;
};

interface ChartTooltipProps {
  content: React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ content }) => {
  return <div className="chart-tooltip">{content}</div>;
};

interface ChartTooltipContentProps {
  data: { label: string; value: number };
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  data,
}) => {
  return (
    <div className="chart-tooltip-content">
      {/* Render tooltip content based on data */}
      <p>
        {data.label}: {data.value}
      </p>
    </div>
  );
};
