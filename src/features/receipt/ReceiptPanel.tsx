import { AnimatePresence } from 'framer-motion';
import { useWizardStore } from '../../store/wizardStore';
import { MonthlySummaryCard } from './cards/MonthlySummaryCard';
import { CompanyCostCard } from './cards/CompanyCostCard';
import { WealthTaxCard } from './cards/WealthTaxCard';
import { ConsumptionTaxCard } from './cards/ConsumptionTaxCard';

export const ReceiptPanel = () => {
  const { step } = useWizardStore();

  return (
    <div id="receipt-panel-capture" className="w-full md:w-1/2 p-6 md:p-16 bg-neutral-900 relative md:overflow-y-auto flex flex-col">
      <div className="max-w-md w-full mx-auto my-auto space-y-6 py-8">
        
        <MonthlySummaryCard />

        <AnimatePresence>
          <CompanyCostCard />
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && <WealthTaxCard />}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && <ConsumptionTaxCard />}
        </AnimatePresence>

      </div>
    </div>
  );
};
