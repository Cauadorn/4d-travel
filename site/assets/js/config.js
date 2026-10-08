/* =========================================================
   4D Travel — CONFIGURAÇÕES DO SITE
   Tudo o que precisa ser trocado antes de publicar fica aqui.
   Depois de editar, rode `npm run build` de novo.
   ========================================================= */

export const CONFIG = {
  /* WhatsApp oficial: só números, com DDI 55 + DDD. Ex.: '5531999998888'.
     Vale para todos os botões de WhatsApp (página e página de obrigado). */
  whatsapp: '5500000000000',

  /* Mensagem que já vem escrita quando a pessoa abre o WhatsApp. */
  whatsappMessage: 'Olá! Vim pelo site da 4D Travel e quero falar sobre uma viagem corporativa.',

  /* Para onde o formulário envia os dados (POST com os campos do formulário).
     Pode ser o endpoint REST do Contact Form 7, um webhook do CRM, Formspree etc.
     Vazio = modo demonstração: não envia nada, só leva para a página de obrigado. */
  formEndpoint: '',

  /* Página exibida depois do envio do formulário. */
  thankYouPage: 'obrigado.html',

  /* Vídeo do CREDFRANCO Te Leva (dez/2025). Aceita:
     - ID do YouTube, ex.: 'DgaDGvrbl8g'
     - arquivo .mp4 salvo em public/video/, ex.: 'video/credfranco-te-leva.mp4'
     Vazio = mostra o selo "Vídeo em breve" ao clicar no play. */
  caseVideo: ''
};

export function whatsappUrl() {
  return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappMessage);
}
