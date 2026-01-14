# SIT Madrid CMS

This repository contains the code used to generate and manage the content for the SIT Madrid website.

## Installation

To set up the development environment, you need to have the following tools installed:
- Deno: 
  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  ```
- Lume: Follow the installation instructions at <https://lume.land/docs/overview/installation/>

## Running locally

Command to run the website locally:
```bash

## Serving the website
deno task lume -s

## Building the website
deno task lume
```

## Deployment
To deploy the website, use the following command:
```bash
./push-output-repo.sh
```
