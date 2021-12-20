
# gsutil mb gs://tf-state-graph-docs
terraform {
  backend "gcs" {
    bucket  = "tf-state-graph-docs"
  }
}