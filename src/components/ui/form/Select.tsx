import type { ComponentProps } from 'react';

export const Select = (props: ComponentProps<'select'>) => {
  return (
    <select 
      className={`w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 px-4 text-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none ${props.className || ''}`}
      {...props}
    />
  );
};
