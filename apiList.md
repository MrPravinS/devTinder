Tinder Api
authRouter
POST /signup
POST /login
POST /logout

profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

connectionRequestRouter
POST / /request/send/interested/:userId
POST / /request/send/ignore/:userId
POST / /request/send/accepted/:userId
POST / /request/send/rejected/:userId


userRouter
GET /connections
GEt /request/recieved
GET /feed -Gets you th profiles of other users on platform   => give 25 to 30 user at a time



STATUS => ignor. interested, accepted, rejected