import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ReceiptCardProps extends HTMLMotionProps<"div"> {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ReceiptCard = ({ title, subtitle, children, ...props }: ReceiptCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, y: -20 }}
      className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
      {...props}
    >
      <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
      {subtitle && <p className="text-sm text-neutral-500 mb-4">{subtitle}</p>}
      {children}
    </motion.div>
  );
};
