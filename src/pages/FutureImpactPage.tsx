import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useWizardStore } from '../store/wizardStore';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { FutureImpactChart } from '../features/future/FutureImpactChart';
import { FutureImpactSummary } from '../features/future/FutureImpactSummary';
import { formatCurrency } from '../lib/utils';

export const FutureImpactPage = () => {
  const [, setLocation] = useLocation();
  const { results, step } = useWizardStore();
  const [withInterest, setWithInterest] = useState(true);
  const [investPercent, setInvestPercent] = useState(10);
  const [years, setYears] = useState(10);

  if (step === 1) {
    setLocation('/');
    return null;
  }

  const monthlyGovernment = results.totalTaxesMonthly;
  const monthlyWillAccumulate = (results.totalCompanyCost - results.totalTaxesMonthly) * (investPercent / 100);
  const monthlyCouldAccumulate = monthlyWillAccumulate + monthlyGovernment;

  const maxDomainValue = useMemo(() => {
    let acc = 0;
    const rate = 0.08 / 12;
    for (let i = 0; i < years * 12; i++) {
      acc = (acc + monthlyCouldAccumulate) * (1 + rate);
    }
    return Math.round(acc);
  }, [monthlyCouldAccumulate, years]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para o Início
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">O Impacto no seu Futuro</h1>
          <p className="text-xl text-neutral-400 max-w-2xl">
            Veja como a carga tributária afeta a construção do seu patrimônio ao longo dos próximos 10 anos.
          </p>
        </motion.div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 mb-8">
          <div className="flex flex-col xl:flex-row justify-between items-center mb-8 gap-8">
            <div className="text-center xl:text-left w-full xl:w-auto">
              <h2 className="text-2xl font-semibold mb-2">Projeção de {years} Anos</h2>
              <p className="text-neutral-400">Investindo o valor mensalmente</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full xl:w-auto bg-neutral-950/50 p-4 md:p-6 rounded-2xl border border-neutral-800">
              <div className="flex flex-col w-full md:w-auto">
                <div className="flex justify-between items-center gap-4 mb-1">
                  <label className="text-sm text-neutral-400 whitespace-nowrap">Tempo (Anos)</label>
                  <span className="text-sm font-medium text-white">{years}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full md:w-40 accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col w-full md:w-auto">
                <div className="flex justify-between items-center gap-4 mb-1">
                  <label className="text-sm text-neutral-400 whitespace-nowrap">Poupando Líquido</label>
                  <span className="text-sm font-medium text-white">{investPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={investPercent}
                  onChange={(e) => setInvestPercent(Number(e.target.value))}
                  className="w-full md:w-40 accent-orange-500 cursor-pointer"
                />
                <div className="text-xs text-neutral-500 text-right mt-1">
                  = {formatCurrency((results.totalCompanyCost - results.totalTaxesMonthly) * (investPercent / 100))}/mês
                </div>
              </div>

              <label className="flex items-center cursor-pointer bg-neutral-800/50 p-2 rounded-xl w-full md:w-auto justify-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={withInterest}
                    onChange={() => setWithInterest(!withInterest)}
                  />
                  <div className={`block w-12 h-7 rounded-full transition-colors ${withInterest ? 'bg-orange-500' : 'bg-neutral-700'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${withInterest ? 'transform translate-x-5' : ''}`}></div>
                </div>
                <div className="ml-3 font-medium text-sm">
                  Com Juros (8% a.a.)
                </div>
              </label>
            </div>
          </div>

          <FutureImpactChart 
            monthlyCouldAccumulate={monthlyCouldAccumulate}
            monthlyWillAccumulate={monthlyWillAccumulate}
            monthlyGovernment={monthlyGovernment}
            withInterest={withInterest}
            maxDomainValue={maxDomainValue}
            years={years}
          />
        </div>

        <FutureImpactSummary 
          monthlyCouldAccumulate={monthlyCouldAccumulate}
          monthlyWillAccumulate={monthlyWillAccumulate}
          monthlyGovernment={monthlyGovernment}
          withInterest={withInterest}
          years={years}
        />
      </div>
    </div>
  );
};
