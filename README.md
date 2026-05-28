<p align="center">
  <img src="public/favicon.svg" width="120" alt="QuantoValho Logo" />
</p>

<h1 align="center">QuantoValho? 💸</h1>

<p align="center">
  <strong>Descubra o verdadeiro peso do Estado no fruto do seu trabalho.</strong><br>
  Uma calculadora imersiva e interativa que revela a sua verdadeira carga tributária no Brasil.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-aviso-importante">Aviso</a>
</p>

<p align="center">
  <strong>🔥 Teste agora a demonstração online: <a href="https://quantovalho.poncio.dev">https://quantovalho.poncio.dev</a></strong>
</p>

---

## 🔍 Sobre o Projeto

O **QuantoValho?** é uma aplicação web desenvolvida com o objetivo de conscientizar a população brasileira sobre a quantidade real de riqueza gerada pelo seu trabalho e quanto dessa riqueza é apropriada pelo Estado através de impostos diretos, indiretos e encargos trabalhistas (os chamados "Custo Empresa").

Muitas pessoas olham apenas para o desconto de INSS e IRPF no contracheque, sem perceber o custo colossal que o empregador paga "por fora" (INSS Patronal, Sistema S, RAT, FGTS) e os altos impostos embutidos em tudo que consomem no dia a dia.

Essa calculadora junta as peças do quebra-cabeça e responde à pergunta definitiva: **Do valor total que você custa para a sua empresa, qual a porcentagem que vai parar nas mãos do Governo?**

## ✨ Funcionalidades

- 💰 **Simulação Realista:** Baseada em regras tributárias vigentes (INSS, IRPF, Faixas de Isenção).
- 🏢 **Cálculo de Custo Empresa (Custo Oculto):** Transforma o "Salário Bruto" no custo total real que você gera para o seu empregador.
- 🛒 **Tributação sobre Consumo e Patrimônio:** Estima o ICMS/IPI embutidos no seu estilo de vida, além de provisionar o peso do IPVA e IPTU.
- 📊 **Extrato Detalhado:** Quebra completa visualmente separada entre *Entregue ao Governo (Imposto)*, *Compartilhado (FGTS)* e *Benefícios Diretos (Férias/13º)*.
- 📱 **Mobile First & Design Premium:** Interface limpa, responsiva e focada na experiência do usuário (UX).
- 🖨️ **Exportação em PDF (Infográfico):** Geração dinâmica do recibo com alta fidelidade vetorial para fácil compartilhamento em redes sociais ou WhatsApp.

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- NPM ou Yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/quantovalho.git
cd quantovalho
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador.

### Build de Produção
Para compilar para produção:
```bash
npm run build
```

## 🛠️ Tecnologias

- **React 18** (Vite)
- **TypeScript** (Tipagem forte e arquitetura SOLID)
- **Tailwind CSS v4** (Estilização utilitária e cores dinâmicas via oklch)
- **Zustand** (Gerenciamento de estado global)
- **Framer Motion** (Animações fluidas de UI)
- **Wouter** (Roteamento minimalista)
- **html-to-image & jsPDF** (Exportação de Infográficos)

## 🤖 Aviso Importante

> Este projeto foi concebido e codificado com o auxílio de **Inteligência Artificial**, atuando em *pair-programming* para acelerar o desenvolvimento, garantir boas práticas de arquitetura de software (SOLID) e refinamento da interface de usuário (UI/UX).
> 
> O propósito desta ferramenta é puramente **educativo e informativo**, buscando disseminar de forma acessível a compreensão financeira e tributária para toda a população brasileira. 
>
> 🚧 **Atenção:** Os dados base de cálculo (alíquotas, faixas e multiplicadores disponíveis em `src/data/constants.json`) estão atualmente passando por revisões e refinamentos contínuos para garantir a máxima precisão possível. **Sua colaboração é muito bem-vinda!** Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request* sugerindo melhorias na modelagem tributária.
