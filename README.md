# af_admin
Agent factory administration client
# Getting Started
## Prerequisites
```sh
# Install nvm for Linux / WSL:
# The installation script version at the time of this writting is v0.39.2.
# For the most up to date instructions on how to install nvm on your system
# refer to their website: https://github.com/nvm-sh/nvm#install--update-script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

# Restart your terminal or do: 
cd $HOME && source ./.bashrc && source ./.profile
# Verify installed nvm
command -v nvm

# Install node
nvm install node
# Verify installed node version
node --version

# Npm
nvm install --latest-npm
# Verify installed npm version
npm --version

# Vite
# Vite is a module bundler and build system just like webpack, parcel or esbuild
npm install --global vite@latest
    
```
## Installation

```sh
    git clone git@github.com:pnoulis/af_admin.git
    cd af_admin
    npm install
    npm run dev
```
