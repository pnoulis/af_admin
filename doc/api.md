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

### Successfull response
```javascript
    {
        timestamp:  "123324324" // Milliseconds
        result: "OK"
        player: {
            id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
            firstname: "string",
            lastname: "string",
            username: "string",
            phone: "16898", // Integer
            email: "email@at.com"
        }
    }
```

### Failed response
```javascript
    {
        timestamp: 12342342, // Milliseconds
        result: "NOK",
        message: "Wrong username and/or password"
    }
```

## Register
**url:** player/register

**req/res:** Object Object

**content-type:**  application/json application/json

### Request
``` javascript
    {
        firstName: "string",
        lastName: "string",
        password: "string",
        email: "string",
        username: "string",
        phone: "698078787", // Integer
        birthDate: "20/40/55", // Datetime
        confirmPassword: "string", 
        timestamp: "234234234" // Milliseconds
    }
```
### Successful response
``` javascript
 {
        timestamp:  "123324324" // Milliseconds
        result: "OK"
        player: {
            id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
            firstname: "string",
            lastname: "string",
            username: "string",
            phone: "16898", // Integer
            email: "email@at.com"
        }
    }
   
```
### Failed response
``` javascript
    {
        timestamp: 698698689, // Milliseconds
        result: "NOK",
        validationErrors: {
            password: "string",
            birthDate: "string",
            email: "string",
            username: "string"
        }
    }
```


# Team
# Package