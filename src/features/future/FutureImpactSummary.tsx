import { formatCurrency } from '../../lib/utils';
import { useMemo } from 'react';

interface FutureImpactSummaryProps {
  monthlyCouldAccumulate: number;
  monthlyWillAccumulate: number;
  monthlyGovernment: number;
  withInterest: boolean;
}

export const FutureImpactSummary = ({
  monthlyCouldAccumulate,
  monthlyWillAccumulate,
  monthlyGovernment,
  withInterest
}: FutureImpactSummaryProps) => {

  const finalValues = useMemo(() => {
    let accumulatedCould = 0;
    let accumulatedWill = 0;
    let accumulatedGov = 0;
    const monthlyInterestRate = withInterest ? 0.08 / 12 : 0;

    for (let i = 0; i < 10 * 12; i++) {
      accumulatedCould = (accumulatedCould + monthlyCouldAccumulate) * (1 + monthlyInterestRate);
      accumulatedWill = (accumulatedWill + monthlyWillAccumulate) * (1 + monthlyInterestRate);
      accumulatedGov = (accumulatedGov + monthlyGovernment) * (1 + monthlyInterestRate);
    }

    return {
      could: Math.round(accumulatedCould),
      will: Math.round(accumulatedWill),
      gov: Math.round(accumulatedGov)
    };
  }, [monthlyCouldAccumulate, monthlyWillAccumulate, monthlyGovernment, withInterest]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div className="w-3 h-3 rounded-full bg-blue-500 mb-4" />
        <h3 className="text-neutral-400 font-medium mb-1">Poderia Acumular</h3>
        <div className="text-2xl font-bold text-white">
          {formatCurrency(finalValues.could)}
        </div>
        <p className="text-xs text-neutral-500 mt-2">Sem nenhum imposto</p>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div className="w-3 h-3 rounded-full bg-green-500 mb-4" />
        <h3 className="text-neutral-400 font-medium mb-1">Você Acumula</h3>
        <div className="text-2xl font-bold text-white">
          {formatCurrency(finalValues.will)}
        </div>
        <p className="text-xs text-neutral-500 mt-2">Sua parte do esforço</p>
      </div>
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
        <div className="w-3 h-3 rounded-full bg-red-500 mb-4" />
        <h3 className="text-neutral-400 font-medium mb-1">Governo Acumula</h3>
        <div className="text-2xl font-bold text-white">
          {formatCurrency(finalValues.gov)}
        </div>
        <p className="text-xs text-neutral-500 mt-2">Impostos pagos</p>
      </div>
    </div>
  );
};
