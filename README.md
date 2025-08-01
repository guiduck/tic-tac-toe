# Polvos vs Ratos

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/guiduck/deal/actions/workflows/ci.yml/badge.svg)](https://github.com/guiduck/deal/actions/workflows/ci.yml)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## Description

**Polvos vs Ratos** é um jogo da velha épico onde ratos inteligentes e polvos dominadores batalham pela supremacia mundial. Após conquistarem os oceanos, os polvos liberaram um vírus que extinguiu a humanidade. Os ratos evoluíram com inteligência superior. Agora essas duas espécies lutam pelo controle do planeta através de um sistema de tabuleiros expansíveis com mecânicas avançadas de gameplay.

Desenvolvido em **React puro** com **JavaScript**, o projeto demonstra arquitetura funcional moderna, integrando classes imutáveis para entidades de jogo, hooks customizados escaláveis e um design system robusto com 95+ variáveis CSS organizadas. Uma experiência de jogo completa com personalização visual, controles por teclado e sistema de diálogos interativos.

Este projeto foi inspirado em um **jogo que desenvolvi anos atrás** que conquistou o **terceiro lugar na MadJam**: [https://madjam.vercel.app](https://madjam.vercel.app)

## Table of Contents

- [Demo](#demo)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
  - [Design Decisions](#design-decisions)
  - [Scalable Implementation](#scalable-implementation)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
- [Tech Stack](#tech-stack)
- [Game Mechanics](#game-mechanics)
- [Controls](#controls)
- [Design System](#design-system)
- [Testing](#testing)
- [Continuous Integration](#continuous-integration)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [License](#license)

## Demo

Acesse o jogo online:  
🌐 **[https://deal-polvos-vs-ratos.vercel.app](https://deal-polvos-vs-ratos.vercel.app)**

## Project Structure

```
src/
├── components/         # Componentes reutilizáveis organizados por contexto
│   ├── CharacterSelection/  # Seleção de personagens
│   ├── Game/               # Componentes do jogo principal
│   ├── FloatingThemeButton/ # Alternador de tema
│   ├── Footer/             # Rodapé com controles
│   └── Intro/              # Tela inicial
├── contexts/          # Contextos para estado global
│   ├── GameContext.jsx     # Estado do tabuleiro e lógica do jogo
│   ├── PlayerContext.jsx   # Gerenciamento de jogadores e pontuação
│   ├── DialogueContext.jsx # Sistema de diálogos
│   └── ThemeContext.jsx    # Alternância de temas
├── hooks/             # Hooks customizados reutilizáveis
│   ├── useGameState.js     # Orquestração principal do jogo
│   ├── useTimer.js         # Temporizador com controles
│   ├── useShortcut.js      # Sistema de atalhos de teclado
│   └── *Operations.js      # Operações por tela
├── models/            # Entidades do domínio
│   └── Player.js           # Classe Player imutável
├── pages/             # Páginas principais da aplicação
├── routes/            # Sistema de roteamento
└── styles/            # Design system e variáveis CSS
    └── variables.scss      # 95+ tokens de design centralizados
```

## Features

- 🎮 **Tabuleiro Expansível**: Progressão 3x3 → 5x5 → 7x7 → 9x9 quando há empate
- ⏱️ **Timer de 5 segundos** por jogada com preenchimento automático
- 🎭 **Sistema de Personagens**: Ratos (roxo) vs Polvos (vermelho) com diálogos reativos
- 🏆 **Primeiro a 11 vitórias** vence o confronto
- 🎨 **Menu flutuante** com alternância de tema e personalização de cores dos personagens
- ⌨️ **Controles completos por teclado** com sistema de atalhos escalável
- 📱 **Totalmente responsivo** para desktop, tablet e mobile
- 🎨 **Design System robusto** com 95+ variáveis CSS organizadas
- 💬 **Sistema de diálogos** estilo visual novel com personagens reativos

## Technical Architecture

### Design Decisions

#### **🎯 Classe Player Imutável**

Optei por implementar os jogadores através de uma **classe Player** seguindo princípios de **gamedev**, onde entidades do jogo são representadas como objetos com métodos especializados. Porém, mantendo **imutabilidade total**:

```javascript
// Todas as operações retornam novas instâncias
const updatedPlayer = player.updateScore(1);
const renamedPlayer = player.setCharacter("rat");
```

Esta abordagem integra perfeitamente com a **programação funcional do React** pois:

- **Imutabilidade**: Compatível com useState e useEffect
- **Previsibilidade**: State updates sempre criam novas referências
- **Debugging**: Histórico de estados preservado
- **Performance**: React pode otimizar re-renders através de referência

#### **⚡ Hooks Escaláveis**

A arquitetura de hooks foi projetada para **máxima escalabilidade**:

**useShortcut**: Sistema modular de atalhos de teclado

```javascript
// Facilmente extensível para novos comandos
useShortcut("P", togglePause, gameContext.isGameActive);
useShortcut("R", restartGame, true);
```

**Context Integration**: Separação clara de responsabilidades

- `GameContext`: Estado do tabuleiro e lógica de vitória
- `PlayerContext`: Gerenciamento de jogadores e pontuação
- `DialogueContext`: Sistema de diálogos assíncrono

**useTimer**: Hook reutilizável com controles completos

```javascript
const timer = useTimer({
  duration: 5,
  onTimeout: handlePlayerTimeout,
  autoStart: false,
});
```

### Scalable Implementation

Esta arquitetura permite **fácil extensão** para features futuras:

- **Multiplayer**: Contexts já isolam estado local vs remoto
- **Diferentes modos**: Hooks parametrizáveis para variações
- **Novos controles**: Sistema de shortcuts extensível
- **Temas customizados**: Design tokens centralizados

## Getting Started

### Installation

```bash
git clone https://github.com/guiduck/deal.git
cd deal
npm install
```

### Development

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

Acesse: [http://localhost:5173](http://localhost:5173)

## Tech Stack

- **Framework**: [React 19](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (sem TypeScript por requisito)
- **Styling**: [SCSS Modules](https://sass-lang.com/) com design system customizado
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)
- **Architecture**: Hooks customizados + Classes imutáveis
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)
- **Deployment**: [Vercel](https://vercel.com/)

## Game Mechanics

### História

Após conquistarem os oceanos, os polvos liberaram um vírus que extinguiu a humanidade. Os ratos evoluíram com inteligência superior. Agora essas duas espécies lutam pelo controle do planeta.

### Mecânicas de Jogo

- **Vitória**: Primeiro a alcançar **11 vitórias**
- **Timer**: 5 segundos por jogada com preenchimento automático
- **Empate**: Tabuleiro expande automaticamente (3x3 → 5x5 → 7x7 → 9x9)
- **Personagens**: Cada espécie tem diálogos únicos e esquemas de cores

## Controls

| Tecla          | Ação                   |
| -------------- | ---------------------- |
| `↑↓←→`         | Navegar pelo tabuleiro |
| `Enter/Espaço` | Fazer jogada           |
| `P`            | Pausar/Continuar       |
| `R`            | Reiniciar              |
| `H`            | Instruções             |
| `Esc`          | Voltar                 |

## Design System

Sistema robusto com **95+ variáveis CSS** organizadas por categorias:

- **Cores temáticas**: Ratos (roxos #b87dc7) e Polvos (vermelhos #e85b9a)
- **Paleta completa**: primárias, secundárias, neutras, estados
- **Tipografia**: System fonts com escalas responsivas
- **Spacing & Layout**: grid system consistente
- **SCSS Modules**: componentização e escopo isolado
- **Tokens centralizados**: `src/styles/variables.scss`

```scss
// Exemplo de tokens
--rat-primary: #b87dc7;
--octopus-primary: #e85b9a;
--spacing-md: 1rem;
--transition-normal: 0.3s ease-in-out;
```

## Testing

```bash
# Executar testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Coverage report
npm run test:coverage
```

## Continuous Integration

Pipeline automatizado com **GitHub Actions** (`.github/workflows/ci.yml`):

- ✅ Instalação de dependências
- ✅ Linting e formatação
- ✅ Build do projeto
- ✅ Testes automatizados
- ✅ Deploy automático para Vercel

## Features Completas

O projeto implementa todas as funcionalidades planejadas para uma experiência de jogo completa:

### 🎮 Funcionalidades Principais

- ✅ **JavaScript puro** - Desenvolvimento sem TypeScript para simplicidade
- ✅ **Hooks customizados** - `useGameState`, `useTimer`, `useShortcut` e outros
- ✅ **Arquitetura limpa** - Tipagem correta e organização modular
- ✅ **Zero dependências externas** - Apenas React + SCSS para máxima performance
- ✅ **Menu flutuante completo** - Alternância de tema + personalização de cores
- ✅ **Sistema de timer** - 5 segundos por jogada com feedback visual
- ✅ **Pontuação balanceada** - 11 vitórias para conquista definitiva
- ✅ **Documentação técnica** - Arquitetura e decisões explicadas
- ✅ **Código aberto** - Repositório público para colaboração

### 🚀 Status do Projeto

**✅ COMPLETO** - Todas as funcionalidades foram implementadas com sucesso:

- **Sistema de vitória**: 11 conquistas para supremacia total
- **Personalização completa**: Menu flutuante com controle visual avançado
- **Experiência polida**: Gameplay equilibrado e interface responsiva

## Future Improvements

### Roadmap Próximo 🚀

- **WebSockets**: Implementação de multiplayer em tempo real
- **Salas privadas**: Jogos com amigos via código de sala
- **Ranking online**: Sistema de pontuação global
- ~~**Menu de cores**: Sistema completo de personalização visual~~ ✅ **IMPLEMENTADO**
- ~~**11 vitórias**: Balanceamento final do jogo~~ ✅ **IMPLEMENTADO**

### Melhorias Técnicas

- **PWA**: Service workers para jogo offline
- **Animações**: Micro-interações com CSS animations
- **Acessibilidade**: Screen reader e navegação completa por teclado
- **i18n**: Internacionalização multi-idioma

## License

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Pronto para jogar! Que vença o melhor na batalha épica Polvos vs Ratos!** 🎮🐙⚔️🐭
