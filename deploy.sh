# deploy.sh

#!/usr/bin/env sh

# abort on errors
set -e

# lint
echo Start linting...
yarn run lint
echo Finish linting!!!

# build
echo Start building...
yarn run build
echo Finish building!!!

# navigate into the build output directory
cd dist

# deploy
echo Start deploying...
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Mandred19/crm-test.git master:gh-pages

cd -

echo Finish deploying!!!
