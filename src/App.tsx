import { WizardPanel } from './features/wizard/WizardPanel';
import { ReceiptPanel } from './features/receipt/ReceiptPanel';

export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-neutral-950 text-white md:overflow-hidden">
      <WizardPanel />
      <ReceiptPanel />
    </div>
  );
}
