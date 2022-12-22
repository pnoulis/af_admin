# Player
## Login
**url:** player/login

**req-res:** Object Object

**content-type:** application/json application/json

### Request
``` javascript
    {
        username: "string"
        password: "string"
    }
```

### Succsessfull response
```javascript
    {
        timestamp:  "123324324" // milliseconds
        result: "OK"
        player: {
            id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
            firstname: "string",
            lastname: "string",
            username: "string",
            phone: "16898", // integer
            email: "email@at.com"
        }
    }
```

### Failed response
```javascript
    {
        timestamp: "12342342" // milliseconds
        result: "NOK",
        message: "Wrong username and/or password"
    }
```


# Team
# Package