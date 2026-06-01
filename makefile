#

api-init:
	cd api && source $(HOME)/.nvm/nvm.sh && nvm use && npm install

frontend-init:
	cd frontend && source $(HOME)/.nvm/nvm.sh && nvm use && npm install

api-run-dev:
	npm run dev --prefix api

frontend-run-dev:
	npm run dev --prefix frontend

api-test:
	npm run test --prefix api

frontend-test:
	npm run test --prefix frontend

test:
	make api-test
	make frontend-test

run:
	docker compose -f docker-compose.dev.yaml up

down:
	docker compose -f docker-compose.dev.yaml down --rmi all