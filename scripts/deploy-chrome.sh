#!/bin/bash

# Validation (require json_pp)
#cat manifest.json|json_pp
#if [[ $? ]]; then
#    echo "syntax error manifest.json"
#    exit 128
#fi

tag=$(git describe --exact-match --tags HEAD)
echo "tag : $tag"

publish=true
if [ -z "$tag" ]; then
    echo "missing version number. set version to 0.0.0.0";
	tag=0.0.0.0
	publish=false
fi

version=$tag

cp manifest-chrome.json manifest.json
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

# {{{ chrome specific
FILE_NAME=build/decodex_insoumis-chrome-${version}.zip

zip -r ${FILE_NAME} ./* \
    --exclude \*script* manifest-chrome.json manifest-firefox.json \*build/* \*web-ext-artifacts/*
# }}} chrome specific

if [[ "$1" != '--publish' ]];then
	echo "option --publish missing"
	exit 0
fi

if [[ !$publish ]];then
	echo "invalid version ($version) to publish."
	exit 0
fi


echo "envoie de l'extension chrome à googleapis.com/upload/chromewebstore …"

# {{{ chrome specific
token=$(curl "https://accounts.google.com/o/oauth2/token" -d "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&code=$CODE&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob")
token=$(echo "$token"|grep access|awk '{print $3}'|awk -F\" '{print $2}')

curl \
    -H "Authorization: Bearer $token"  \
    -H "x-goog-api-version: 2" \
    -X PUT \
    -T $FILE_NAME \
    -v \
    https://www.googleapis.com/upload/chromewebstore/v1.1/items/$APP_ID

# }}} chrome specific

error=$?
if [[ $error -ne 0 ]]; then
	echo "une erreur est survenue (error: $error)"
	if [[ $error -eq 1 ]]; then
		exit 0
	fi
	exit $error
else
    echo "une nouvelle version de l'extension a été envoyée."
    exit 0;
fi

