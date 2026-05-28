import { motion } from 'framer-motion';
import { useWizardStore } from '../../../store/wizardStore';
import { Label } from '../../../components/ui/form/Label';
import { CurrencyInput } from '../../../components/ui/form/CurrencyInput';
import { RangeSlider } from '../../../components/ui/form/RangeSlider';

export const StepConsumption = () => {
  const { monthlyExpenses, updateData } = useWizardStore();

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-2">Seus gastos mensais</h2>
        <p className="text-neutral-400 mb-8">Mercado, contas, lazer... tudo tem imposto embutido.</p>
        <div className="space-y-4">
          <Label>Estimativa de gastos (cartão/dinheiro)</Label>
          <CurrencyInput 
            value={monthlyExpenses}
            onChange={(value) => updateData({ monthlyExpenses: value || 0 })}
          />
          <RangeSlider 
            min="500" max="20000" step="500"
            value={monthlyExpenses}
            onChange={(e) => updateData({ monthlyExpenses: Number(e.target.value) })}
          />
        </div>
      </div>
    </motion.div>
  );
};
