#!/bin/sh
set -e  # immediately fail the script on any command error

ENVIRONMENT="$1"
IMAGE="$2"
DIR=$(dirname "$0")
cd $DIR/../../.k8s/$ENVIRONMENT

kustomize edit set image $IMAGE
kustomize build | kubectl apply -f -
