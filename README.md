# Camara Focus

Camara Focus is an **internal tools platform** developed for Camara TBWA.  
It is initially designed for internal team usage and intentionally built to evolve into a **full SaaS product** in the future.

The platform brings together QR generation and management, barcode tools, writing utilities, asset libraries (emojis, media), and supporting features focused on real-world workflows.

---

## 🧠 Project Vision

This project has three clear goals:

### 1. Present
- Centralize internal tools in a single platform.
- Improve productivity, visual consistency, and user experience.
- Act as a functional extension of the company’s main website.

### 2. Mid-term
- Private platform with authentication and role management.
- A consistent and scalable Design System.
- Clean, maintainable architecture.

### 3. Future
- Evolve into a SaaS product.
- Dynamic theming (white-label / company-level customization).
- Technical and design scalability.

---

## 🧱 Tech Stack (in migration)

The project is currently undergoing a **structured refactor** toward the following stack:

- **Next.js** (App Router)
- **TypeScript** (incremental adoption)
- **shadcn/ui + Radix**
- **Tailwind CSS**
- **Firebase** (Auth, Firestore, Storage)
- A **custom Design System**, built around tokens and theming

> The migration is performed incrementally, prioritizing stability and reuse of existing, proven logic.

---

## 🎨 Design System

A core pillar of this project is the development of a **complete Design System**, with the following principles:

- Base components generated with `shadcn/ui`, adapted to the brand identity.
- Design tokens for:
  - colors
  - typography
  - spacing
  - border radius
  - component states
- Exclusive use of relative units (`rem`, `em`).
- Native **dark mode** support.
- Prepared for **dynamic theming** (brand switching without modifying components).

The Camara TBWA brand color is used as the **default theme**, but the system itself is brand-agnostic.

---

## 🧭 Architecture

The project follows an architecture designed for:

- clear separation of concerns
- scalability
- long-term maintainability

Key principles:
- UI components decoupled from business logic.
- Feature-based organization.
- Centralized services and data fetching.
- Reusable structural layouts.
- Routing and view composition handled by Next.js.

---

## 🚧 Current Status

- Fully functional legacy version built with Vite + React.
- Active migration to Next.js.
- Design System, layout foundation, and project structure in progress.
- Progressive refactor of components and logic.

---

## 📌 Notes

This repository is not a demo or a proof of concept.  
It is a **product foundation**, intentionally built to grow, scale, and evolve.

Technical decisions prioritize:
- clarity
- structure
- consistency
- long-term vision

---

## ✍️ Author

Developed by Facu  
Camara TBWA

