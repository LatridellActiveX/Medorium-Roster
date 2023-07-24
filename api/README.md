# Auth

<br>

## POST /auth/register/:accessCode

Registers user if name is not in use

(and the accessCode is valid)

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   ?    |   ?    |
| password |   Yes    | string |   ?    |   ?    |

### Params

`Note: accessCode is not implemented yet`

|   Field    | Required |  Type  | minLen | maxLen |
| :--------: | :------: | :----: | :----: | :----: |
| accessCode |    No    | string |   ?    |   ?    |

<br>

## POST /auth/login

Returns authentication token (hardcoded at the moment)

(Could also send it as a cookie)

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   ?    |   ?    |
| password |   Yes    | string |   ?    |   ?    |

<br>
