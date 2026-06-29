![Version][version-shield]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo">
    <img src="app/images/icon-512x512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Caption Creator</h3>

  <p align="center">
    A web app to compose images and text.
    <br />
    <br />
    <a href="https://captioncreator.dev">Live App</a>
  </p>
</p>

## Building a standalone desktop app

Caption Creator can be packaged into a standalone desktop app with Electron.
All persistence is already client-side (IndexedDB via localforage) and PNG
export runs locally (html2canvas + file-saver), so the packaged app is fully
offline — no server required.

Prerequisites: Node 16+ and npm.

```sh
npm install
npm run electron      # build for Electron and launch it locally
npm run dist:win      # produce a Windows installer + portable .exe in ./dist
npm run dist:mac      # produce a macOS .dmg in ./dist
npm run dist:linux    # produce a Linux AppImage in ./dist
```

`npm run dist:win` builds two artifacts under `dist/`:

- `Caption Creator Setup <version>.exe` — NSIS installer (lets the user pick
  the install location, adds Start Menu / Desktop shortcuts).
- `Caption Creator <version>.exe` — single-file portable executable
  (no install, just double-click).

Cross-compiling a Windows build from macOS or Linux requires Wine; the
simplest path is to run `npm run dist:win` on a Windows machine.




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[version-shield]: https://img.shields.io/badge/version-1.0.0--alpha.1-blue?style=flat-square