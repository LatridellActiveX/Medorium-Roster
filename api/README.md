# Auth

### Note: Request with invalid body/query/params will error with ResponseZodError

```json
[
  {
    "code": "too_small",
    "minimum": 6,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "String must contain at least 6 character(s)",
    "path": ["username"]
  }
]
```

<br>

## `POST /auth/register?accessCode=${accessCode}`

Registers user if name is not in use
(and the accessCode is valid)

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   6    |   30   |
| password |   Yes    | string |   8    |  128   |

### Query

|   Field    | Required |  Type  | minLen | maxLen |
| :--------: | :------: | :----: | :----: | :----: |
| accessCode |   Yes    | string |  100   |  200   |

### Example responses

#### Success

```json
{ "message": "Successfully registered user with name 'testuser'" }
```

#### Error

```json
{
  "error": "Invalid username or password"
}
```

<br>

## `POST /auth/login`

Sends authToken cookie

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   6    |   30   |
| password |   Yes    | string |   8    |  128   |

<br>

### Example responses

#### Success

```json
{
  "authenticated": true
}
```

#### ResponseErrorMessage

```json
{
  "error": "Invalid username or password"
}
```

## `GET /auth`

Responds with status `200` if authorized, otherwise responds with status `401`

### Example responses

#### Success

```json
{
  "authorized": true,
  "username": "testuser",
  "isAdmin": false
}
```

#### ResponseErrorMessage

```json
{
  "error": "Not Authorized"
}
```

## `GET /auth/accessCode`

Returns a one time use code that can be used for registration.
Requires being logged in as an admin.

### Example responses

#### Success

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE2MDcyNjUsImV4cCI6MTY5MTYwOTA2NX0.f913ovw2kvORgs50R8w2KWFdN96XW6pQeU29U-P-Bq8"
}
```

#### Error

```json
{
  "error": "Not Authorized"
}
```

## GET `/auth/accessCode/verify/:accessCode`

Validates the specified accessCode in the following format

```json
{
  "valid": true // or false
}
```

# Roster

## `GET /api/roster`

Returns all characters of all users

### Example Responses

#### Success - ResponseCharacters

```json
[
  {
    "name": "Wingedfaith",
    "username": "wingedguy",
    "main": true,
    "rank": "Section Foreman",
    "division": "Mining"
  },
  {
    "name": "Benjamin Thomson",
    "username": "latridell",
    "main": true,
    "rank": "Chief Financial Officer (CFO)",
    "division": "Front Office"
  },

  {
    "name": "Josaline Thomson",
    "username": "latridell",
    "main": false
  }
]
```

## `GET /api/characters`

Returns all characters of the logged in user

### Example Responses

#### Success - ResponseCharacters

```json
[
  {
    "name": "Benjamin Thomson",
    "username": "latridell",
    "main": true,
    "rank": "Chief Financial Officer (CFO)",
    "division": "Front Office"
  },
  {
    "name": "Josaline Thomson",
    "username": "latridell",
    "main": false
  },
  {
    "name": "Jericho Thomson",
    "username": "latridell",
    "main": false
  }
]
```

## `POST /api/characters`

Creates a character for the logged in user

### Body

| Field | Required |  Type   | minLen | maxLen |
| :---: | :------: | :-----: | :----: | :----: |
| name  |   Yes    | string  |   3    |   37   |
| main  |   Yes    | boolean |  N/A   |  N/A   |

<br>

### Example Responses

#### Success - ResponseCharacters

```json
{
  "username": "testuser",
  "name": "testcharacter",
  "main": true,
  "_id": "64cbe570a8c889cce780f9d1"
}
```

#### Error

```json
{
  "error": "Name is already in use"
}
```

## `DELETE /api/characters`

Deletes a character of the logged in user

### Body

| Field | Required |  Type  | minLen | maxLen |
| :---: | :------: | :----: | :----: | :----: |
| name  |   Yes    | string |   3    |   37   |

<br>

### Example Responses

#### Success

```json
{ "message": "Successfully deleted \"characterName\"" }
```

#### Error

```json
{
  "error": "Character does not exist"
}
```

# Users

## `DELETE /api/users/:username/characters/:character`

Deletes a character of specified user. Requires admin privileges.

### Params

|   Field   | Required |  Type  | minLen | maxLen |
| :-------: | :------: | :----: | :----: | :----: |
| username  |   Yes    | string |   6    |   30   |
| character |   Yes    | string |   3    |   37   |

### Example responses

#### Success

```json
{
  "message": "Successfully deleted character \"test\" of user \"username\""
}
```

#### Error

```json
{
  "error": "Character does not exist"
}
```

<br>
