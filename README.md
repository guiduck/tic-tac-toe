# 🎮 Polvos vs Ratos

Jogo da velha épico onde ratos inteligentes e polvos dominadores batalham pela supremacia mundial.

## 🚀 Começar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## 🎯 O Jogo

### História

Após conquistarem os oceanos, os polvos liberaram um vírus que extinguiu a humanidade. Os ratos evoluíram com inteligência superior. Agora essas duas espécies lutam pelo controle do planeta.

### Mecânicas

- **Tabuleiro Expansível**: 3x3 → 5x5 → 7x7 → 9x9 quando há empate
- **Timer de 5 segundos** por jogada
- **Sistema de diálogos** com personagens reativos
- **Primeiro a 5 vitórias** vence o confronto
- **Menu flutuante** para alternar entre tema claro e escuro
- **Controles por teclado** completos

### Controles

- `↑↓←→` - Navegar pelo tabuleiro
- `Enter/Espaço` - Fazer jogada
- `P` - Pausar/Continuar
- `R` - Reiniciar
- `H` - Instruções
- `Esc` - Voltar

## 🛠️ Tecnologias

- **React 19** + **Vite** + **SCSS Modules**
- **Context API** para estado global
- **Hooks customizados** para lógica reutilizável
- **JavaScript** (sem TypeScript por escolha do projeto)

## 📁 Estrutura

```
src/
├── components/     # Componentes reutilizáveis organizados por tela
├── contexts/       # GameContext, PlayerContext, DialogueContext
├── hooks/          # useGameState, useTimer, operações por tela
├── models/         # Classe Player com lógica de personagens
├── pages/          # IntroScreen, CharacterSelectionScreen, GameScreen
└── styles/         # Design system com 95+ variáveis CSS
```

## 🎨 Design System

Sistema robusto com **95+ variáveis CSS** organizadas por categorias:

- **Cores temáticas**: Ratos (roxos #b87dc7) e Polvos (vermelhos #e85b9a)
- **Paleta completa**: primárias, secundárias, neutras, estados
- **Tipografia**: System fonts com escalas responsivas
- **Spacing & Layout**: grid system consistente
- **SCSS Modules** para componentização e escopo isolado
- **Tokens centralizados** em `src/styles/variables.scss`

## 📱 Responsivo

Funciona em desktop, tablet e mobile com layout adaptativo.

## 🔧 CI/CD

Pipeline automatizado com **GitHub Actions** (`ci.yml`):

- Instalação de dependências
- Build do projeto
- Deploy automático

---

**Desenvolvido em React para a batalha épica Polvos vs Ratos!** 🐙⚔️🐭
