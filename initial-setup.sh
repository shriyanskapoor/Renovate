#!/bin/bash

# usage
# ./scripts/initial-setup.sh -n the-name-of-my-frontend-service-url-friendly -t my-team-name

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)/"
REPO_ROOT="$(dirname ${DIR})"
PORT=7579
EXAMPLE_USAGE="Example usage: ./initial-setup.sh -n the-name-of-my-frontend-service-url-friendly -t my-team-name -p 8080"
THIS_REPO_COMMIT_SHA=$(git log --pretty=format:'%H' -n 1)
TEMPLATE_REPO_COMMIT_SHA=$(git ls-remote https://github.com/junipersquare/soa-frontend-service-template.git | head -1 | sed "s/HEAD//")

# Enforce that the script is only run against new repos with no changes within the repo.
if [ $THIS_REPO_COMMIT_SHA != $TEMPLATE_REPO_COMMIT_SHA ];then
	echo "ERROR: This script can only work if your repo is unchanged from the junipersquare/soa-frontend-service-template repo."
	exit 1
fi
if [[ ! -z $(git status -s) ]]; then
	echo "ERROR: This script cannot make changes while there are uncommitted changes."
	exit 1
fi

# Read input
while getopts n:t:p: flag; do
	case "${flag}" in
	n) FRONTEND_SERVICE_NAME=${OPTARG} ;;
	t) TEAM_NAME=${OPTARG} ;;
	p) PORT=${OPTARG} ;;
	*) 
		echo "ERROR: Invalid flag(s) passed! -n and -t are required. (-p is optional)"
		echo "${EXAMPLE_USAGE}"
		exit 1
	esac
done

ERROR=0
BAD_INPUT=0
if [[ -z $FRONTEND_SERVICE_NAME ]] || [[ ! $FRONTEND_SERVICE_NAME =~ ^[a-z|0-9|-]+$ ]]; then
	echo "ERROR: Invalid -n flag! Must include the (url friendly) name of your frontend service"
	BAD_INPUT=1
fi
if [[ -z $TEAM_NAME ]]; then
	echo "ERROR: Invalid -t flag! Must include the name of your team (eg: tbd)"
	BAD_INPUT=1
fi
case $PORT in
	''|*[!0-9]*)
		echo "ERROR: Invalid -p flag! The port number must be a number"
		BAD_INPUT=1
		;;
	*) ;;
esac

if [ BAD_INPUT == 1 ]; then
	echo "${EXAMPLE_USAGE}"
	exit 1
fi


MISSING_DEPENDENCIES=0
# Check dependencies
if [ ! "$(which npm)" != "" ]; then
	echo "ERROR: Must have node + npm installed. Use nvm or visit https://nodejs.org/ to install."
	exit 1
fi
if [[ $(command -v brew) == "" ]]; then
	echo "ERROR: Must have homebrew installed and added ot your PATH. Visit https://brew.sh/ to install."
fi

if [ MISSING_DEPENDENCIES == 1 ]; then
	exit 1
fi

# Setup yarn
corepack enable

# Install dependencies
yarn install

if [[ $(which mkcert) == "" ]]; then
	brew install mkcert
fi
if brew ls --versions nss > /dev/null; then
	:
else
	brew install nss
fi

# Set up certificates
DEV_SITE_URL="${FRONTEND_SERVICE_NAME}.dev.junipersquare.us"
mkcert -install "$DEV_SITE_URL"
CERT_FILENAME="$DEV_SITE_URL.pem"
KEY_FILENAME="$DEV_SITE_URL-key.pem"
cp "$CERT_FILENAME" "${REPO_ROOT}/certs/${CERT_FILENAME}"
cp "$KEY_FILENAME" "${REPO_ROOT}/certs/${KEY_FILENAME}"
rm "$CERT_FILENAME" "$KEY_FILENAME"

# Add entry to /etc/hosts
if grep -q "${DEV_SITE_URL}" /etc/hosts; then
	:
else
	sudo -- sh -c "echo '127.0.0.1 ${DEV_SITE_URL}' >> /etc/hosts"
fi

# Replace all instances of FRONTEND_SERVICE_NAME
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/package.json"
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/webpack.dev.js"
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/.github/workflows/preview-deploy.yaml"
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/.github/workflows/on-release.yaml"
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/infra/values-preview.yaml"
sed -i '' "s/FRONTEND_SERVICE_NAME/${FRONTEND_SERVICE_NAME}/g" "${REPO_ROOT}/infra/values-test.yaml"

# Replace all instances of TEAM_NAME
sed -i '' "s/TEAM_NAME/${TEAM_NAME}/g" "${REPO_ROOT}/infra/values-preview.yaml"
sed -i '' "s/TEAM_NAME/${TEAM_NAME}/g" "${REPO_ROOT}/infra/values-test.yaml"

# Replace all instances of the port number
if ! [[ $PORT -eq 7579 ]]; then
	sed -i '' "s/7579/${PORT}/g" "${REPO_ROOT}/package.json"
	sed -i '' "s/7579/${PORT}/g" "${REPO_ROOT}/README.md"
	sed -i '' "s/7579/${PORT}/g" "${REPO_ROOT}/webpack.dev.js"
fi

# If the .env file doesn't exist, create it based on the .env.example
if [ ! -f ./.env ]; then
  cp .env.example .env
fi

# After changing the name of everything, we need to do another install to update the lockfile
yarn install

# Destroy this script as a final step
rm ./initial-setup.sh

echo "Done with setup! The rest of the setup steps are in the README.md. Your local dev url will be https://${DEV_SITE_URL}:${PORT}."
echo "To revert these changes, simply destroy/stash the repo and remove the line with ${DEV_SITE_URL} from your /etc/hosts file."
