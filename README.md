# Dynamic E-commerce Product UI (Angular)

## 🎯 Objective

Built a frontend-heavy **E-commerce Product UI** using Angular that allows users to browse, filter, search, and interact with products in a modern, responsive interface.

The primary focus is:

* Clean and scalable UI architecture
* Component-driven design
* Reactive UI updates
* Minimal backend (mock JSON / static data)

---

## 🛠️ Tech Stack

* Angular (latest version)
* TypeScript
* HTML5 + SCSS
* Angular Material (UI components)
* RxJS (reactive programming)
* Data Source: Static JSON / Mock API

---

## 📁 Project Structure

Create the following structure:
```
src/
├── app/
│    ├── components/
│    │    ├── navbar/
│    │    ├── product-list/
│    │    ├── product-card/
│    │    ├── product-detail/
│    │    ├── filter-panel/
│    │    ├── cart-sidebar/
│    │
│    ├── services/
│    │    ├── product.service.ts
│    │    ├── cart.service.ts
│    │
│    ├── models/
│    │    ├── product.model.ts
│    │
│    ├── pages/
│    │    ├── home/
│    │    ├── product/
│    │
│    ├── app-routing.module.ts
│    ├── app.component.ts
```
---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
