[![Build Status](https://semaphoreci.com/api/v1/mrmm/note/branches/master/badge.svg)](https://semaphoreci.com/mrmm/note)

# Note

This is a web application for keeping track of your notes

## Run

    docker-compose up

## Documentation

Well, I'm lazy, so here's how I use this with curl:

### API endpoints

If there is an error, you will get back a non-200 response code, and a JSON
object like this:

    {
      "error" : "..."  
    }

#### POST /auth/sign_up

    curl -X POST localhost:3000/auth/sign_up -d username=bob -d password=irock
    {
      "token" : "rock.paper.stick"
    }

#### POST /auth/sign_in

    curl -X POST localhost:3000/auth/sign_in -d username=bob -d password=irock
    {
      "token" : "rock.paper.stick"
    }

#### GET /note

_returns all notes belonging to you_

    curl -X GET localhost:3000/note -H "Bearer: $token"
    [
      {
        "_index" : "notes",
        "_type" : "note",
        "_id" : "AVqpz0I394F1ANZzyHP6",
        "_score" : 0.2876821,
        "_source" : {
          "title" : "Testing",
          "body" : "Testing",
          "username" : "bob"
        }
      }
    ]

#### POST /note

_create a new note_

    curl -X POST localhost:3000/note -H "Bearer: $token" -d title='...' -d body='...'
    {
      "ok" : "New post created"
    }

#### PUT /note/:id

_update a note, requires you to send in both title and body_

    curl -X PUT "localhost:3000/note/$id" -H "Bearer: $token" -d title='...' -d body='...'
    {
      "ok" : "Note was edited"
    }

#### DELETE /note/:id

_delete a note_

    curl -X DELETE "localhost:3000/note/$id" -H "Bearer $token"
    {
      "ok" : "Note was deleted"  
    }

#### GET /note/:id

_get a note_

    curl -X GET "localhost:3000/note/$id" -H "Bearer: $token"
    [
      {
          "_id" : "AVqpz0I394F1ANZzyHP6",
          "_score" : 1,
          "_index" : "notes",
          "_type" : "note",
          "_source" : {
            "title" : "Testing",
            "username" : "bob",
            "body" : "Testing"
          }
      }
    ]

#### GET /note/search?query=

_get all notes containing the query in either title or body_

    curl -X GET "localhost:3000/note/search?query=$query" -H "Bearer: $token"
    [
      {
          "_source" : {
            "body" : "Testing",
            "title" : "Testing",
            "username" : "bob"
          },
          "_index" : "notes",
          "_id" : "AVqpz0I394F1ANZzyHP6",
          "_type" : "note",
          "_score" : 0.8630463
      }
    ]
