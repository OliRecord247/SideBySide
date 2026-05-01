# Side By Side Project

This project focuses on practicing the implementation of a robust Node.js backend, specifically utilizing dependency injection and managed database interactions.

## 🛠 Tech Stack

- Runtime: Node.js (ES Modules)
- Framework: Fastify for a high-performance HTTP server
- Language: TypeScript for static typing and code quality
- Database & ORM: PostgreSQL managed via MikroORM
- Dependency Injection: Awilix (integrated via `@fastify/awilix`)
- Validation: Zod with `fastify-type-provider-zod` for type-safe schema validation
- Documentation: Swagger (`@fastify/swagger` & `@fastify/swagger-ui`) for automated API documentation

## 🚀 Getting Started

### Development
To start the application in development mode with hot-reloading:

```bash
npm run dev
```

### Build and Run

To compile the TypeScript code and start the production build:

```bash
npm run build
npm run start
```

### Testing

To run the test suite using Vitest:

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```
