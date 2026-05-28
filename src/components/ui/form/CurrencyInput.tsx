import type { ComponentProps } from 'react';

interface CurrencyInputProps extends Omit<ComponentProps<'input'>, 'value' | 'onChange'> {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
}

export const CurrencyInput = ({ value, onChange, ...props }: CurrencyInputProps) => {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
      <input 
        type="number" 
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        className={`w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${props.className || ''}`}
        {...props}
      />
    </div>
  );
};
