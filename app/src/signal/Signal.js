import util from "./helpers";
import { LocalStorage } from "./LocalStorage";
import axios from "axios";
const libsignal = window.libsignal;

export class Signal {
    constructor(userID) {
        this.userID = userID;
        this.LocalStorageHelper = new LocalStorage();
    }

    async init() {
        await this._generateIdentity();
        let preKeyBundle = await this._generatePreKeyBundle();
        await this.uploadPreKeyBundle(preKeyBundle);
    }

    async _generateIdentity() {
        var results = await Promise.all([
            libsignal.KeyHelper.generateIdentityKeyPair(),
            libsignal.KeyHelper.generateRegistrationId(),
        ]);

        this.store.put("identityKey", results[0]);
        this.store.put("registrationId", results[1]);

        this.LocalStorageHelper.putIdentityPairKey(this.userID, results[0]);
        this.LocalStorageHelper.putRegistrationId(this.userID, results[1]);
    }

    async _generatePreKeyBundle() {
        var result = await Promise.all([
            this.LocalStorageHelper.getIdentityPairKey,
            this.LocalStorageHelper.gettRegistrationId,
        ]);

        let identity = result[0];
        let registrationId = result[1];

        var signedPreKeys = await Promise.all([
            libsignal.KeyHelper.generateSignedPreKey(identity, registrationId + 1),
            libsignal.KeyHelper.generateSignedPreKey(identity, registrationId + 2),
            libsignal.KeyHelper.generateSignedPreKey(identity, registrationId + 3),
            libsignal.KeyHelper.generateSignedPreKey(identity, registrationId + 4),
        ]);

        this.LocalStorageHelper.putSignedPreKey(this.userID, { signedPreKeys });

        let publicSignedPreKeys = signedPreKeys.map((preKey) => {
            return {
                keyId: preKey.keyId,
                publicKey: preKey.keyPair.pubKey,
                signature: preKey.signature,
            };
        });
        return {
            identityKey: identity.pubKey,
            registrationId: registrationId,
            SignedpreKeys: publicSignedPreKeys,
        };
    }

    async uploadPreKeyBundle(bundle) {
        _token = util.getCookie("_token");
        if (_token === undefined) return;

        axios
            .post(
                `/api/v1/bundle/${this.userID}`,
                { bundle },
                {
                    headers: {
                        cookies: {
                            _token: _token,
                        },
                    },
                },
            )
            .then((respone) => {
                console.log("bundle uploaded");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
