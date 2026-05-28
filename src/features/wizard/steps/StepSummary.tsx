import { motion } from 'framer-motion';
import { useWizardStore } from '../../../store/wizardStore';
import { NumberTicker } from '../../../components/ui/NumberTicker';

export const StepSummary = () => {
  const { results } = useWizardStore();

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-4xl font-semibold mb-2">O Extrato Real</h2>
        <p className="text-neutral-400 mb-8">Veja como a máquina pública divide com você o seu esforço.</p>
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
           <h3 className="text-xl font-medium mb-4">Carga Tributária Efetiva Anual</h3>
           <div className="text-6xl font-bold text-red-500 mb-2">
             <NumberTicker value={results.effectiveTaxRate} />%
           </div>
           <p className="text-neutral-400">Do total de dinheiro gerado pelo seu trabalho (Custo Empresa), isso é o que vai embora em tributos de todas as formas.</p>
        </div>
      </div>
    </motion.div>
  );
};
