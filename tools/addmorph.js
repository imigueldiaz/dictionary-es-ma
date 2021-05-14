const descargar = require("./descargar");
const fs = require("fs").promises;
const path = require("path");
const rmfr = require("rmfr");
const Zip = require("adm-zip");
const REPOSITORY = "https://github.com/sbosio/rla-es";
const TAG = "v2.6";
const LOCALE = "es_ES";

const URLOXT = `${REPOSITORY}/releases/download/${TAG}/${LOCALE}.oxt`;
const URLSRC = `${REPOSITORY}/archive/refs/tags/${TAG}.zip`;

const descargarFuentes = async() => {
    await rmfr("./work");

    await fs.mkdir("./work", { recursive: true }, (err) => {
        if (err) throw err;
    });

    await descargar(URLOXT, path.join("./work", `${LOCALE}.oxt`));
    await descargar(URLSRC, path.join("./work", `${TAG}.zip`));

    let zip = new Zip(path.join("./work", `${LOCALE}.oxt`));
    zip.extractEntryTo(`${LOCALE}.aff`, "./work", true, true);
    zip.extractEntryTo(`${LOCALE}.dic`, "./work", true, true);

    zip = new Zip(path.join("./work", `${TAG}.zip`));
    zip.extractEntryTo(
        `rla-es-2.6/ortografia/palabras/RAE/l10n/${LOCALE}/`,
        "./work/palabras",
        false,
        true
    );

    zip.extractEntryTo(
        `rla-es-2.6/ortografia/afijos/l10n/${LOCALE}/afijos.txt`,
        "./work",
        false,
        true,
        `afijos-${LOCALE}.txt`
    );

    try {
        fs.unlink(path.join("./work", `${LOCALE}.oxt`));
        fs.unlink(path.join("./work", `${TAG}.zip`));
    } catch (e) {
        console.error(e);
    }
};
console.log("Descargando las fuentes y descomprimiendo ficheros necesarios...");

descargarFuentes();