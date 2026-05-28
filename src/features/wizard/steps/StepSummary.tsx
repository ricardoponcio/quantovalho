import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useWizardStore } from '../../../store/wizardStore';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { Building2, FileText, ShoppingCart, Home, ArrowRight } from 'lucide-react';

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
        
        <div className="bg-neutral-900 p-5 md:p-6 rounded-2xl border border-neutral-800 mb-6">
           <h3 className="text-lg md:text-xl font-medium mb-4">Carga Tributária Efetiva Anual</h3>
           <div className="text-5xl md:text-6xl font-bold text-red-500 mb-2">
             <NumberTicker value={results.effectiveTaxRate} />%
           </div>
           <p className="text-neutral-400">Do total de dinheiro gerado pelo seu trabalho (Custo Empresa), isso é o que vai embora em tributos de todas as formas.</p>
        </div>

        <div className="bg-neutral-900 p-5 md:p-6 rounded-2xl border border-neutral-800 mb-6">
          <h3 className="text-xs md:text-sm text-neutral-400 mb-4 uppercase tracking-wider font-medium">De onde vem esse valor? (Por Mês)</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-sm border-b border-neutral-800/50 pb-2">
              <div className="flex flex-col">
                <span className="text-neutral-300 flex items-center gap-2">
                  <Building2 size={16} className="text-neutral-400" /> Custo Oculto (Patrão paga pro Governo)
                </span>
                <span className="text-xs text-neutral-500 mt-0.5 ml-6">INSS Patronal + Sistema S + RAT + FGTS</span>
              </div>
              <span className="text-orange-400 font-medium">+ <NumberTicker value={results.companyCostBreakdown.inssPatronal.value + results.companyCostBreakdown.sistemaS.value + results.companyCostBreakdown.satRat.value + results.companyCostBreakdown.fgts.value + results.companyCostBreakdown.fgtsProvisoes.value} /></span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-neutral-800/50 pb-2">
              <span className="text-neutral-300 flex items-center gap-2">
                <FileText size={16} className="text-neutral-400" /> Retido na Fonte (Seu INSS + IRPF)
              </span>
              <span className="text-red-400 font-medium">+ <NumberTicker value={results.employeeCostBreakdown.inss.value + results.employeeCostBreakdown.irpf.value} /></span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-neutral-800/50 pb-2">
              <span className="text-neutral-300 flex items-center gap-2">
                <ShoppingCart size={16} className="text-neutral-400" /> Impostos de Consumo (Embutido nas compras)
              </span>
              <span className="text-red-400 font-medium">+ <NumberTicker value={results.monthlyIndirectTaxes} /></span>
            </div>
            {(results.yearlyIpva > 0 || results.yearlyIptu > 0) && (
              <div className="flex justify-between items-center text-sm border-b border-neutral-800/50 pb-2">
                <span className="text-neutral-300 flex items-center gap-2">
                  <Home size={16} className="text-neutral-400" /> Impostos Patrimoniais (Rateio Mensal)
                </span>
                <span className="text-red-400 font-medium">+ <NumberTicker value={(results.yearlyIpva + results.yearlyIptu) / 12} /></span>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-lg pt-2 mt-2 gap-1">
            <span className="text-white font-semibold">Total Entregue por Mês</span>
            <span className="text-red-500 font-bold text-xl"><NumberTicker value={results.totalTaxesMonthly} /></span>
          </div>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          <div className="bg-neutral-900 p-5 md:p-6 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs md:text-sm text-neutral-400 mb-2">Entregue por Mês</h3>
            <div className="text-2xl md:text-3xl font-bold text-red-400">
              <NumberTicker value={results.totalTaxesMonthly} />
            </div>
          </div>
          <div className="bg-neutral-900 p-5 md:p-6 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs md:text-sm text-neutral-400 mb-2">Entregue por Ano</h3>
            <div className="text-2xl md:text-3xl font-bold text-red-400">
              <NumberTicker value={results.totalTaxesYearly} />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 flex justify-center">
          <Link href="/futuro">
            <a className="group flex items-center text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              Como isso afeta meu futuro?
              <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
