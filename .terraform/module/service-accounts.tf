#
# CI/CD
#
resource "google_service_account" "graph-docs-ci-cd" {
  account_id    = "graph-docs-ci-cd"
  description   = "For building containers and updating k8s resources in CI/CD"
}

# role for interacting with k8s cluster
resource "google_project_iam_member" "graph-docs-ci-cd-container-developer" {
  project       = var.project
  role          = "roles/container.developer"
  member        = "serviceAccount:${google_service_account.graph-docs-ci-cd.email}"
}

# Key to be put in github repo secrets
resource "google_service_account_key" "graph-docs-ci-cd" {
  service_account_id = google_service_account.graph-docs-ci-cd.name
}
