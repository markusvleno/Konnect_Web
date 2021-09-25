import util from "./helpers";

export class LocalStorage {
    constructor() {
        this.store = window.localStorage;
        this.RegIDConst = "Registration_Key";
        this.PairKeyConst = "Identity_Pair_Key";
        this.SignedPreKeyConst = "Signed_Pre_Key";
    }

    putIdentityPairKey(userId, pairKey) {
        let storeAccessKey = this.PairKeyConst + util.toString(userId);

        this.store.setItem(storeAccessKey, JSON.stringify(pairKey));
    }

    getIdentityPairKey(userId) {
        let storeAccessKey = this.PairKeyConst + util.toString(userId);

        return this.store.getItem(storeAccessKey);
    }

    removeIdentityKey(userId) {
        let storeAccessKey = this.PairKeyConst + util.toString(userId);
        this.store.removeItem(storeAccessKey);
    }

    putSignedPreKey(userId, preKey) {
        let storeAccessKey = this.SignedPreKeyConst + util.toString(userId);

        this.store.setItem(storeAccessKey, JSON.stringify(preKey));
    }

    getSignedPreKey(userId) {
        let storeAccessKey = this.SignedPreKeyConst + util.toString(userId);

        return this.store.getItem(storeAccessKey);
    }

    removeSignedPreKey(userId) {
        let storeAccessKey = this.SignedPreKeyConst + util.toString(userId);
        this.store.removeItem(storeAccessKey);
    }

    putRegistrationId(userId, regId) {
        let storeAccessKey = this.RegIDConst + util.toString(userId);
        this.store.setItem(storeAccessKey, util.toString(regId));
    }

    gettRegistrationId(userId) {
        let storeAccessKey = this.RegIDConst + util.toString(userId);
        return this.store.getItem(storeAccessKey);
    }

    removeRegistrationKey(userId) {
        let storeAccessKey = this.RegIDConst + util.toString(userId);
        this.store.removeItem(storeAccessKey);
    }
}
