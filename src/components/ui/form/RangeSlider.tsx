import type { ComponentProps } from 'react';

export const RangeSlider = (props: ComponentProps<'input'>) => {
  return (
    <input 
      type="range" 
      className={`w-full accent-primary ${props.className || ''}`}
      {...props}
    />
  );
};
