import { motion } from 'framer-motion';
import { useWizardStore } from '../../../store/wizardStore';
import { Label } from '../../../components/ui/form/Label';
import { CurrencyInput } from '../../../components/ui/form/CurrencyInput';
import { RangeSlider } from '../../../components/ui/form/RangeSlider';

export const StepIncome = () => {
  const { grossSalary, updateData } = useWizardStore();

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-2">Qual a sua renda bruta mensal?</h2>
        <p className="text-neutral-400 mb-8">Vamos começar entendendo o seu ponto de partida (CLT).</p>
        <div className="space-y-4">
          <Label>Salário Bruto</Label>
          <CurrencyInput 
            value={grossSalary}
            onChange={(value) => updateData({ grossSalary: value || 0 })}
          />
          <RangeSlider 
            min="1412" max="50000" step="500"
            value={grossSalary}
            onChange={(e) => updateData({ grossSalary: Number(e.target.value) })}
          />
        </div>
      </div>
    </motion.div>
  );
};
