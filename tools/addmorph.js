const descargar = require("./descargar");
const fs = require("fs");
const path = require("path");

const REPOSITORY = "https://github.com/sbosio/rla-es";
const TAG = "v2.6";
const LOCALE = "es";

const URLOXT = `${REPOSITORY}/releases/download/${TAG}/${LOCALE}.oxt`;
const URLSRC = `${REPOSITORY}/archive/refs/tags/${TAG}.zip`;

fs.mkdir("./work", { recursive: true }, (err) => {
    if (err) throw err;
});

descargar(URLOXT, path.join("./work", `${LOCALE}.oxt`));
descargar(URLSRC, path.join("./work", `${TAG}.zip`));