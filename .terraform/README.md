# Graph Docs Terraform configs

## Setup

Initialize terraform and apply:

```
terraform init
terraform apply
```

Get service account JSON keys and add as github repo secrets:

1. `GCP_SA_KEY_STAGING`

```
terraform show -json | jq -r '.values.root_module.child_modules[] | select(.address=="module.staging") | .resources[] | select(.address=="module.staging.google_service_account_key.graph-docs-ci-cd") | .values.private_key' | base64 -d
```

2. `GCP_SA_KEY_PRODUCTION`

```
terraform show -json | jq -r '.values.root_module.child_modules[] | select(.address=="module.production") | .resources[] | select(.address=="module.production.google_service_account_key.graph-docs-ci-cd") | .values.private_key' | base64 -d
```
