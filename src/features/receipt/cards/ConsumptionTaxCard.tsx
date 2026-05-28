import { useWizardStore } from '../../../store/wizardStore';
import { ReceiptCard } from '../../../components/ui/ReceiptCard';
import { TaxRow } from '../../../components/ui/TaxRow';
import { NumberTicker } from '../../../components/ui/NumberTicker';

export const ConsumptionTaxCard = () => {
  const { results } = useWizardStore();
  const c = results.consumptionTaxBreakdown;

  return (
    <ReceiptCard 
      title="Consumo Mensal" 
      subtitle="Impostos embutidos em tudo que você compra (embutidos nos preços)."
    >
      <div className="space-y-3 mb-4 border-t border-neutral-800 pt-4">
        <TaxRow 
          name="ICMS" 
          rate={c.icms.rate} 
          value={c.icms.value} 
          description="Imposto Estadual sobre circulação de mercadorias." 
        />
        <TaxRow 
          name="PIS/COFINS" 
          rate={c.pisCofins.rate} 
          value={c.pisCofins.value} 
          description="Contribuição Federal para financiamento da seguridade social." 
        />
        <TaxRow 
          name="IPI / IBPT / Outros" 
          rate={c.ipiIbpt.rate} 
          value={c.ipiIbpt.value} 
          description="IBPT (Instituto Brasileiro de Planejamento Tributário) mede a carga tributária média indireta incluindo impostos sobre industrialização (IPI), importação e cascata." 
        />
      </div>
      <div className="flex justify-between items-end border-t border-neutral-800 pt-4">
        <span className="text-lg">Total embutido no consumo</span>
        <span className="text-2xl font-bold text-red-400"><NumberTicker value={results.monthlyIndirectTaxes} /></span>
      </div>
    </ReceiptCard>
  );
};
