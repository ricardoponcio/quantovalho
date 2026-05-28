import type { ComponentProps } from 'react';

export const Label = (props: ComponentProps<'label'>) => {
  return (
    <label 
      className={`block text-sm text-neutral-400 mb-2 ${props.className || ''}`}
      {...props}
    />
  );
};
