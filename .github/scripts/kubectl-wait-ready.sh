#!/bin/sh
set -e  # immediately fail the script on any command error

# wait 5 min for the new pod to be ready. If the pod is not ready there is a problem with the new container
for APP_NAME in "$@"
do
  kubectl wait pod --for condition=Ready --timeout=300s \
    $(kubectl get pods -l app=$APP_NAME --sort-by {.metadata.creationTimestamp} -o jsonpath={.items[-1].metadata.name})
done
