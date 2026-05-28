import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import constants from '../data/constants.json';

export const AboutPage = () => {
  const c = constants.encargos_empresa_clt;
  const i = constants.impostos_consumo_detalhado;

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-y-auto">
      <div className="max-w-3xl mx-auto py-16 px-8">
        
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 cursor-pointer">
            <ArrowLeft size={20} /> Voltar para o Simulador
          </a>
        </Link>

        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Como o cálculo é feito?
        </h1>
        <p className="text-xl text-neutral-400 mb-12">
          Entenda a metodologia e a origem dos dados utilizados para calcular a sua carga tributária efetiva.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">1. O Custo Oculto (Empresa)</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            Muitos acreditam que o custo de um funcionário se resume ao Salário Bruto. Na realidade, o Governo exige que a empresa pague uma série de tributos e provisões por fora, que encarecem enormemente o custo do trabalho. Nós consideramos que <strong>este dinheiro também é gerado por você</strong>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>INSS Patronal:</strong> {(c.inss_patronal * 100).toFixed(1)}% sobre a folha.</li>
            <li><strong>FGTS:</strong> {(c.fgts * 100).toFixed(1)}% depositados mensalmente.</li>
            <li><strong>Sistema S e Terceiros:</strong> Média de {(c.sistema_s_e_outros * 100).toFixed(1)}% cobrados para SESI, SENAI, Sebrae, etc.</li>
            <li><strong>Seguro Acidente (SAT/RAT):</strong> Estimado em média como {(c.sat_rat_medio * 100).toFixed(1)}%.</li>
            <li><strong>Provisão de 13º e Férias:</strong> {(c.decimo_terceiro * 100).toFixed(1)}% e {(c.ferias_e_terco * 100).toFixed(2)}%, respectivamente, com as devidas cobranças de FGTS adicionais ({(c.fgts_provisoes * 100).toFixed(2)}%).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">2. Impostos Diretos (CLT)</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            Sobre o seu salário bruto incidem as tabelas progressivas oficiais da Receita Federal (2024).
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>INSS do Trabalhador:</strong> Tabela progressiva que vai de 7.5% até 14%, com teto máximo estabelecido.</li>
            <li><strong>Imposto de Renda (IRPF):</strong> Calculado sobre a base (Salário Bruto menos INSS), com faixas progressivas variando de Isento a 27.5%, abatendo as deduções legais por faixa.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">3. Impostos sobre Consumo</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            A carga tributária brasileira é altamente regressiva, focada no consumo. Tudo o que você compra com o seu salário líquido já vem com o imposto embutido no preço da prateleira. Utilizamos médias baseadas nos indicadores do Instituto Brasileiro de Planejamento e Tributação (IBPT).
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>ICMS Médio:</strong> {(i.icms_medio * 100).toFixed(1)}% (Imposto Estadual).</li>
            <li><strong>PIS/COFINS Médio:</strong> {(i.pis_cofins * 100).toFixed(2)}% (Imposto Federal).</li>
            <li><strong>IPI / Efeitos em Cascata:</strong> {(i.ipi_ibpt_outros * 100).toFixed(2)}% de carga invisível (indústria, importação e margens).</li>
          </ul>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl mt-4">
            <p className="text-sm text-neutral-400">
              No total, estimamos uma retenção média sobre o consumo geral do brasileiro que varia por estado, absorvendo todo esse percentual do seu custo de vida mensal (cartão e dinheiro).
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">4. Impostos Patrimoniais</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            Apenas por deter a posse de um bem, o Estado cobra anuidades sobre o valor de mercado (venal).
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>IPVA:</strong> Média extraída das secretarias da Fazenda por UF. Alguns estados oferecem isenção ou taxas reduzidas para carros elétricos. O cálculo utiliza o valor médio nacional, podendo ser ajustado com o seu valor real.</li>
            <li><strong>IPTU:</strong> Custo médio estimado em 1% sobre o valor venal. Alguns municípios (ex: Curitiba) possuem leis de teto máximo que limitam a cobrança mesmo para imóveis mais caros, o que está mapeado na nossa base.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};
