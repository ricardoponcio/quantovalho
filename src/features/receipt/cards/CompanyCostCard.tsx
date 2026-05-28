import { useWizardStore } from '../../../store/wizardStore';
import { ReceiptCard } from '../../../components/ui/ReceiptCard';
import { TaxRow } from '../../../components/ui/TaxRow';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { HelpCircle } from 'lucide-react';

export const CompanyCostCard = () => {
  const { results } = useWizardStore();
  const c = results.companyCostBreakdown;

  return (
    <ReceiptCard 
      title="O Custo Oculto (Empresa)" 
      subtitle="O que a empresa paga por você, que poderia ser seu."
    >
      <div className="space-y-6 mb-4 border-t border-neutral-800 pt-4">
        
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            Entregue ao Governo (Imposto)
          </h4>
          <div className="space-y-2">
            <TaxRow name="INSS Patronal" rate={c.inssPatronal.rate} value={c.inssPatronal.value} colorClass="text-orange-300" />
            <TaxRow name="Sistema S / Terceiros" rate={c.sistemaS.rate} value={c.sistemaS.value} colorClass="text-orange-300" />
            <TaxRow name="Seguro Acidente / RAT" rate={c.satRat.rate} value={c.satRat.value} colorClass="text-orange-300" />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1 group relative cursor-help w-fit">
            Compartilhado (FGTS) 
            <HelpCircle size={14} />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 bg-neutral-800 text-white text-[10px] normal-case p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              O FGTS vai para uma conta no seu nome, mas o Governo Federal retém e utiliza esse fundo rendendo abaixo da inflação até que você cumpra regras restritas para sacar.
            </div>
          </h4>
          <div className="space-y-2">
            <TaxRow name="FGTS Mês" rate={c.fgts.rate} value={c.fgts.value} colorClass="text-yellow-300" />
            <TaxRow name="FGTS s/ Provisões" rate={c.fgtsProvisoes.rate} value={c.fgtsProvisoes.value} colorClass="text-yellow-300" />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            Repassado a Você (Benefício)
          </h4>
          <div className="space-y-2">
            <TaxRow name="Provisão 13º" rate={c.provisao13.rate} value={c.provisao13.value} colorClass="text-green-300" />
            <TaxRow name="Provisão Férias + 1/3" rate={c.provisaoFerias.rate} value={c.provisaoFerias.value} colorClass="text-green-300" />
          </div>
        </div>

      </div>

      <div className="flex justify-between items-end border-t border-neutral-800 pt-4">
        <span className="text-lg">Custo Total da Empresa</span>
        <span className="text-2xl font-bold text-orange-400"><NumberTicker value={results.totalCompanyCost} /></span>
      </div>
    </ReceiptCard>
  );
};
