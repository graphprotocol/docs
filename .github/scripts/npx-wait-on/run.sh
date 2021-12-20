#!/bin/sh
set -e  # immediately fail the script on any command error

DIR=$(dirname "$0")
TIMEOUT_MS=10000

npx wait-on \
  --verbose \
  --config $DIR/config.js \
  --timeout=$TIMEOUT_MS \
  "$@"
