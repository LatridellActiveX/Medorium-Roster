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

## POST /auth/register?accessCode=

Registers user if name is not in use
(and the accessCode is valid)

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   ?    |   ?    |
| password |   Yes    | string |   ?    |   ?    |

### Query

`Note: accessCode is not implemented yet`

|   Field    | Required |  Type  | minLen | maxLen |
| :--------: | :------: | :----: | :----: | :----: |
| accessCode |    No    | string |   ?    |   ?    |

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

## POST /auth/login

Sends authToken cookie

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   ?    |   ?    |
| password |   Yes    | string |   ?    |   ?    |

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

## GET /auth

Responds with status `200` if authorized, otherwise responds with status `401`

### Example responses

#### Success

```json
{
  "authorized": true,
  "username": "testuser"
}
```

#### ResponseErrorMessage

```json
{
  "error": "Not Authorized"
}
```

# Roster

## GET /api/roster

Returns data of all characters in the roster

### Example Responses

#### Success - ResponseFullRoster

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
  }
]
```
