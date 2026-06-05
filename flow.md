-posts

- work flow
  router >> controller >> validation >> service >> repository >> model >> schema >> interface

--Relation between models



--SOLID principles explaination
  * Dependency Inversion
   -Mails
   -cache
   -cloud
   -payment

--socket io connection flow
1. connection BE
2. connection FE
3. Check connection between both FE and BE
4. integrate cache provider to assign each socketid to specific user and store it
5. remove socketId from caching when disconnect
