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
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl mb-12">
            <h2 className="text-xl font-semibold text-emerald-400 mb-3">Nosso propósito: Transparência Cidadã</h2>
            <p className="text-neutral-300 leading-relaxed">
              O financiamento dos serviços públicos e do Estado tem um custo, e acreditamos que todo cidadão tem o direito fundamental de saber exatamente quanto do seu esforço diário é direcionado para a sociedade. Nosso objetivo não é fazer juízo de valor, mas sim dar clareza matemática para que você entenda o verdadeiro peso do seu trabalho. A informação transparente é o primeiro passo para o exercício pleno da cidadania.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">1. O Custo Oculto (Empresa)</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            Muitas vezes o custo de um profissional é associado apenas ao seu Salário Bruto. No entanto, o sistema tributário e trabalhista estabelece que a empresa recolha uma série de contribuições patronais e sociais para financiar a seguridade e outros serviços. Como esse valor faz parte do orçamento destinado à sua vaga, consideramos que <strong>este recurso é fruto exclusivo do seu trabalho e do seu esforço econômico</strong>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>INSS Patronal:</strong> {(c.inss_patronal * 100).toFixed(1)}% sobre a folha.</li>
            <li><strong>FGTS:</strong> {(c.fgts * 100).toFixed(1)}% depositados mensalmente.</li>
            <li><strong>Sistema S e Terceiros:</strong> Média de {(c.sistema_s_e_outros * 100).toFixed(1)}% (SESI, SENAI, Sebrae, etc).</li>
            <li><strong>Seguro Acidente (SAT/RAT):</strong> Estimado em média como {(c.sat_rat_medio * 100).toFixed(1)}%.</li>
            <li><strong>Provisão de 13º e Férias:</strong> {(c.decimo_terceiro * 100).toFixed(1)}% e {(c.ferias_e_terco * 100).toFixed(2)}%, respectivamente, com as devidas cobranças de FGTS adicionais ({(c.fgts_provisoes * 100).toFixed(2)}%).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">2. Impostos Diretos (Retidos)</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            Sobre o seu salário bruto incidem as tabelas oficiais de contribuição para a sua aposentadoria e o financiamento do Estado.
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>INSS do Trabalhador:</strong> Tabela progressiva que vai de 7.5% até 14%, com teto máximo.</li>
            <li><strong>Imposto de Renda (IRPF):</strong> Calculado sobre a base, com faixas variando de Isento a 27.5%, abatendo as deduções legais por faixa.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-neutral-800 pb-2">3. Impostos sobre Consumo</h2>
          <p className="text-neutral-300 mb-4 leading-relaxed">
            No Brasil, uma parte expressiva da arrecadação acontece de forma indireta. Isso significa que, ao utilizar o seu salário líquido para comprar produtos e serviços, uma fatia considerável do valor pago na prateleira é, na verdade, imposto embutido. Utilizamos médias baseadas nos indicadores do Instituto Brasileiro de Planejamento e Tributação (IBPT).
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>ICMS Médio:</strong> {(i.icms_medio * 100).toFixed(1)}% (Tributo Estadual).</li>
            <li><strong>PIS/COFINS Médio:</strong> {(i.pis_cofins * 100).toFixed(2)}% (Tributo Federal).</li>
            <li><strong>IPI / Efeitos em Cascata:</strong> {(i.ipi_ibpt_outros * 100).toFixed(2)}% de carga invisível embutida nas cadeias de produção.</li>
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
            Ao conquistar bens como imóveis e veículos com o suor do seu trabalho, existem contribuições anuais destinadas à manutenção estrutural dos estados e municípios.
          </p>
          <ul className="list-disc list-inside space-y-2 text-neutral-400">
            <li><strong>IPVA:</strong> Média extraída das secretarias da Fazenda por UF. Alguns estados oferecem isenção ou taxas reduzidas para carros elétricos. O cálculo utiliza o valor médio estadual (que nós atualizamos para a realidade de 2026), podendo ser ajustado com o seu valor real.</li>
            <li><strong>IPTU:</strong> Custo médio estimado em 1% sobre o valor venal. Alguns municípios possuem leis de teto máximo que limitam a cobrança.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};
