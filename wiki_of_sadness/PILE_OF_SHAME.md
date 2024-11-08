# Security and Logon
Today we will discuss the outer crime against security that is the phantombot authentication system :)))))))

## Steps to gain access
1. get the token from the headers of an outgoing request (cookies > panelLogin) or get them from the cookiestore
2. you can then use the token until the user changes the password, from any useragent, without aditional validation.
3. The token is **NOT** invalidated after a new login, only password change

## Reason
This is my understanding of the authentication and login flow based on my tests and source code
1. The password is hashed
2. the token is formend from `USERNAME:HAHED_PASSWORD`
3. this token is then base64 encoded
4. this is your access token, this is sent over the wire as the panelLogin
5. this token is then extracted from the headers (or various other places)
6. base64 decoded
7. the password portion is then plaintext checked against the pw database, it is not hashed in the backend
8. that means, if you get the db you can straight send these values to the bot, and gain access