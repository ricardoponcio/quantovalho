import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export const downloadReceiptAsPdf = async (elementId: string, filename: string = 'quantovalho_extrato.pdf') => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Elemento não encontrado para gerar o PDF');
    return false;
  }

  try {
    // Salva o estado original do elemento
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflow;
    
    // Força o elemento a crescer o quanto precisar para capturar o conteúdo scrollado
    element.style.height = 'auto';
    element.style.overflow = 'visible';

    // Para o flex md:overflow-hidden funcionar corretamente, precisamos garantir que
    // as barras de rolagem filhas não atrapalhem:
    const childrenToFix = element.querySelectorAll('.md\\:overflow-y-auto, .overflow-y-auto');
    const originalChildrenStyles = Array.from(childrenToFix).map(child => {
      const el = child as HTMLElement;
      const h = el.style.height;
      const o = el.style.overflow;
      el.style.height = 'auto';
      el.style.overflow = 'visible';
      return { el, h, o };
    });

    const dataUrl = await htmlToImage.toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#0a0a0a', // neutral-950 (Fundo do App)
    });

    // Reverte o CSS original
    element.style.height = originalHeight;
    element.style.overflow = originalOverflow;
    originalChildrenStyles.forEach(({ el, h, o }) => {
      el.style.height = h;
      el.style.overflow = o;
    });

    // Pega as dimensões reais renderizadas
    const imgProps = new Image();
    imgProps.src = dataUrl;
    
    await new Promise((resolve) => {
      imgProps.onload = resolve;
    });

    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
    
    // PDF de Tamanho Dinâmico (Infográfico)
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [imgWidth, imgHeight],
    });

    // Como o formato é exato, colamos a imagem na coordenada (0,0) cobrindo 100%
    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return false;
  }
};
