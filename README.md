# Portfolio Base

Estrutura estaticamente hospedável para publicar no `GitHub Pages` ou no `Vercel`.

## Arquivos

- `index.html`: página principal
- `styles.css`: identidade visual e responsividade
- `script.js`: menu mobile, carregamento de idioma e animações de entrada
- `lang/pt.json`: textos em português
- `lang/en.json`: textos em inglês

## Antes de publicar

Troque no `index.html`:

- `SeuNome.dev`
- e-mail
- links de GitHub e LinkedIn
- métricas e descrições com números reais

Troque os textos do site em:

- `lang/pt.json`
- `lang/en.json`

Observação:

- Se editar um texto traduzível direto no HTML com `data-i18n`, ele será sobrescrito pelo idioma carregado.
- Para testar a troca de idioma corretamente, abra o site hospedado ou por um servidor local; alguns navegadores bloqueiam `fetch` de arquivos JSON ao abrir o HTML direto por caminho local.

## Publicar no GitHub Pages

1. Suba a pasta `portfolio` para um repositório.
2. Se quiser usar a raiz do repositório, mova os arquivos para a raiz antes.
3. No GitHub, abra `Settings > Pages`.
4. Em `Build and deployment`, selecione a branch principal e a pasta correta.

## Publicar no Vercel

1. Importe o repositório no Vercel.
2. Em `Root Directory`, selecione `portfolio` se ela continuar como subpasta.
3. O deploy funciona como site estático, sem configuração extra.
