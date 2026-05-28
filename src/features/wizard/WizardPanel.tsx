import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'wouter';
import { useWizardStore } from '../../store/wizardStore';
import { StepIncome } from './steps/StepIncome';
import { StepAssets } from './steps/StepAssets';
import { StepConsumption } from './steps/StepConsumption';
import { StepSummary } from './steps/StepSummary';
import { Button } from '../../components/ui/Button';
import { downloadReceiptAsPdf } from '../../utils/exportPdf';

export const WizardPanel = () => {
  const { step, setStep } = useWizardStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleDownload = async () => {
    setIsExporting(true);
    await downloadReceiptAsPdf('app-container', 'quantovalho_extrato.pdf');
    setIsExporting(false);
  };

  return (
    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col relative z-10 border-r border-neutral-800 md:overflow-y-auto">
      <div className="w-full max-w-lg mx-auto my-auto py-12 md:py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="QuantoValho Logo" className="w-8 h-8" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              QuantoValho?
            </h1>
          </div>
          <Link href="/sobre">
            <a className="text-xs text-neutral-500 hover:text-primary transition-colors cursor-pointer border border-neutral-800 rounded-full px-3 py-1 bg-neutral-900">
              Como é calculado?
            </a>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && <StepIncome />}
          {step === 2 && <StepAssets />}
          {step === 3 && <StepConsumption />}
          {step === 4 && <StepSummary />}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between">
          <Button 
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft size={20} /> Voltar
          </Button>
          
          {step < 4 ? (
            <Button 
              variant="secondary"
              onClick={handleNext}
            >
              Avançar <ArrowRight size={20} />
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={isExporting}
              >
                <Download size={20} /> {isExporting ? 'Gerando...' : 'Baixar Extrato'}
              </Button>
              <Button 
                variant="primary"
                onClick={() => setStep(1)}
              >
                Recomeçar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
