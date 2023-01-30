# About
This document shall be a reference to all the API's the **AF_ADMIN** client consumes.

Since there might be multiple API's offered by multiple **vendors**.

Each API shall be placed under a _section named after the supplying vendor or
service offered._

For example the primary **backend** used by *AF_ADMIN* is given the label
**MQTT_BACKEND_1**. 

Hence the API exposed by the _vendor_ **MQTT_BACKEND_1** shall be placed under a
section named *MQTT_BACKEND_1.*

# MQTT_BACKEND_1

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

# Packages
## Example package dataset schema
### Packages table
<table>
<thead><tr>
<th>index</th>
<th>ID</th>
<th>Name</th>
<th>Type</th>
</tr></thead>
<tbody>
<tr><td>1</td><td>[ "missions" | 1 ]</td><td>missions</td><td>linear</td></tr>
<tr><td>2</td><td>[ "elements" | 2 ]</td><td>elements</td><td>nonlinear</td></tr>
<tr><td>3</td><td>[ "time" | 3 ]</td><td>time</td><td>linear</td></tr>
</tbody>
</table>

### Linear Package permutations table
<table>
<thead><tr>
<th>index</th>
<th>package_id</th>
<th>permutation_name</th>
<th>package_unit</th>
<th>price_unit_id</th>
<th>constant_cost</th>
<th>player_coefficient</th>
</tr></thead>
<tbody>
<tr><td>1</td><td>[ "missions" | 1 ]</td><td>"per mission"</td><td>"missions"</td><td>[ "euro" | n ]<td>1.5</td><td>1.05</td></tr>
<tr><td>2</td><td>[ "time" | 2 ]</td><td>"per time"</td><td>"minutes"</td><td>[ "euro" | n ]<td>2.0</td><td>1.15</td></tr>
</tbody>
</table>

### Non-Linear Package permutations table
<table>
<thead><tr>
<th>index</th>
<th>package_id</th>
<th>permutation_name</th>
<th>package_unit</th>
<th>price_unit_id</th>
<th>constant_cost</th>
<th>player_coefficient</th>
</tr></thead>
<tbody>
<tr><td>1</td><td>[ "elements" | 1 ]</td><td>"earth"</td><td>NULL</td><td>[ "euro" | n ]</td><td>40</td><td>1.5</td></tr>
<tr><td>2</td><td>[ "elements" | 2 ]</td><td>"fire"</td><td>NULL</td><td>[ "euro" | n ]</td><td>55</td><td>1.02</td></tr>
<tr><td>3</td><td>[ "elements" | 3 ]</td><td>"water"</td><td>NULL</td><td>[ "euro" | n ]</td><td>60.5</td><td>1.5</td></tr>
<tr><td>4</td><td>[ "elements" | 4 ]</td><td>"wind"</td><td>NULL</td><td>[ "euro" | n ]</td><td>33.999</td><td>1.5</td></tr>
</tbody>
</table>


# User Stories Registration
## User creates team (use admin only for package addition)
user[player]: logs in / registers<br>
/themaze/registrationPoint/gui/player/login<br>
/themaze/registrationPoint/gui/player/register<br>

user[player]: Wristband registration (User scans wristband)<br>
gui must subscribe: /themaze/registrationPoint/gui/player/wristbandScan<br>
And then publishes in order to associate wristband to player<br>
publish: /themaze/registrationPoint/gui/player/registerWristband<br>

user[player]: Wristband Verification (User scans wristband)<br>
user scans wristband.<br>
gui must subscribe to: /themaze/registrationPoint/gui/player/wristbandScan<br>
The gui is responsible for verifying the association between wristband and user.<br>
publish: /themaze/registrationPoint/gui/player/isValid<br>
subscribe: /themaze/registrationPoint/gui/player/isValid/response<br>
In case of a user being registered to another team an error occurs.<br>

user[player]: Team creation (merge)<br>
if team name is taken error occurs and player must submit a new team name.<br>
/themaze/registrationPoint1/gui/team/merge<br>
/themaze/registrationPoint1/gui/team/merge/response<br>

user[player]: goes to admin in order to add a package

user[admin]: checks list of teams in state 'registered'<br>
/teams/#page1&state=registered<br>
request teams in topic: ...<br>
QUESTION: What happens when a team is selected?<br>

user[admin]: selects team<br>
/team/${teamId}<br>

user[admin]: creates a package<br>
/team/${teamId}/package/new<br>

user[admin]: assigns package to team<br>
/team/${teamId}/package/new

team state from 'registered' to '[packaged|ready|...]'<br>
  
## Admin creates team and package (sticking to existing pattern)
user[admin]: navigates to /register/team<br>
   is redirected to: /register/team/players

user[admin]: logs in / registers player<br>
/register/team/players
/themaze/registrationPoint/gui/player/login<br>
/themaze/registrationPoint/gui/player/register<br>

user[admin]: wristband registration<br>
/register/team/players
gui must subscribe: /themaze/registrationPoint/gui/player/wristbandScan<br>
And then publishes in order to associate wristband to player<br>
publish: /themaze/registrationPoint/gui/player/registerWristband<br>


user[admin]: wristband verification
/register/team/merge

user[admin]: create / merge team<br>
/register/team/merge
/themaze/registrationPoint1/gui/team/merge<br>
/themaze/registrationPoint1/gui/team/merge/response<br>

user[admin]: creates / assign package to team<br>
/register/team/package
possible publish: /themaze/registration/gui/team/package/[add|new]<br>

user[admin]: summary
/register/team/summary

## Registration Questions && Suggestions.

QUESTION:
If a team has been registered by the user[player] how does the user[admin]
adds a package?

possible solution:<br>
navigate to /teams/page#<br>
select a team by clicking it.<br>
redirect to /teams/${teamId}.
Within the route /teams/${teamId} the user[admin**<br>
can edit the team in any way possible

SUGGESTION:<br>
In the existing pattern the user must register a wristband and then verify the associating
before merging the team.<br>
The wristband registration stage should be merged with the wristband verification stage.

QUESTION:<br>
What is the current practice for editing a team after their have been registered?

SUGGESTIONS:<br>
Team must be able to remove/add players<br>
Team must be able to pair-unpair wristbands<br>
Team must be able to add/edit a new package.<br>



## Routes for Team and Registration
Navigation links:

/manager/teams

/manager/teams/${teamId}

/registration/team

/registration/${teamId}

/registration/${teamId}/players/

/registration/${teamId}/package/

/registration/${teamId}/summary


API Calls:

/topic/.../teams

/topic/.../teams/${teamId}

/topic/.../${teamId}/register

/topic/.../${teamId}/deregister

/topic/.../${teamId}/players/add

/topic/.../${teamId}/players/remove

/topic/.../${teamId}/players/wristband/register

/topic/.../${teamId}/players/wristband/verify

/topic/.../${teamId}/players/wristband/deregister

/topic/.../${teamId}/package/add

/topic/.../${teamId}/package/remove







