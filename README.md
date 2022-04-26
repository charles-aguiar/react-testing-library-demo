# Testando aplicativos React

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app), que atomatiza a criação de algumas configurações e traz alguns pacotes e script úteis para testes automatizados.

## Pacotes necessários

Será utilizado o pacote `@testing-library/react` como a integração com o executor de testes `jest`. Para instalá-los, basta rodar o comando `npm install --save-dev` ou `yarn add -D`:

```
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event
```

- Obs.: estes pacotes já vêm pré-instalados caso utilize o create-react-app para fazer o bootstrap do projeto, exceto pelo módulo `@testing-library/react-hooks`, que precisa ser instalado a parte.

Os pacotes `@testing-library/react` e `@testing-library/jest-dom` provêm as funcionalidades da lib `@testing-library` para o React e a integração com o `jest`, respectivamente. O pacote `@testing-library/user-event` provê uma API para simualação de eventos do usuário, como digitação em uma caixa de texto, clique de um botão, rolagem de uma página etc. O pacote `@testing-library/react-hooks` fornece ferramentas para testes de hooks customizados. A documentação pode ser encontrada no [site oficial](https://testing-library.com/docs/react-testing-library/intro/) da lib.

## Rodando os testes

Para rodas os testes, basta executar na pasta raiz do projeto:

```
npm run test
```

ou

```
yarn test
```

Também é possível passar alguns parâmetros, por exemplo

```
yarn test -- Component.test.js
```

vai executar apenas o teste `Component.test.js`; o comando

```
yarn test -- --coverage
```

vai executar todos os testes e também gerar um report de cobertura. Demais parametrizações podem ser exploradas em https://create-react-app.dev/docs/running-tests/.

## Por quê testar meu app?

- Aumentar a robustez e confiabilidade da aplicação;
- Muitas vezes, testes unitários não são suficiente: testes de integração, e2e, pirâmide de testes;
- Desensevolvimento orientado à esperança;
- Importante: devemos testar **funcionalidades** acima de detalhes de implementação!
- Recompensa: Boas noites de sono!

![Spongebob](/public/spongebob.png)
