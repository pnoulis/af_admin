# About
This document shall:

Gather the business requirements demanded of the af_admin and af_server for
version 1.

Model accurately the real world environment under which this system operates.

Define the architecture and design of the software system that best satisfies
the business requirements and guarantees accurate, comprehensive and secure
handling of the real world environment model.

# Glossary
## af_server
The name of the server program under development.
## af_admin
The name of the client program under development.
## Admin
A user of af_admin with the highest possible
privileges.
## Manager
A user of af_admin with less privileges than an Admin.
## Cashier
A user of af_admin with less privileges than a Manager.
## Customer
A customer who has yet to have an account registered.
## Player
A customer who has registered an account.
## Team
A registered team.
## Roster
The players currently part of a team form the teams roster.
## Wristband
A wristband that uniquely identifies a player.
## Non-sensitive tracking && statistics
Information that may be exposed to both privileged and unprivileged users.
## Sensitive tracking && statistics
Information that should only be exposed to privileged users.
# Business Requirements
## Ability to CRUD Managers
## Ability to CRUD Cashiers
## Ability to CRUD Teams
## Ability to CRUD Players
## Ability to CRUD Packages
## Ability to CRUD Coupons
## Ability to CRUD Rooms
## Ability to track && pair Wristbands
## Ability to manipulate system
## Live statistics
## Non sensitive tracking && statistics
Teams currently playing.

Number of packages owned and not expired by the team.

Time remaining until the team's active package is expired.

Missions remaining until the team's active package is expired.

Total time a team has played in.

Total missions a team has played.

Total packages 'purchased' by a team.

Total score of a team.

Team's status.

Team's roster.

Team's registered wristband and associated player.

In the context of a cashier session.

total profits of the session.

number of teams currently playing.

number of players currently playing.

number of packages declared.

New teams registered.

New players registered.

## Sensitive tracking && statistics
## Cashing out
Cashier must generate a cash out report.

The cash out report should include:

The number of teams admitted.

The total number of teams associated with the Cashiers session.

The teams which have paid for their packages.

The teams which have not paid for their package.

The total profit earned by the Cashier.

The total number of packages sold by the Cashier.

The amount of packages sold by the Cashier sorted by type.

The number of teams which have not paid for their package in the Cashiers
session.

The number of packages which have yet to be paid for in the Cashiers session.

The monetary value of the total number of unpaid packages in the Cashiers session.

## Report generation automation and transport
## Email system
# Model real world environment
## Outside screen events
### Team registered for room
## Inside screen events
### Team set room difficulty
### Team panicked
## Sensor Events
### Team panicked
### Wristband scan
### Door is open
### Team scored
### Team won
### Team lost
# Software data models
