
# Development

## Getting Started

### Initial Setup

 - Setup [Atlassian SDK](https://developer.atlassian.com/docs/getting-started)
 - Clone repo to your machine
 - Execute `atlas-run` in project root
 - Install Add-on **JIRA Agile** (trial)
   * Registration might be required
 - Create an Agile Project

### Making Changes

 - First, ensure you can go to the Agile board for the project and you can see the *Bulletin Board*'s handle.
 - HACK, HACK, HACK...
 - Execute `mvn package`
   * Your IDE might have some UI around this
 - The changes should be automatically be picked up by a page refresh


## API

    BASE_URL = {HOST}/rest/bulletins/1

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
            "body": "...",
            "rendered": "...",
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
    "body": "..."
}
````

###### Response

**200**

````json
{
    "id": 1,
    "body": "...",
    "rendered": "...",
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

````json
{
    "message": "OK"
}
````

### Markdown

##### POST

###### Request

    POST {BASE_URL}/markdown

````json
{
    "markdown": "..."
}
````

###### Response

**200**

````json
{
    "html": "..."
}
````