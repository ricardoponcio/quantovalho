import React from 'react';
import { Car, Smartphone, Plane, Gamepad2, Coffee, Wallet } from 'lucide-react';
import constants from '../data/constants.json';

const iconMap: Record<string, React.ElementType> = {
  Car,
  Smartphone,
  Plane,
  Gamepad2,
  Coffee,
  Wallet
};

interface PurchasingPowerComparisonProps {
  value: number; // The difference or total amount to compare
}

export const PurchasingPowerComparison = ({ value }: PurchasingPowerComparisonProps) => {
  if (value <= 0) return null;

  const affordableItems = constants.comparativos
    .map(item => ({
      ...item,
      quantity: Math.floor(value / item.valor)
    }))
    .filter(item => item.quantity >= 1)
    .sort((a, b) => b.valor - a.valor);

  if (affordableItems.length === 0) {
    return (
      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mt-6 text-center">
        <p className="text-gray-400 text-sm">O valor é muito baixo para comparações.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        O que você poderia fazer com esse valor:
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {affordableItems.map((item) => {
          const Icon = iconMap[item.icon] || Wallet;
          
          return (
            <div 
              key={item.id} 
              className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg border border-white/5"
            >
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white leading-none mb-1">
                  {Intl.NumberFormat('pt-BR').format(item.quantity)}x
                </p>
                <p className="text-sm text-gray-400 leading-tight">
                  {item.nome}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
