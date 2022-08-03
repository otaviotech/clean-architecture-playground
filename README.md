# Clean Architecture Playground

## It is

A `Clean Architecture` playground.

A place where I can play with different approaches and practice the concepts brought by Uncle Bob's book.

Not meant to have a single approach(because it's a playground to try and discuss about every related subject).

A discussion open repository.

## It is not

A template.

Production ready.

# Summary

A quick recap of what we should have at each layer:

1. Domain

- Entities
- Errors

2. Application

- Use cases
- Errors
- Repositories

3. Infra

- Controllers
- Presenters

4. External

- Concrete implementations
  - Web server (`Express`, Hapi, Fastify)
  - ORM (`Prisma`, Sequelize, Mongoose, TypeORM)
  - Logger (`Pino`, Winston, Bunyan)

5. Main

- Factories
- IoC container (Awlix, Inversify)
- Application's entry point

# Layer breakdown

# 1. Domain

`This is the heart of our business`

This layer has only real word entities and errors.
It means it doesn't have any application logic, like checking if a username is available.

# 2. Application

`This is the heart of our application`

Here is where the automation of our business happens.

We will find the necessary contracts and logic for a a business use case to happen.

Example of use cases:

- SignUp
- SubscribeToNewsletter
- SendChatMessage
- Follow
- Unfollow

Also, we will find the repositories needed for our `application` to work properly.

Exemples of repositories:

- FindProfileByUsernameRepository
- CreateProfileRepository
- SignUpRepository

# 3. Infra

`This is where our application communicate (in and out) with the outside world`

Here we define how outside actors(users, other applications, databases\*, etc) interact with our application and vice-versa.

Example of interactions:

- Rest API (controllers, presenters)
- CLI (controllers, presenters)
- Services (email, queues, geolocation, i18n)

# 4. External

`This is where our tech lives`

Here we place all third party implementations, such as web frameworks, ORMs, loggers, libraries.
This gives us the ability of:

- changing from SQL to noSQL
- replacing TypeORM with `Prisma`
- replacing Express with Hapi

Long story short: here we implement the contracts from infra layer.

# 5. Main

`This is where we compose our application`

This layers is responsible for composing every class of our application, our application itself, and provide an entry point for our application.

Here we will find:

- Factories
- Application's entrypoint

# Shared

This is a layer that doesn't have any special responsability.
It only provides tools to make it easier to build our app.

Things we'll find here:

- Helper functions (date, string, calculations)
- Design patterns contracts

Although it has no responsibilities, it helps to keep third party libraries out of our application.

Example:

We'll never call `moment()` library from our app.
Instead we should call something such `dateUtils.getCurrentDateTime()` which abstracts the moment library and provide us only JS dates.

Obs: if we want to be purists, we can also do this by using Infra + External layers, but for some cases it might be overengineering, and we should always think about good and bad tradeoffs.

# Reference

[The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - By Robert C. Martin

![Robert C. Martin's clean architecture layers diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
