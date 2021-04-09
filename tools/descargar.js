const fs = require("fs");
const url = require("url");

const descargar = (uri, fichero) => {
    const URL = new url.URL(uri);
    const protocol = URL.protocol.replace(/\:$/, "");

    const onError = () => {
        fs.unlink(filename);
        reject(e);
    };

    return new Promise((resolve, reject) => {
        require(protocol)
            .get(uri, (response) => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    let fileStream = fs.createWriteStream(fichero);
                    fileStream.on("error", onError);
                    fileStream.on("close", resolve);
                    response.pipe(fileStream);
                } else if (response.headers.location) {
                    resolve(descargar(response.headers.location, fichero));
                } else {
                    reject(new Error(response.statusCode + " " + response.statusMessage));
                }
            })
            .on("error", onError);
    });
};

module.exports = descargar;