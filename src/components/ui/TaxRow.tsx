import { NumberTicker } from './NumberTicker';

interface TaxRowProps {
  name: string;
  rate: number;
  value: number;
  description?: string;
  isNegative?: boolean;
  colorClass?: string;
}

export const TaxRow = ({ name, rate, value, description, isNegative = true, colorClass = "text-red-400" }: TaxRowProps) => {
  return (
    <div>
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-neutral-400">{name} ({(rate * 100).toFixed(rate < 0.01 ? 2 : 1)}%)</span>
        <span className={`${colorClass} font-medium`}>
          {isNegative && "-"}<NumberTicker value={value} />
        </span>
      </div>
      {description && (
        <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block mt-1 leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
};
