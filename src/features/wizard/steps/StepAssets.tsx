import { motion } from 'framer-motion';
import { useWizardStore } from '../../../store/wizardStore';
import { Label } from '../../../components/ui/form/Label';
import { CurrencyInput } from '../../../components/ui/form/CurrencyInput';
import { CheckboxCard } from '../../../components/ui/form/CheckboxCard';
import { Select } from '../../../components/ui/form/Select';

export const StepAssets = () => {
  const { stateUF, hasCar, isElectricCar, carValue, hasProperty, propertyValue, updateData } = useWizardStore();

  return (
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
            <Label>Estado</Label>
            <Select 
              value={stateUF}
              onChange={(e) => updateData({ stateUF: e.target.value })}
            >
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="BA">Bahia</option>
            </Select>
          </div>
          
          <div>
            <div className="flex gap-4">
              <CheckboxCard 
                label="Tenho carro"
                checked={hasCar}
                onChange={(e) => updateData({ hasCar: e.target.checked })}
                isFlexOne
              />
              <CheckboxCard 
                label="Imóvel próprio"
                checked={hasProperty}
                onChange={(e) => updateData({ hasProperty: e.target.checked })}
                isFlexOne
              />
            </div>
            
            {hasCar && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="mt-4 space-y-4"
              >
                <CheckboxCard 
                  label="É um carro elétrico?"
                  checked={isElectricCar}
                  onChange={(e) => updateData({ isElectricCar: e.target.checked })}
                />

                <div>
                  <Label>Qual o valor aproximado do carro? (Opcional)</Label>
                  <CurrencyInput 
                    placeholder="70000"
                    value={carValue}
                    onChange={(value) => updateData({ carValue: value })}
                  />
                </div>
              </motion.div>
            )}
            
            {hasProperty && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="mt-4"
              >
                <Label>Qual o valor venal/mercado do imóvel? (Opcional)</Label>
                <CurrencyInput 
                  placeholder="Ex: 350000"
                  value={propertyValue}
                  onChange={(value) => updateData({ propertyValue: value })}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
