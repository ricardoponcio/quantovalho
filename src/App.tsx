import { Route, Switch } from 'wouter';
import { WizardPanel } from './features/wizard/WizardPanel';
import { ReceiptPanel } from './features/receipt/ReceiptPanel';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-neutral-950 text-white md:overflow-hidden">
          <WizardPanel />
          <ReceiptPanel />
        </div>
      </Route>
      <Route path="/sobre" component={AboutPage} />
    </Switch>
  );
}
