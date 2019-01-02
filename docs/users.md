# Users

This is a collection of method that are intended to be helpful wrappers around the [Users API endpoints](user-api-docs).

View the [User response object](user-object-reference) for details on the properties you'll get back with each response.

## Table on Contents

- [`sdk.users.me()`](#me)
- [`sdk.users.get(id)`](#getById)
- [`sdk.users.emailLookup(email)`](#lookByEmail)

<a id="me"></a>

## `sdk.users.me()`
This method is used to get details about the current logged in user.

**Read [`/users/me` documentation](user-get-me) for more details.**

### API
```js
sdk.users.me(): Promise<User>
```

### Example

```js
const eventbrite = require('eventbrite');

// Create configured Eventbrite SDK
const sdk = eventbrite({token: 'OATH_TOKEN_HERE'});

sdk.users.me().then((user) => {
    console.log(`Hi ${user.name}!`);
});
```

<a id="getById"></a>

## `sdk.users.get(id)`
This method is used to load the details for a specific user by their user id. 

**Read [`/users/:id` documentation](user-get-me) for more details.**

### API
```js
sdk.users.get(id: string): Promise<User>
```

### Example

```js
const eventbrite = require('eventbrite');

// Create configured Eventbrite SDK
const sdk = eventbrite({token: 'OATH_TOKEN_HERE'});

sdk.users.get('1234567890').then((user) => {
    console.log(`Hi ${user.name}!`);
});
```

<a id="lookByEmail"></a>

## `sdk.users.emailLookup(email)`
This method is used to load the details for a specific user. Currently it supports look ups via the email property.

**_Currently, no public documentation page._**

### API
```js
sdk.users.emailLookup(string>): Promise<User>
```

### Example

```js
const eventbrite = require('eventbrite');

// Create configured Eventbrite SDK
const sdk = eventbrite({token: 'OATH_TOKEN_HERE'});

sdk.users.emailLookup('developer@eventbrite.com').then((user) => {
    console.log(`Hi ${user.name}!`);
});
```


<!-- link reference section -->
[user-api-docs]: https://www.eventbrite.com/platform/api#/reference/user
[user-object-reference]: https://www.eventbrite.com/platform/api#/reference/user/retrieve-a-user
[user-by-id]: https://www.eventbrite.com/platform/api#/reference/user/retrieve-a-user
[user-get-me]: https://www.eventbrite.com/platform/api#/reference/user/retrieve/retrieve-your-user