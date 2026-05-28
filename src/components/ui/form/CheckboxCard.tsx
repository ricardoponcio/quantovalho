import type { ComponentProps } from 'react';

interface CheckboxCardProps extends Omit<ComponentProps<'input'>, 'type'> {
  label: string;
  isFlexOne?: boolean;
}

export const CheckboxCard = ({ label, isFlexOne = false, ...props }: CheckboxCardProps) => {
  return (
    <label 
      className={`flex items-center gap-3 p-4 border border-neutral-800 rounded-xl cursor-pointer hover:border-neutral-700 transition-colors ${isFlexOne ? 'flex-1' : 'w-fit'} ${props.className || ''}`}
    >
      <input 
        type="checkbox" 
        className="w-5 h-5 accent-primary rounded"
        {...props}
      />
      <span className="text-lg">{label}</span>
    </label>
  );
};
