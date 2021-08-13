const base64 = require("base-64");
const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

let _publicKey;
let _secretKey;
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
        this.createCharge = this.createCharge.bind(this);
        this.getCapabilities = this.getCapabilities.bind(this);
    }

    /**
     * To set a public key, secret key and API version
     * @param {String} publicKey 
     * @param {String} secretKey
     * @param {String} apiVersion 
     */
    config(publicKey, secretKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _secretKey = secretKey;
        _apiVersion = apiVersion;
    }

    /**
     * Get headers
     * @return {*} headers
     */
    getHeaders(key) {
        let headers = {
            'Authorization': 'Basic ' + base64.encode(key + ":"),
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
     * 
     * @return {*}
     */
    createToken(data) {
        const tokenEndpoint = vaultEndpoint + "tokens";
        // set headers
        let headers = this.getHeaders(_publicKey);

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
     * 
     * @return {*}
     */
    createSource(data) {
        const sourceEndpoint = apiEndpoint + "sources";
        // set headers
        let headers = this.getHeaders(_publicKey);

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

    /**
     * Create a charge
     * @param {*} data
     * 
     * @returns 
     */
    createCharge(data) {
        const chargeEndpoint = apiEndpoint + "charges";
        // set headers
        let headers = this.getHeaders(_secretKey);

        return new Promise((resolve, reject) => {
            // verify a secret key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your secret key");
                return;
            }

            return fetch(chargeEndpoint, {
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
     * @return {*} 
     */
    getCapabilities() {
        const sourceEndpoint = apiEndpoint + "capability";
        // set headers
        let headers = this.getHeaders();

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(sourceEndpoint, {
                method: 'GET',
                cache: 'no-cache',
                headers: headers,
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
    createSource: reactNativeOmise.createSource,
    createCharge: reactNativeOmise.createCharge,
    getCapabilities: reactNativeOmise.getCapabilities
}