import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardStore } from './store/wizardStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const NumberTicker = ({ value }: { value: number }) => {
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

export default function App() {
  const { step, grossSalary, stateUF, monthlyExpenses, hasCar, isElectricCar, carValue, hasProperty, propertyValue, results, setStep, updateData } = useWizardStore();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-neutral-950 text-white md:overflow-hidden">
      
      {/* Lado Esquerdo: Perguntas */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col relative z-10 border-r border-neutral-800">
        <div className="w-full max-w-lg mx-auto my-auto py-12 md:py-8">
        <h1 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          QuantoValho
        </h1>

        <AnimatePresence mode="wait">
          {step === 1 && (
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
                  <label className="block text-sm text-neutral-400">Salário Bruto</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
                    <input 
                      type="number" 
                      value={grossSalary || ''}
                      onChange={(e) => updateData({ grossSalary: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="1412" max="50000" step="500"
                    value={grossSalary}
                    onChange={(e) => updateData({ grossSalary: Number(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl font-semibold mb-2">Onde você vive e o que possui?</h2>
                <p className="text-neutral-400 mb-8">Impostos estaduais e patrimoniais fazem uma grande diferença.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Estado</label>
                    <select 
                      value={stateUF}
                      onChange={(e) => updateData({ stateUF: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 px-4 text-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="BA">Bahia</option>
                    </select>
                  </div>
                  
                  <div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-xl flex-1 cursor-pointer hover:border-neutral-700 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={hasCar}
                          onChange={(e) => updateData({ hasCar: e.target.checked })}
                          className="w-5 h-5 accent-primary rounded"
                        />
                        <span className="text-lg">Tenho carro</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-xl flex-1 cursor-pointer hover:border-neutral-700 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={hasProperty}
                          onChange={(e) => updateData({ hasProperty: e.target.checked })}
                          className="w-5 h-5 accent-primary rounded"
                        />
                        <span className="text-lg">Imóvel próprio</span>
                      </label>
                    </div>
                    {hasCar && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="mt-4 space-y-4"
                      >
                        <label className="flex items-center gap-3 p-4 border border-neutral-800 rounded-xl cursor-pointer hover:border-neutral-700 transition-colors w-fit">
                          <input 
                            type="checkbox" 
                            checked={isElectricCar}
                            onChange={(e) => updateData({ isElectricCar: e.target.checked })}
                            className="w-5 h-5 accent-primary rounded"
                          />
                          <span className="text-md">É um carro elétrico?</span>
                        </label>

                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">Qual o valor aproximado do carro? (Opcional)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
                            <input 
                              type="number" 
                              placeholder="70000"
                              value={carValue || ''}
                              onChange={(e) => updateData({ carValue: e.target.value ? Number(e.target.value) : null })}
                              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {hasProperty && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="mt-4"
                      >
                        <label className="block text-sm text-neutral-400 mb-2">Qual o valor venal/mercado do imóvel? (Opcional)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
                          <input 
                            type="number" 
                            placeholder="Ex: 350000"
                            value={propertyValue || ''}
                            onChange={(e) => updateData({ propertyValue: e.target.value ? Number(e.target.value) : null })}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-12 pr-4 text-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
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
                  <label className="block text-sm text-neutral-400">Estimativa de gastos (cartão/dinheiro)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
                    <input 
                      type="number" 
                      value={monthlyExpenses || ''}
                      onChange={(e) => updateData({ monthlyExpenses: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="500" max="20000" step="500"
                    value={monthlyExpenses}
                    onChange={(e) => updateData({ monthlyExpenses: Number(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
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
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Avançar <ArrowRight size={20} />
            </button>
          ) : (
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors"
            >
              Recomeçar
            </button>
          )}
        </div>
        </div>
      </div>

      {/* Lado Direito: Resultados Dinâmicos */}
      <div className="w-full md:w-1/2 p-8 md:p-16 bg-neutral-900 relative md:overflow-y-auto flex flex-col">
        <div className="max-w-md w-full mx-auto my-auto space-y-6 py-12 md:py-8">
          
          <motion.div layout className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl">
            <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Resumo Mensal</h3>
            <div className="flex justify-between items-end mb-4">
              <span className="text-xl">Salário Bruto</span>
              <span className="text-2xl font-medium"><NumberTicker value={results.grossSalary} /></span>
            </div>
            <div className="space-y-3 mb-6 border-t border-neutral-800 pt-4">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-neutral-400">INSS ({(results.employeeCostBreakdown.inss.rate * 100).toFixed(1)}%)</span>
                  <span className="text-red-400">-<NumberTicker value={results.employeeCostBreakdown.inss.value} /></span>
                </div>
                <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                  Faixa: {results.employeeCostBreakdown.inss.rangeName}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-neutral-400">Imposto de Renda ({(results.employeeCostBreakdown.irpf.rate * 100).toFixed(1)}%)</span>
                  <span className="text-red-400">-<NumberTicker value={results.employeeCostBreakdown.irpf.value} /></span>
                </div>
                <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                  Faixa: {results.employeeCostBreakdown.irpf.rangeName}
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-800 flex justify-between items-end">
              <span className="text-xl font-semibold text-primary-light">Salário Líquido</span>
              <span className="text-3xl font-bold text-white"><NumberTicker value={results.netSalary} /></span>
            </div>
          </motion.div>

          <AnimatePresence>
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl"
            >
              <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">O Custo Oculto (Empresa)</h3>
              <p className="text-sm text-neutral-500 mb-4">O que a empresa paga por você, que poderia ser seu.</p>
              <div className="space-y-2 mb-4 border-t border-neutral-800 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">INSS Patronal ({(results.companyCostBreakdown.inssPatronal.rate * 100).toFixed(1)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.inssPatronal.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">FGTS Mês ({(results.companyCostBreakdown.fgts.rate * 100).toFixed(1)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.fgts.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Sistema S / Terceiros ({(results.companyCostBreakdown.sistemaS.rate * 100).toFixed(1)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.sistemaS.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Seguro Acidente / RAT ({(results.companyCostBreakdown.satRat.rate * 100).toFixed(1)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.satRat.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Provisão 13º ({(results.companyCostBreakdown.provisao13.rate * 100).toFixed(2)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.provisao13.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Provisão Férias + 1/3 ({(results.companyCostBreakdown.provisaoFerias.rate * 100).toFixed(2)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.provisaoFerias.value} /></span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">FGTS s/ Provisões ({(results.companyCostBreakdown.fgtsProvisoes.rate * 100).toFixed(2)}%)</span>
                  <span className="text-orange-300"><NumberTicker value={results.companyCostBreakdown.fgtsProvisoes.value} /></span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-neutral-800 pt-4">
                <span className="text-lg">Custo Total da Empresa</span>
                <span className="text-2xl font-bold text-orange-400"><NumberTicker value={results.totalCompanyCost} /></span>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div 
                layout
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
              >
                <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-4">Impostos Patrimoniais (Ano)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">IPVA ({(results.wealthTaxBreakdown.ipvaRate * 100).toFixed(1)}%)</span>
                      <span className="text-red-400 font-medium"><NumberTicker value={results.yearlyIpva} /></span>
                    </div>
                    <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                      {results.wealthTaxBreakdown.isCarValueEstimated ? `Estimativa baseada em carro de ${formatCurrency(results.wealthTaxBreakdown.carValueUsed)}` : `Sobre ${formatCurrency(results.wealthTaxBreakdown.carValueUsed)}`}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">IPTU ({(results.wealthTaxBreakdown.iptuRate * 100).toFixed(1)}%)</span>
                      <span className="text-red-400 font-medium"><NumberTicker value={results.yearlyIptu} /></span>
                    </div>
                    <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                      {results.wealthTaxBreakdown.isPropertyValueEstimated 
                          ? `Média anual do Estado (${stateUF})` 
                          : `Sobre ${formatCurrency(results.wealthTaxBreakdown.propertyValueUsed || 0)}`}
                    </div>
                  </div>
                </div>
                {(hasCar || hasProperty) && (
                  <div className="flex justify-between items-end border-t border-neutral-800 pt-4 mt-4">
                    <span className="text-lg">Total Patrimonial Anual</span>
                    <span className="text-2xl font-bold text-red-400"><NumberTicker value={results.yearlyIpva + results.yearlyIptu} /></span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div 
                layout
                initial={{ opacity: 0, height: 0, y: 20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden"
              >
                <h3 className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-2">Consumo Mensal</h3>
                <p className="text-sm text-neutral-500 mb-4">Impostos embutidos em tudo que você compra (embutidos nos preços).</p>
                <div className="space-y-3 mb-4 border-t border-neutral-800 pt-4">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">ICMS ({(results.consumptionTaxBreakdown.icms.rate * 100).toFixed(1)}%)</span>
                      <span className="text-red-400">-<NumberTicker value={results.consumptionTaxBreakdown.icms.value} /></span>
                    </div>
                    <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                      Imposto Estadual sobre circulação de mercadorias.
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">PIS/COFINS ({(results.consumptionTaxBreakdown.pisCofins.rate * 100).toFixed(2)}%)</span>
                      <span className="text-red-400">-<NumberTicker value={results.consumptionTaxBreakdown.pisCofins.value} /></span>
                    </div>
                    <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block">
                      Contribuição Federal para financiamento da seguridade social.
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">IPI / IBPT / Outros ({(results.consumptionTaxBreakdown.ipiIbpt.rate * 100).toFixed(2)}%)</span>
                      <span className="text-red-400">-<NumberTicker value={results.consumptionTaxBreakdown.ipiIbpt.value} /></span>
                    </div>
                    <div className="text-xs text-neutral-600 bg-neutral-900 rounded px-2 py-1 inline-block mt-1 leading-relaxed">
                      IBPT (Instituto Brasileiro de Planejamento Tributário) mede a carga tributária média indireta incluindo impostos sobre industrialização (IPI), importação e cascata.
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-neutral-800 pt-4">
                  <span className="text-lg">Total embutido no consumo</span>
                  <span className="text-2xl font-bold text-red-400"><NumberTicker value={results.monthlyIndirectTaxes} /></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
