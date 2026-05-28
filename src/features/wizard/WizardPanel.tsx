import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'wouter';
import { useWizardStore } from '../../store/wizardStore';
import { StepIncome } from './steps/StepIncome';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { StepAssets } from './steps/StepAssets';
import { StepConsumption } from './steps/StepConsumption';
import { StepSummary } from './steps/StepSummary';
import { Button } from '../../components/ui/Button';
import { downloadReceiptAsPdf } from '../../utils/exportPdf';

export const WizardPanel = () => {
  const { step, setStep } = useWizardStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showMobileHint, setShowMobileHint] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  useEffect(() => {
    if (step === 2) {
      setShowMobileHint(true);
      const timer = setTimeout(() => setShowMobileHint(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowMobileHint(false);
    }
  }, [step]);

  const handleDownload = async () => {
    setIsExporting(true);
    await downloadReceiptAsPdf('app-container', 'quantovalho_extrato.pdf');
    setIsExporting(false);
  };

  return (
    <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col relative z-10 border-b md:border-b-0 md:border-r border-neutral-800 md:overflow-y-auto">
      <div className="w-full max-w-lg mx-auto my-auto py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
            <img src="/favicon.svg" alt="QuantoValho Logo" className="w-8 h-8" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              QuantoValho?
            </h1>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-4 w-full sm:w-auto">
            <a 
              href="https://github.com/ricardoponcio/quantovalho" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
              title="Ver código fonte no GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <Link 
              href="/sobre" 
              className="text-xs text-neutral-500 hover:text-primary transition-colors cursor-pointer border border-neutral-800 rounded-full px-4 py-1.5 bg-neutral-900 text-center w-fit"
            >
              Como é calculado?
            </Link>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && <StepIncome />}
          {step === 2 && <StepAssets />}
          {step === 3 && <StepConsumption />}
          {step === 4 && <StepSummary />}
        </AnimatePresence>

        <div className="mt-12 flex flex-col-reverse md:flex-row md:items-center justify-between gap-4">
          <Button 
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="w-full md:w-auto justify-center"
          >
            <ArrowLeft size={20} /> Voltar
          </Button>
          
          {step < 4 ? (
            <Button 
              variant="secondary"
              onClick={handleNext}
              className="w-full md:w-auto justify-center"
            >
              Avançar <ArrowRight size={20} />
            </Button>
          ) : (
            <div className="flex flex-col-reverse md:flex-row gap-3 w-full md:w-auto">
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={isExporting}
                className="w-full md:w-auto justify-center"
              >
                <Download size={20} /> {isExporting ? 'Gerando...' : 'Baixar Extrato'}
              </Button>
              <Button 
                variant="primary"
                onClick={() => setStep(1)}
                className="w-full md:w-auto justify-center"
              >
                Recomeçar
              </Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMobileHint && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-5 py-3 rounded-full text-sm font-bold shadow-xl shadow-orange-500/20 z-50 flex items-center gap-2 whitespace-nowrap"
          >
            👇 Veja o extrato lá embaixo!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
