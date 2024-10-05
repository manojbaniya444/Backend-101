## HTTP authentication
HTTP provides a general framework for access control and authentication.

A client that wants to authenticate itself with the server can then do by including an `**Authorization**` request header with the credentials.

The HTTP `Authorization` request header can be used to provide credentials that authenticate a user agent with a server allowing protected route visit.

```
HTTP
Authorization: <auth-scheme> <authorization-parameters>
```

## Some authentication schemes
- **Basic** : base64-encoded credentials
- **Bearer** : bearer tokens 
- **Digest**
- and many more

> As the User ID and password are passed over the network as clear text, the basic authentication scheme is not secure. HTTPS/TLS should be used with basic authentication. Without these additional security enhancements, basic authentication should not be used to protect sensitive data