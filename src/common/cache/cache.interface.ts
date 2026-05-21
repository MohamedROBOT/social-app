export interface ICacheProvider {
    get(key:string): Promise<string | null>
    set(key:string,value:any,ttlSeconds:number): Promise<void>
    del(key:string): Promise<void>


    /**
    * @param key >> ex:"userId:FCM" [fcm-token1, fcm-token2]
    * @param value >> fcm token from firebase
     * */
    addToSet(key:string, value: string):Promise<void>
    rmSet(key:string,value:string):Promise<boolean>
    getAllFromSet(key:string):Promise<string[]>
}