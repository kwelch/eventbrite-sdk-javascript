# Users

This is a collection of user methods. 

## ToC

- [`sdk.users.me()`](#me)
- [`sdk.users.get(id)`](#getById)
- [`sdk.users.lookup(email)`](#lookByEmail)

<a id="me"></a>

## `sdk.users.me()`
This method is used to get details about the current logged in user.

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

### API
```js
sdk.users.get(id: number|string): Promise<User>
```

### Example

```js
const eventbrite = require('eventbrite');

// Create configured Eventbrite SDK
const sdk = eventbrite({token: 'OATH_TOKEN_HERE'});

sdk.users.get(1234567890).then((user) => {
    console.log(`Hi ${user.name}!`);
});
```

<a id="lookByEmail"></a>

## `sdk.users.lookup(email)`
This method is used to load the details for a specific user by their email address. 

### API
```js
sdk.users.lookup(email: string): Promise<User>
```

### Example

```js
const eventbrite = require('eventbrite');

// Create configured Eventbrite SDK
const sdk = eventbrite({token: 'OATH_TOKEN_HERE'});

sdk.users.lookup('developer@eventbrite.com').then((user) => {
    console.log(`Hi ${user.name}!`);
});
```