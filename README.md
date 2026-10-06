# Inventory Management Frontend

An Angular frontend for a full-stack inventory management application.

The application connects to a Spring Boot REST API and allows users to manage products, track inventory, and create orders through a web interface.

## Features

- View all products and current inventory
- Add new products
- Edit existing products
- Delete products
- Create orders
- Automatically refresh inventory after an order
- Display success messages after successful orders
- Display an error when an order exceeds available inventory
- Communicate with a Spring Boot REST API using Angular HttpClient

## Tech Stack

- Angular 22
- TypeScript
- HTML
- CSS
- Angular Forms
- Angular HttpClient
- Angular Signals

## Backend

This frontend connects to a Spring Boot and PostgreSQL backend.

Backend repository:

https://github.com/AliRasouli2000/inventory-api

The backend provides REST endpoints for product management and order processing.

## Running the Application

### Prerequisites

Install:

- Node.js
- npm
- Angular CLI

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

The Spring Boot backend should also be running locally on:

```text
http://localhost:8080
```

## Main Functionality

### Product Management

Users can:

- Create products
- View inventory
- Edit product information
- Delete products

Product information includes:

- Name
- Description
- Price
- Quantity

### Order Management

Users can select a product and quantity to create an order.

When an order succeeds, the frontend refreshes the product data so the updated inventory is immediately displayed.

If the requested quantity exceeds available inventory, the application displays an error message instead of completing the order.

## API Integration

The frontend communicates with the backend using Angular's `HttpClient`.

The product API is available at:

```text
http://localhost:8080/api/products
```

The order API is available at:

```text
http://localhost:8080/api/orders
```

## Build

To create a production build:

```bash
ng build
```

Build files are generated in the `dist/` directory.

## What I Learned

This project provided hands-on experience with:

- Building a frontend with Angular and TypeScript
- Connecting Angular to a REST API
- Performing CRUD operations from a frontend
- Using Angular forms and two-way data binding
- Managing application state with Angular Signals
- Handling HTTP success and error responses
- Integrating an Angular frontend with a Spring Boot backend
- Building a complete frontend-to-database workflow

## Author

**Ali Rasouli**