//Abstraction
export interface IMailProvider {
    //html can be different too
    send(to:string,subject:string,html:string):Promise<void>
}


