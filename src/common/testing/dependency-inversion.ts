//implementation of dependency inversion
/*
--SOLID principles explaination
   Dependency Inversion
   -Mails
   -cache
   -cloud
   -payment


*/
interface ICloudProvider {
    uploadFile(file: string, path:string): Promise<string>;

    deleteFile(key:string): Promise<void>
}

class AzureProvider implements ICloudProvider {
    uploadFile(file: string, path: string): Promise<string> {
        return Promise.resolve("")
    }
    deleteFile(key: string): Promise<void> {
        return Promise.resolve(undefined)
    }
}



class AuthService {
    constructor(private cloudProvider:ICloudProvider) {}


  async  signup(signupDTO:any) {
       await this.cloudProvider.uploadFile("","")
    }
}


new AuthService(new AzureProvider())