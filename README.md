# PoE2 Comparator

Projet reorganise en **workspace Rust + Tauri** pour separer clairement le domaine metier de l'application desktop.

## Architecture

- `crates/poe2_comparator_core`
  - Logique metier reutilisable (modeles, client API, calcul DPS, comparaison)
  - Testable independamment de l'UI
- `src-tauri`
  - Application desktop Tauri
  - Expose des commandes (`healthcheck`, `compare_payloads`) qui appellent le crate core
- `frontend`
  - Interface SvelteKit (Vite), separee du backend Rust

## Pourquoi cette structure

- Separation des responsabilites (UI desktop vs metier)
- Reutilisation facile du moteur (`poe2_comparator_core`) dans d'autres interfaces (CLI, API, worker)
- Tests focalises sur le domaine sans dependance Tauri

## Commandes utiles

Depuis la racine du repo:

```bash
cargo test --workspace
```

Pour lancer les tests backend:

```bash
cargo test --workspace
```

Pour lancer le frontend:

```bash
cd frontend
npm install
npm run dev
```

Pour lancer Tauri (desktop):

```bash
cargo run -p poe2_comparator_tauri
```

> Note: `src-tauri/tauri.conf.json` est aligne sur le frontend `frontend/` (dev: `http://localhost:1420`, build: `frontend/build`).