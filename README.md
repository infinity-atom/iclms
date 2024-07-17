# <img src="https://raw.githubusercontent.com/infinity-atom/iclms/main/iclms-website/src/assets/logo.png" style="aspect-ratio:1/1;height:1em"> icLMS
![Commit activity](https://img.shields.io/github/commit-activity/w/infinity-atom/iclms)
![Downloads](https://img.shields.io/github/downloads/infinity-atom/iclms/total)

**ICLMS** is the Improved Canvas Learning Management System. **More information:** [iclms.infinity-atom.org](https://iclms.infinity-atom.org)

## Build
This repository is split up into 3 directories.
- `iclms-electron` contains the code that builds the Electron application that icLMS runs off
- `iclms-ui` contains the actual application
- `iclms-website` contains code for the website

`yarn` is used to build and install everything.

### Instructions
Run these commands in order:

If you haven't already, install `yarn`
```bash
npm install -g yarn
```

Clone the repository and set the current working directory to `iclms-ui`
```bash
git clone https://github.com/infinity-atom/iclms.git
cd iclms/iclms-ui
```

Install dependencies and build
```bash
yarn install
yarn build
```

Copy output to electron `serve`
```bash
cd ..
cp -r iclms-ui/dist/* iclms-electron/serve
```

Build electron. Replace `linux` with `win` or `mac`
```bash
cd iclms-electron
yarn global add electron-builder
yarn install
yarn build-linux
```

Built files are available in `iclms-electron/dist`
