# About
This document shall be a reference to all the API's the **AF_ADMIN** client consumes.

Since there might be multiple API's offered by multiple **vendors**; each API
shall be placed under a _section named after the supplying vendor or service
offered._

For example the primary **backend** used by _AF_ADMIN** is given the label
**MQTT_BACKEND_1**. Hence the API exposed by the _vendor_ **MQTT_BACKEND_1**
shall be placed under a section named *MQTT_BACKEND_1.*

# MQTT_BACKEND_1
---
## About
This is the API exposed by the main backend server the AF_ADMIN client interacts
with.

The exposed API is consumed through the use of the **MQTT** protocol.

MQTT: https://en.wikipedia.org/wiki/MQTT

## Examples

## Player
### **Login**
---
Login player.

#### **Publish** (_/themaze/registrationPoint1/gui/player/login_)

```javascript
    {
        timestamp: 123456789, // Milliseconds
        username: "string",
        password: "string"
    }
```

#### **Subscribe** (_/themaze/registrationPoint1/gui/player/login/response_)

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

### **Register**
---
Register a new player.

#### **Publish** (_/themaze/registrationPoint1/gui/player/registration_)

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

#### **Subscribe** (_/themaze/registrationPoint1/gui/player/registration/response_)

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

## Wristband
### **Register**
---
Match player with their wristband.

#### **Subscribe** (_/themaze/registrationPoint1/gui/player/wristbandScan_)
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        wristbandNumber: 10,
        wristbandColor: 1
    }
```
#### **Publish** (_/themaze/registrationPoint1/gui/player/registerWristband_)
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        username: "string",
        wristbandNumber: 3
    }
```

#### **Subscribe** (_/themaze/registrationPoint1/gui/player/registerWristband/response_)
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        message: "successfully registerWristbandToPlayer"
    }
```

## Team
### **Merge**
---
Create a new team.

TODO issue #1
should the client check if all the players have had their wristbands assigned?
before creating a new Team?

TODO issue #2
A team should not be identified with its name but rather its ID since
people tend to pick names from a small pool of possibilites such as: [
"the_invicibles", "the_amazing_4", ...]

#### **Publish** (_/themaze/registrationPoint1/gui/team/merge_)
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        teamName: "string",
        usernames: ["user#0", "user#1"] // Array<string>
    }
```
#### **Subscribe** (_/themaze/registrationPoint1/gui/team/merge/response_)
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

## Package
### **Add**
---
Add a paid package to the team.

#### **Publish** (_/themaze/registrationPoint1/gui/team/package/add_)
``` javascript
    {
        timestamp: 123456789, // Milliseconds
        teamName: "string", // teamName or ID (check issue 2)
        package: {
            type: "string", // [ "time" || "element" || "missions" ]
            // **Package** is an evolving entity. Until its development
            // has settled all info could be send within an array
            // which would allow for maximum flexibility.
            info: ["string", 123456789, {} ],
            discountCode: 123456789,
            players: [
                {
                    id: 123456789,
                    discountCode: 123456789
                }
            ]
            
        }
    }
```
#### **Subscribe** (_/themaze/registrationPoint1/gui/team/package/add/response_)
``` javascript
    // Success
    {
        timestamp: 123456789, // Milliseconds
        result: "OK",
        message: "successfully added package"
        package: {
            price: 200.3 // Float
            discountPrice: 150.3 // Float
            players: [
                {
                   id: 123456789,
                   amount: 15.3 // Float
                   discountCode: 123456789 // [ Integer || null ]
                   // The discountCode field acts as a Boolean at the same time
                }
            ]
            
        }
        
    }
    // Failed
    {
        timestamp: 123456789, // Milliseconds
        result: "NOK",
        message: "Failed to receive payment"
    }
```
