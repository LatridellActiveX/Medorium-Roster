# Auth

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

<br>

## POST /auth/login

Sends authToken cookie

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   ?    |   ?    |
| password |   Yes    | string |   ?    |   ?    |

<br>

## GET /auth

Responds with 200 if authorized, otherwise responds with 401

<br>
