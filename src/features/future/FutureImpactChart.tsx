import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    return (
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
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
      'Poderia Acumular': 0,
      'Você Acumula': 0,
      'Governo Acumula': 0,
    });

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        accumulatedCould = (accumulatedCould + monthlyCouldAccumulate) * (1 + monthlyInterestRate);
        accumulatedWill = (accumulatedWill + monthlyWillAccumulate) * (1 + monthlyInterestRate);
        accumulatedGov = (accumulatedGov + monthlyGovernment) * (1 + monthlyInterestRate);
      }

      chartData.push({
        year: `Ano ${year}`,
        'Poderia Acumular': Math.round(accumulatedCould),
        'Você Acumula': Math.round(accumulatedWill),
        'Governo Acumula': Math.round(accumulatedGov),
      });
    }

    return chartData;
  }, [withInterest, monthlyCouldAccumulate, monthlyWillAccumulate, monthlyGovernment]);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 10 }}>
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
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            dataKey="Poderia Acumular" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="Você Acumula" 
            stroke="#22c55e" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="Governo Acumula" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
