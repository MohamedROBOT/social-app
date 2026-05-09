"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AzureProvider {
    uploadFile(file, path) {
        return Promise.resolve("");
    }
    deleteFile(key) {
        return Promise.resolve(undefined);
    }
}
class AuthService {
    cloudProvider;
    constructor(cloudProvider) {
        this.cloudProvider = cloudProvider;
    }
    async signup(signupDTO) {
        await this.cloudProvider.uploadFile("", "");
    }
}
new AuthService(new AzureProvider());
