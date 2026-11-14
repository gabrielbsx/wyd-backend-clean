# Como contribuir

Obrigado por ajudar a melhorar o WYD Backend Clean.

## Antes de começar

1. Leia o [README](README.md) e configure um ambiente local isolado.
2. Procure issues e pull requests existentes para evitar trabalho duplicado.
3. Para mudanças grandes, abra uma issue explicando o problema e a proposta antes de implementar.

## Enviar uma mudança

1. Faça um fork e crie uma branch com um nome descritivo.
2. Mantenha o diff focado em um problema. Evite misturar refatorações com correções.
3. Siga a organização existente: casos de uso em `src/core/usecases`, contratos em `src/ports`, implementações em `src/adapters` e composição em `src/main/setup.ts`.
4. Execute `npm ci` e `npm run build`.
5. Reproduza o fluxo alterado localmente e registre os passos e resultados no PR. Remova dados pessoais, senhas e tokens dos exemplos.

O repositório ainda não tem suíte automatizada de testes. O build não faz checagem de tipos; o problema atual de `tsconfig.json` está descrito no README. Não declare testes aprovados quando apenas o build foi executado.

## O que incluir no pull request

- Qual problema a mudança resolve.
- O comportamento anterior e o esperado.
- Como a mudança foi validada, com comandos e resultados.
- Limitações ou passos que ainda faltam.

## Boas primeiras contribuições

- Adicionar testes aos casos de uso usando implementações falsas dos contratos.
- Corrigir a referência ausente no `tsconfig.json` e avaliar os demais erros de tipos.
- Corrigir e testar o fallback de MongoDB em memória.
- Revisar o caminho de uploads e a criação dos diretórios.
- Revisar a aplicação dos middlewares de autenticação e autorização às rotas.

Esses itens são oportunidades identificadas no código, não promessas de funcionalidades prontas. Verifique as issues antes de começar.

## Relatar problemas

Para bugs comuns, [abra uma issue](https://github.com/gabrielbsx/wyd-backend-clean/issues) com ambiente, passos para reproduzir e resultado esperado. Não publique credenciais, dados reais ou detalhes exploráveis de vulnerabilidades em uma issue pública; use o canal privado de segurança do repositório, quando disponível.
