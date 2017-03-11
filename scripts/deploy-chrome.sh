#!/bin/bash

# TODO:
# * functions to define more options:
# --stash-first (stash before deploy, test mode mode only)
# --skip-delete (do not delete files in scripts/)
# * create only one deploy file to make the both jobs

# Validation (require json_pp)
#cat manifest.json|json_pp
#if [[ $? ]]; then
#    echo "syntax error manifest.json"
#    exit 128
#fi

release_path=build/
file_prefix=decodex_insoumis
platform_name=$(basename $0|sed "s/deploy-\(.*\).sh/\1/");
if [[ "$platform_name" == "chrome" ]];then
    extension='zip'
else
    extension='xpi'
fi


deleteFiles=false

tag=$(git describe --exact-match --tags HEAD)
filesToRemove="manifest-firefox.json manifest-chrome.json scripts/deploy-firefox.sh scripts/deploy-chrome.sh"
echo "tag : $tag"

gitstatus=$(git status -s)
if [ -n "$gitstatus" ]; then
    git status
    if [[ $deleteFiles == true ]]; then
        echo "Aborting (repo not clean, some files may be deleted)…"
        exit 1;
    fi
fi

publish=true
if [ -z "$tag" ]; then
    echo "missing version number. set version to 0.0.0.0";
	tag=0.0.0.0
	publish=false
fi

version=$tag

filename_release_path=build/${file_prefix}-${platform_name}-${tag}.${extension}

cp manifest-${platform_name}.json manifest.json

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

version=$(cat manifest.json|grep $tag|awk -F\" '{print $4}');
if [[ -z "$version" ]]; then
    echo "version missing in manifest.json. Deploy aborted."
    exit 0;
fi

if [[ "$version" != "$tag" ]]; then
    echo "Mismatch version: manifest=${version}, tag=${tag}. Do not deploy";
    exit 0;
fi
echo "version in manifest matches tag : ${tag}. Deploy can happens."

if [[ ! -d build ]]; then
    mkdir build
fi

# {{{ platform specific -- prepare to publish
# todo: lint

zip -r ${filename_release_path} ./* \
    --exclude \*script* manifest-chrome.json manifest-firefox.json \*build/* \*web-ext-artifacts/*

# mv

if [[ $deleteFiles == true ]]; then
    echo "DO NOT DELETE"
    exit 2
    if [[ -n "$filesToRemove" ]]; then
        rm ${filesToRemove}
    fi
else
    echo "/!\ The following files may be part of the package $filesToRemove"
fi
# }}} platform specific

if [[ "$1" != '--publish' ]];then
	echo "option --publish missing."
	exit 0
fi

if [[ $publish == false ]];then
	echo "--publish option found but no tag found."
	exit 0
fi

echo "publication de l'extension sur $platform_name"

# {{{ platform specific
# see https://github.com/pastak/chrome-webstore-manager
webstore_token=$(chrome-webstore-manager refresh_token --client_id $GOOGLE_CLIENT_ID --client_secret $GOOGLE_CLIENT_SECRET --refresh_token $GOOGLE_REFRESH_TOKEN)
webstore upload --source $filename_release_path --extension-id $GOOGLE_APP_ID \
   --client-id $GOOGLE_CLIENT_ID --client-secret $GOOGLE_CLIENT_SECRET \
   --refresh-token $webstore_token --autopublish

# }}} platform specific

error=$?
if [[ $error -ne 0 ]]; then
	echo "une erreur est survenue (error: $error)"
	if [[ $error -eq 1 ]]; then
		exit 0
	fi
	exit $error
else
    echo "une nouvelle version de l'extension a été envoyée."
fi

if [[ $deleteFiles == true ]]; then
    git checkout .
fi
