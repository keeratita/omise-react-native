const base64 = require("base-64");
const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

let _publicKey;
let _apiVersion;

/**
 * ReactNativeOmise
 */
class ReactNativeOmise {

    /**
     * constructor
     */
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
    }

    /**
     * To set a public key and API version
     * @param {String} publicKey 
     * @param {String} apiVersion 
     */
    config(publicKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _apiVersion = apiVersion;
    }

    /**
     * Get headers
     * @return {*} headers
     */
    getHeaders() {
        let headers = {
            'Authorization': 'Basic ' + base64.encode(_publicKey + ":"),
            'User-Agent': pkgConfig.name + "/" + pkgConfig.version,
            'Content-Type': 'application/json',
        };

        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }

        return headers;
    }

    /**
     * Create a token
     * @param {*} data 
     */
    createToken(data) {
        const tokenEndpoint = vaultEndpoint + "tokens";
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    /**
     * Create a source
     * @param {*} data 
     */
    createSource(data) {
        const sourceEndpoint = apiEndpoint + "sources";
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(sourceEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
}


const reactNativeOmise = new ReactNativeOmise();

module.exports = {
    config: reactNativeOmise.config,
    createToken: reactNativeOmise.createToken,
    createSource: reactNativeOmise.createSource
}