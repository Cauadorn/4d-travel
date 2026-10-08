# 4D Travel — landing page

Landing page da **4D Travel**, a frente de viagens corporativas da 4D (incentivos, convenções e premiações).

> **Endereço local:** http://localhost:5180 · **Comando:** `npm run dev`

---

## Qual código o site usa

| Linguagem / ferramenta | Para quê | Onde fica |
|---|---|---|
| **HTML** | estrutura e textos da página | `site/index.html`, `site/obrigado.html` |
| **CSS** | visual: cores, fontes, layout, animações, versão para celular | `site/assets/css/style.css` |
| **JavaScript** | interações: menu, animações ao rolar, avião do itinerário, vídeo, formulário | `site/assets/js/` |
| **Node.js + Vite** | só na máquina de quem desenvolve: roda o `localhost` e gera a versão final otimizada | `package.json`, `vite.config.js` |

Não usa React, WordPress nem Elementor. O resultado final é um site estático (HTML + CSS + JS) que funciona em qualquer hospedagem.

---

## Estrutura de pastas

```
4D Travel [4D]/
│
├── site/                      ← CÓDIGO DO SITE (tudo o que vira a página)
│   ├── index.html             página principal
│   ├── obrigado.html          página de obrigado (depois do formulário)
│   ├── assets/
│   │   ├── css/style.css      visual (cores e fontes no topo, em :root)
│   │   ├── js/config.js       ⚙️ CONFIGURAÇÕES: WhatsApp, formulário, vídeo
│   │   ├── js/main.js         interações da página principal
│   │   ├── js/obrigado.js     script da página de obrigado
│   │   └── img/               imagens usadas no site (.webp), ícone e favicon
│   └── public/video/          vídeos .mp4 do site (se não usar YouTube)
│
├── _materiais/                ← MATERIAIS DE APOIO (não vão para o site)
│   ├── logos/                 logos da 4D em alta: coloque novos logos aqui
│   ├── imagens/
│   │   ├── geradas-ia/        originais em alta das imagens do site
│   │   └── fotos-reais/       coloque aqui as fotos reais das viagens
│   ├── videos/                vídeos brutos (ex.: CREDFRANCO Te Leva)
│   └── briefing/              briefing da página (textos aprovados)
│
├── scripts/empacotar.mjs      gera o .zip de publicação
├── .vscode/                   atalhos (tarefas) do Antigravity/VS Code
├── package.json               comandos do projeto e dependências
├── vite.config.js             configuração do servidor local (porta 5180) e do build
├── .nvmrc                     versão do Node (22)
├── .editorconfig              padrão de formatação do código
│
├── node_modules/              (gerada pelo npm install; não mexer, não enviar)
└── dist/                      (gerada pelo npm run build; é o que vai para a hospedagem)
```

Cada pasta de `_materiais/` tem um `LEIA-ME.md` explicando o que colocar nela e como levar o material para o site.

---

## 1. Instalar (uma vez só por computador)

1. Instale o **Node.js 22 LTS**: https://nodejs.org → botão "LTS".
2. Abra esta pasta (`4D Travel [4D]`) no **Antigravity** ou no VS Code: *File → Open Folder*.
3. Abra o terminal integrado (`Ctrl + '`) e rode:

```bash
npm install
```

## 2. Rodar o site (localhost)

```bash
npm run dev
```

O navegador abre em **http://localhost:5180**. A página se atualiza sozinha a cada arquivo salvo. Para parar o servidor, use `Ctrl + C` no terminal.

**Sem terminal:** `Ctrl + Shift + P` → *Tasks: Run Task* → **▶ Rodar site**.

### Portas: cada projeto tem a sua

| Projeto | Porta |
|---|---|
| 4D Eventos | 5173 |
| X3 | 4173 |
| Projetos de vídeo (Remotion) | 3000 |
| **4D Travel** | **5180** (conferência do build: 4180) |

A porta é fixa (`strictPort`). Se aparecer o erro *"Port 5180 is already in use"*, o site já está rodando em outro terminal: use essa aba ou feche-a antes. Para mudar a porta, edite `server.port` no `vite.config.js`.

## 3. Antes de publicar: configurações

Tudo fica em **[`site/assets/js/config.js`](site/assets/js/config.js)**:

| Campo | O que colocar | Situação |
|---|---|---|
| `whatsapp` | número com DDI + DDD, só números (ex.: `5531999998888`) | ⚠️ provisório |
| `whatsappMessage` | mensagem que já vem escrita no WhatsApp | ✅ |
| `formEndpoint` | URL que recebe os dados do formulário (ver seção 5) | ⚠️ vazio = modo demonstração, não envia os dados |
| `thankYouPage` | página exibida após o envio | ✅ `obrigado.html` |
| `caseVideo` | ID do YouTube ou `video/arquivo.mp4` | ⚠️ vazio = mostra "Vídeo em breve" |

## 4. Gerar a versão final e publicar

```bash
npm run build     # gera a versão final na pasta dist/
npm run preview   # confere a versão final em http://localhost:4180
npm run entrega   # faz o build e cria 4d-travel-publicar.zip
```

**Publicar = enviar o conteúdo da pasta `dist/`** (ou do `.zip`) para a pasta pública da hospedagem, por exemplo `public_html/4d-travel/`, o que resulta em `https://4dimensoes.com/4d-travel/`. Como os caminhos são relativos, o site funciona na raiz, numa subpasta ou num subdomínio.
Na Netlify, na Vercel ou no Cloudflare Pages: comando de build `npm run build` e pasta `dist`.

## 5. Formulário: para onde vão os dados

Com `formEndpoint` vazio, o formulário valida os campos e leva à página de obrigado, **sem enviar os dados**. Para receber os pedidos, informe uma URL que aceite `POST` com `FormData`:

- **Contact Form 7 (WordPress):** `https://4dimensoes.com/wp-json/contact-form-7/v1/contact-forms/ID/feedback`. Crie o formulário no CF7 com os mesmos `name` da tabela abaixo. A partir da versão 5.8, o CF7 também exige um campo oculto `_wpcf7_unit_tag`.
- **Webhook de CRM** (RD Station, HubSpot, Make, Zapier…) ou **Formspree**.

| Campo | name |
|---|---|
| Nome | `your-name` |
| Empresa | `your-company` |
| E-mail | `your-email` |
| Telefone/WhatsApp | `your-phone` |
| Tipo de viagem | `your-trip-type` |
| Destino / Local | `your-destination` |
| Duração | `your-duration` |
| Participantes | `your-people` |
| Investimento | `your-investiment` |
| Observação | `your-message` |
| Aceite LGPD | `acceptance-lgpd` |

## 6. Sequência das seções (segue o briefing, não alterar)

Hero + dores → Solução → Sobre → Prova social (vídeo) → Formulário → FAQ → CTA final → página de obrigado.
O briefing completo está em [`_materiais/briefing/`](_materiais/briefing/briefing-4d-travel.md).

## 7. Identidade visual

- **Cores:** azul 4D `#003fff`, céu `#050818`, papel `#f4f1ea` e horizonte `#ffb56b` (detalhes). Ficam no topo do `style.css`.
- **Fontes:** Archivo e JetBrains Mono (Google Fonts), as mesmas da LP 4D Eventos.

## 8. Passar o projeto para outra pessoa

Compacte a pasta `4D Travel [4D]` **sem** `node_modules/` e `dist/`. Quem receber abre a pasta no editor, roda `npm install` e depois `npm run dev`.

## 9. Pendências antes de ir ao ar

- [ ] Número oficial do WhatsApp (`config.js`)
- [ ] `formEndpoint` configurado e testado
- [ ] Vídeo do CREDFRANCO Te Leva (`caseVideo`)
- [ ] Revisar as perguntas 4 a 6 do FAQ (não estavam no briefing)
- [ ] Trocar as imagens de IA por fotos reais, se houver
- [ ] Confirmar a URL da Política de Privacidade (hoje aponta para a política geral da 4D)
- [ ] Google Tag Manager / Meta Pixel no `<head>` das duas páginas, se for usar
