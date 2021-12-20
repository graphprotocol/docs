
variable project {
}
variable zone {
  default = "us-central1-a"
}

provider "google" {
  project     = var.project
  zone        = var.zone
}
