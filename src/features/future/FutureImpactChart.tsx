import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/utils';

interface FutureImpactChartProps {
  monthlyCouldAccumulate: number;
  monthlyWillAccumulate: number;
  monthlyGovernment: number;
  withInterest: boolean;
  maxDomainValue: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const order = ['Fica para o Estado', 'Deveria ser seu', 'De fato é seu'];
    const orderedPayload = order.map(key => payload.find((p: any) => p.name === key)).filter(Boolean);

    return (
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {orderedPayload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-neutral-400">{entry.name}:</span>
            <span className="text-white font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export const FutureImpactChart = ({
  monthlyCouldAccumulate,
  monthlyWillAccumulate,
  monthlyGovernment,
  withInterest,
  maxDomainValue
}: FutureImpactChartProps) => {
  const data = useMemo(() => {
    const years = 10;
    const monthlyInterestRate = withInterest ? 0.08 / 12 : 0;

    let accumulatedCould = 0;
    let accumulatedWill = 0;
    let accumulatedGov = 0;

    const chartData = [];

    chartData.push({
      year: 'Hoje',
      'Deveria ser seu': 0,
      'De fato é seu': 0,
      'Fica para o Estado': 0,
    });

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        accumulatedCould = (accumulatedCould + monthlyCouldAccumulate) * (1 + monthlyInterestRate);
        accumulatedWill = (accumulatedWill + monthlyWillAccumulate) * (1 + monthlyInterestRate);
        accumulatedGov = (accumulatedGov + monthlyGovernment) * (1 + monthlyInterestRate);
      }

      chartData.push({
        year: `Ano ${year}`,
        'Deveria ser seu': Math.round(accumulatedCould),
        'De fato é seu': Math.round(accumulatedWill),
        'Fica para o Estado': Math.round(accumulatedGov),
      });
    }

    return chartData;
  }, [withInterest, monthlyCouldAccumulate, monthlyWillAccumulate, monthlyGovernment]);

  const renderLegend = (props: any) => {
    const { payload } = props;
    const order = ['Fica para o Estado', 'Deveria ser seu', 'De fato é seu'];
    const orderedPayload = order.map(key => payload?.find((p: any) => p.value === key)).filter(Boolean);

    return (
      <ul className="flex justify-center flex-wrap gap-6 pt-5 text-sm text-neutral-400">
        {orderedPayload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fill: '#666' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={80}
            domain={[0, maxDomainValue]}
            stroke="#666"
            tick={{ fill: '#666' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
          <Area 
            type="monotone" 
            dataKey="De fato é seu" 
            stackId="1"
            stroke="#22c55e" 
            fill="#22c55e" 
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="Fica para o Estado" 
            stackId="1"
            stroke="#ef4444" 
            fill="#ef4444"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="Deveria ser seu"
            stroke="#3b82f6"
            fill="none"
            strokeWidth={3}
            strokeDasharray="5 5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
