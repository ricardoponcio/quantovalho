import { motion } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';

export const NumberTicker = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {formatCurrency(value)}
    </motion.span>
  );
};
