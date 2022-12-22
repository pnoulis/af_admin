# Player
## **Login**
---
protocol: MQTT


### **Publish** (_/themaze/registrationPoint1/gui/player/login_)

content-type: application/json
```javascript
    {
        timestamp: 123456789, // Milliseconds
        username: "string",
        password: "string"
    }
```
### **Subscribe** (_/themaze/registrationPoint1/gui/player/login/response_)

content-type: application/json
```javascript
    // Success
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        player: {
            id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
            firstname: "string",
            lastname: "string",
            username: "string",
            phone: 123456789, // Integer
            email: "email@at.com"
        }
    }

    // Failure
    {
        timestamp: 123456789, // Milliseconds
        result: "NOK",
        message: "Wrong username and/or password"
    }

```

## **Register**
---
protocol: MQTT


### **Publish** (_/themaze/registrationPoint1/gui/player/registration_)

content-type: application/json
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        firstName: "string",
        lastName: "string",
        password: "string",
        email: "string",
        username: "string",
        phone: 123456789, // Integer
        birthDate: "1992-05-26", // Datetime
        confirmPassword: "string",
    }
```

### **Subscribe** (_/themaze/registrationPoint1/gui/player/registration/response_)

content-type: application/json
``` javascript
    // Success
    {
        timestamp: 123456789, // Milliseconds
        result: "OK"
        player: {
            id: "a18f9fb7-9c63-4c6f-bbc0-946c9fe216fd",
            firstname: "string",
            lastname: "string",
            username: "string",
            phone: 123456789, // Integer
            email: "email@at.com"
        }
    }

    // Failure
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

# Wristband
## **Register**
---
protocol: MQTT


### **Subscribe** (_/themaze/registrationPoint1/gui/player/wristbandScan_)

content-type: application/json

``` javascript
    // application/json
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        wristbandNumber: 10,
        wristbandColor: 1
    }
```
### **Publish** (_/themaze/registrationPoint1/gui/player/registerWristband_)

content-type: application/json
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        username: "string",
        wristbandNumber: 3
    }
```

### **Subscribe** (_/themaze/registrationPoint1/gui/player/registerWristband/response_)

content-type: application/json
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        message: "successfully registerWristbandToPlayer"
    }
```

# Team
## **Merge**
---
protocol: MQTT


### **Publish** (_/themaze/registrationPoint1/gui/team/merge_)

content-type: application/json
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        teamName: "string",
        usernames: ["user#0", "user#1"] // Array<string>
    }
```
### **Subscribe** (_/themaze/registrationPoint1/gui/team/merge/response_)

content-type: application/json
``` javascript
    // Success
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        message: "successfully created team"
    }
    // Failed
    {
        timestamp: 123456789, // Milliseconds
        result: "NOK",
        message: "team with this name already exists"
    }
```
### **Publish**
``` javascript
```
# Package
## Add
**url:** team/package/add

**req/res:** Object Object

**content-type:** application/json application/json

### Request
``` javascript
```
### Response
``` javascript
```
