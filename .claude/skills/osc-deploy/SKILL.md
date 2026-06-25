---
name: osc-deploy
description: Deployment runbook for shipping the guide to Eyevinn Open Source Cloud (OSC) My Apps Node.js runner — the build/run contract, PORT/env rules, and exact MCP tool sequence. Use when deploying or debugging an OSC deployment.
---

# OSC My Apps deployment (Node.js runner)

OSC "My Apps" is a Heroku-style PaaS. The Node.js runner clones a **Git repo** and runs `npm install` → `npm run build` → `npm start`. The OSC MCP tools are deferred — load via ToolSearch first.

## Build/run contract (non-negotiable)
- Source: a **Git repo over HTTPS**; pick a branch with `#branch` (e.g. `https://github.com/me/repo#main`).
- Build: `npm run build` (fixed). Start: `npm start` (fixed).
- The app **must listen on `process.env.PORT`** (default **8080**). For Next.js: `"start": "next start -p $PORT"`. Never hardcode a port.
- One deployable app per repo; build runs from repo root. Commit `package-lock.json`.
- App name: **alphanumeric only** (no hyphens/underscores).
- Each app gets a **stable HTTPS URL** that survives rebuilds.

## Env vars
- Auto-injected by OSC, do NOT set: `APP_URL`, `AUTH_URL`, `PORT`.
- `NEXT_PUBLIC_*` are baked at build time → put them in a committed **`.env.production`**, NOT the parameter store.
- Server-only secrets → parameter store: `setup-parameter-store` (capture one-time `CONFIG_API_KEY`) → `set-parameter … secret:true` → bind via `create-my-app` `configService` + `configApiKey`.

## Deploy sequence (MCP tools)
Load: `ToolSearch "select:mcp__claude_ai_OSC__create-my-app,mcp__claude_ai_OSC__wait-for-app-ready,mcp__claude_ai_OSC__get-my-app,mcp__claude_ai_OSC__get-my-app-logs,mcp__claude_ai_OSC__setup-parameter-store,mcp__claude_ai_OSC__set-parameter,mcp__claude_ai_OSC__wait-for-parameter-store,mcp__claude_ai_OSC__start-git-credential-registration,mcp__claude_ai_OSC__restart-my-app,mcp__claude_ai_OSC__diagnose-my-app"`

1. (If secrets needed) `setup-parameter-store {name, enableSecrets:true}` → capture `CONFIG_API_KEY`; `wait-for-parameter-store` until ready; `set-parameter` per secret.
2. (Private repo only) `start-git-credential-registration {name}` → complete PAT entry in the returned browser URL (token never enters chat).
3. `create-my-app {name, type:"nodejs", gitUrl:"https://github.com/<owner>/<repo>#<branch>", configService?, configApiKey?, gitCredential?}`.
4. `wait-for-app-ready {appId}` until `ready:true` (or `buildStatus:"failed"`).
5. `get-my-app {appId}` → the live URL. On failure: `get-my-app-logs` / `diagnose-my-app`.

## Redeploy
- Code-only change: `restart-my-app {appId}` (~2 min, reuses cache).
- Dependency change: `restart-my-app {appId, rebuild:true}` (~5 min).

## Gotchas
- Monorepo `subPath` + parameter store silently drops env vars (known bug). Prefer a single-app repo.
- Confirm with the user before any create/deploy/restart — deployment is outward-facing.
