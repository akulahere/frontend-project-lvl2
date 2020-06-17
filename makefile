install:
	npm install
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage