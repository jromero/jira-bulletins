

## API

`BASE_URL` = `{HOST}/jira/rest/bulletin/1`

### Bulletins

##### GET

###### Request

    GET {BASE_URL}/boards/{PROJECT_KEY}/bulletins

###### Response

**200**

````json
{
    "count": 100,
    "totalCount": 100,
    "bulletins": [
        {
            "id": 1,
            "title": "...",
            "body": "...",
            "createdBy": "",
            "createdAt": 1464542825266,
            "updatedAt": 1464542825266
        }
    ]
}
````

##### POST

###### Request

    POST {BASE_URL}/boards/{PROJECT_KEY}/bulletins

````json
{
    "title": "...",
    "body": "..."
}
````

###### Response

**200**

````json
{
    "id": 1,
    "title": "...",
    "body": "...",
    "createdBy": "",
    "createdAt": 1464542825266,
    "updatedAt": 1464542825266
}
````

##### DELETE

###### Request

    DELETE {BASE_URL}/boards/{PROJECT_KEY}/bulletins/{ID}

###### Response

**200**

_Empty Body_