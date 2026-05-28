import { useWizardStore } from '../../../store/wizardStore';
import { ReceiptCard } from '../../../components/ui/ReceiptCard';
import { TaxRow } from '../../../components/ui/TaxRow';
import { NumberTicker } from '../../../components/ui/NumberTicker';

export const CompanyCostCard = () => {
  const { results } = useWizardStore();
  const c = results.companyCostBreakdown;

  return (
    <ReceiptCard 
      title="O Custo Oculto (Empresa)" 
      subtitle="O que a empresa paga por você, que poderia ser seu."
    >
      <div className="space-y-3 mb-4 border-t border-neutral-800 pt-4">
        <TaxRow name="INSS Patronal" rate={c.inssPatronal.rate} value={c.inssPatronal.value} colorClass="text-orange-300" />
        <TaxRow name="FGTS Mês" rate={c.fgts.rate} value={c.fgts.value} colorClass="text-orange-300" />
        <TaxRow name="Sistema S / Terceiros" rate={c.sistemaS.rate} value={c.sistemaS.value} colorClass="text-orange-300" />
        <TaxRow name="Seguro Acidente / RAT" rate={c.satRat.rate} value={c.satRat.value} colorClass="text-orange-300" />
        <TaxRow name="Provisão 13º" rate={c.provisao13.rate} value={c.provisao13.value} colorClass="text-orange-300" />
        <TaxRow name="Provisão Férias + 1/3" rate={c.provisaoFerias.rate} value={c.provisaoFerias.value} colorClass="text-orange-300" />
        <TaxRow name="FGTS s/ Provisões" rate={c.fgtsProvisoes.rate} value={c.fgtsProvisoes.value} colorClass="text-orange-300" />
      </div>

      <div className="flex justify-between items-end border-t border-neutral-800 pt-4">
        <span className="text-lg">Custo Total da Empresa</span>
        <span className="text-2xl font-bold text-orange-400"><NumberTicker value={results.totalCompanyCost} /></span>
      </div>
    </ReceiptCard>
  );
};
