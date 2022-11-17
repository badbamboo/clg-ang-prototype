NPM_REGISTRY	:= https://registry.npmjs.org/
################################################################
# CMDS: APP
################################################################
app-build:
	@npm run build

app-bump:
	@bump

app-init:
	@npm config set registry $(NPM_REGISTRY)
	@npm config get registry
	@npm cache clean --force
	@npm install --save --legacy-peer-deps
	@npm i --save lodash --legacy-peer-deps

app-serve:
	@npm start

app-test:
	npm run test
