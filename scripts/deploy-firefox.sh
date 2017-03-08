#!/bin/bash

# Validation (require json_pp)
#cat manifest.json|json_pp
#if [[ $? ]]; then
#    echo "syntax error manifest.json"
#    exit 128
#fi

tag=$(git describe --exact-match --tags HEAD)
echo "tag : $tag"

if [ -z "$tag" ]; then
    echo "missing version number";
    exit 0;
fi

version=$tag

cp manifest-firefox.json manifest.json
echo "deploy version $version";
sed -i "s/{VERSION}/${version}/" manifest.json

node -c background.js
if [[ $? -ne 0 ]]; then
    echo "syntax error background.js"
    exit 128
fi

node -c install.js
if [[ $? -ne 0 ]]; then
    echo "syntax error install.js"
    exit 128
fi

node -c popup.js
if [[ $? -ne 0 ]]; then
    echo "syntax error popup.js"
    exit 128
fi

node -c content.js
if [[ $? -ne 0 ]]; then
    echo "syntax error content.js"
    exit 128
fi

tag=$(git describe --exact-match --tags HEAD)

no_tag=$?
if [[ $no_tag -ne 0 ]]; then
    echo "No tag found in current HEAD. Do not deploy."
    exit 0;
fi

if [[ -z "$tag" ]]; then
    echo "invalid tag (it should contains «chrome-»). Do not deploy."
    exit 0;
fi

version=$(cat manifest.json|grep $tag|awk '{print $2}');
if [[ -z "$version" ]]; then
    echo "version in manifest and tag ($tag) does not match. Do not deploy";
    exit 0;
fi
echo "version in manifest matches : $version"

if [[ ! -d build ]]; then
    mkdir build
fi

# {{{ firefox specific
web-ext lint --ignore-files=scripts manifest-firefox.json manifest-chrome.json build

web-ext build \
	--ignore-files=scripts manifest-firefox.json manifest-chrome.json build \
	--artifacts-dir=build

mv build/decodex_insoumis-${tag}.zip build/decodex_insoumis-firefox-${tag}.xpi
# }}} firefox specific

if [[ "$1" != '--publish' ]];then
	echo "NON PAS DE PUBLISH"
	exit 0
fi


echo "envoie de l'extension firefox à addons.mozilla.org …"

# {{{ firefox specific
web-ext sign --ignore-files=scripts manifest-firefox.json manifest-chrome.json \
    --api-key ${API_KEY} --api-secret ${API_SECRET}

# }}} firefox specific

if [[ $? -ne 0 ]]; then
    echo "une erreur est survenue"
    exit 128;
else
    echo "une nouvelle version de l'extension a été envoyée."
    exit 0;
fi

