export interface INotificationProvider {
  /*
  * @params token: ex. FCM token in case firebase service
  * @params data: object contains push notification message (data)
  */
 send(token: string, data:{title: string, body:string}): Promise<void>;

}
