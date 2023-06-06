terraform {

  required_providers {
    tfe = {
      version = "~> 0.44.0"
    }
  }
  cloud {
    organization = "edgeandnode"

    workspaces {
      name = "tf-state-graph-docs"
    }
  }
}
