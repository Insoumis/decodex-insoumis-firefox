#!/bin/bash

# Validation (require json_pp)
#cat manifest.json|json_pp
#if [[ $? ]]; then
#    echo "syntax error manifest.json"
#    exit 128
#fi

cp manifest-firefox.json manifest.json

if [ -z "$1" ]; then
    echo "missing version number";
    exit 0;
fi


version=$1
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
    echo "version($version) and tag ($tag) does not match. Do not deploy";
    exit 0;
fi
echo "version in manifest matches : $version"

web-ext lint --ignore-files=scripts manifest-firefox.json manifest-chrome.json

web-ext build --ignore-files=scripts manifest-firefox.json manifest-chrome.json

echo "STTOOOOP"
web-ext sign --ignore-files=scripts manifest-firefox.json manifest-chrome.json \
    --api-key ${API_KEY} --api-secret ${API_SECRET}
exit;


