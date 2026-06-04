# Toolbox Code Challenge

Full-stack app that fetches CSV files from an external API, parses them, and exposes the data through a Node/Express backend and a React frontend.

# Install dependencies
```bash
make api-init
make frontend-init
```

# Run (two terminals)
```bash
make api-run-dev      # http://localhost:3002 (or PORT from api/.env)
make frontend-run-dev # http://localhost:3000
```


## Getting started
### Option A — Docker (recommended for dev)
```bash
# From repo root
make run

# or

docker compose -f docker-compose.dev.yaml up --build

```

### Option B — Production (API + Nginx frontend)

Nginx serves the React build and proxies `/api/*` to the API container (same origin, no CORS).

```bash
# From repo root; set SUPER_SECRET_KEY in api/.env or shell
make run-prod

# App: http://localhost
```