Authentication 
JWT 
json web token
cookies

install cookie parser
 just send a dummy cookie to user
 create get / profile api and check if you get the cookie back
 install jwt
 In login api, after email and password create a jwt token and send it to user id

 read the cookies inside your profile api and find the logged in user

 - userAuth middleware
 - add the userAuth middleware in profile Api and a new sendconnectionrequerst API
 Set the expiry of jwt token and cookie to days

 create  schema method to getJWT()
 create  userSchema method to comparePaasword(passwordInputByUser)

- explore tinder
-create a list all api you can think of in          devTinder
- Group multiple routes under respective routers
- read doc for express router
- create routes for managing auth, profile, request routers
- create authRouter, profileROuter, requestRouter
- Import this routers in app.js

