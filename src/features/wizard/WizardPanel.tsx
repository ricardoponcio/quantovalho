import { AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useWizardStore } from '../../store/wizardStore';
import { StepIncome } from './steps/StepIncome';
import { StepAssets } from './steps/StepAssets';
import { StepConsumption } from './steps/StepConsumption';
import { StepSummary } from './steps/StepSummary';
import { Button } from '../../components/ui/Button';

export const WizardPanel = () => {
  const { step, setStep } = useWizardStore();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col relative z-10 border-r border-neutral-800">
      <div className="w-full max-w-lg mx-auto my-auto py-12 md:py-8">
        <h1 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          QuantoValho
        </h1>

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
            <Button 
              variant="primary"
              onClick={() => setStep(1)}
            >
              Recomeçar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
