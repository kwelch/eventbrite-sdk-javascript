# Users

This is a collection of method that are intended to be helpful wrappers around the [Users api endpoints](user-api-docs).

The definition of the [User response object can be found here](user-object-reference).

## ToC

- [`sdk.users.me()`](#me)
- [`sdk.users.get(id)`](#getById)
- [`sdk.users.lookup(email)`](#lookByEmail)

<a id="me"></a>

## `sdk.users.me()`
This method is used to get details about the current logged in user.

**[Documentation](user-get-me)**

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

**[Documentation](user-get-id)**

### API
```js
sdk.users.get(id: string): Promise<User>
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

**_Currently, no public documentation page_**

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


<!-- link reference section -->
[user-api-docs]: https://www.eventbrite.com/platform/api#/reference/user
[user-object-reference]: https://www.eventbrite.com/platform/api#/reference/user/retrieve-a-user
[user-by-id]: https://www.eventbrite.com/platform/api#/reference/user/retrieve-a-user
[user-get-me]: https://www.eventbrite.com/platform/api#/reference/user/retrieve/retrieve-your-user