#!/bin/bash

yarn build
cat > .npmrc <<-EOF
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
registry=https://registry.npmjs.org/
home=https://www.npmjs.org
EOF
npm publish