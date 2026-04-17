# Bloomcard

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Bloomcard** is an interactive image gallery built entirely with vanilla TypeScript — no frameworks, no runtime dependencies. It presents a collection of full-height photo cards laid out side by side in a horizontal strip. Each card displays a background image and a title label. When the user clicks on a card, it smoothly expands to take up the majority of the available space while the remaining cards shrink down to slim vertical slivers, keeping the full gallery visible at all times.

The active card is tracked exclusively through CSS classes (`card--touched`) toggled by DOM event listeners, meaning there is no external state management layer — the DOM itself is the source of truth. Clicking a different card collapses the currently expanded one and expands the new selection in a single interaction. Only one card can be active at any given time.

The project is structured around a factory-function component pattern: `Card` produces individual card elements with their own encapsulated click handler and a `cleanup()` method for proper listener teardown, while `BloomcardPage` composes those cards into the full gallery layout and delegates lifecycle management to each child. This architecture makes the data flow explicit and keeps every piece of UI self-contained.

On the tooling side, the codebase enforces TypeScript strict mode with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`, uses ESLint with `typescript-eslint` strict rules, formats with Prettier, and is tested with Jest 30 + jsdom + Testing Library. Pre-commit hooks (Husky + lint-staged) ensure that no unformatted or unlinted code reaches the repository.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.14.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/bloomcard`](https://www.diegolibonati.com.ar/#/project/bloomcard)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
