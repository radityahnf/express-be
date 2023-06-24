# API Documentation

## Get All Cities

- Method: GET
- URL: `/cities`
- Description: Retrieve all cities.
- Response Status: 
    - On Success: 200
    - On Error: 500
- Response Body (JSON Array):
  ```json
  [
    {
        id: ObjectID,
        name: string
    },
    {
        id: ObjectID,
        name: string
    }
    ....
  ]

## Get All Users

- Method: GET
- URL:
  - `/users/all?page={page}&limit={limit}`
  - OR
  - `/users/all`
- Description: Retrieve all users. If no page and limit are provided, default values will be used.
- Parameters:
  - `page`: The page number (default: 1)
  - `limit`: The number of users per page (default: 5)
- Response Status:
  - On Success: 200
  - On Error: 500
- Response Body (JSON Array):
  ```json
  [
    {
      "id": "ObjectID",
      "email": "string",
      "profile": {
        "name": "string",
        "city": {
          "id": "ObjectID",
          "name": "string"
        }
      },
      "last_login": "Y-m-d datetime",
      "created_at": "Y-m-d datetime",
      "updated_at": "Y-m-d datetime"
    },
    {
      "id": "ObjectID",
      "email": "string",
      "profile": {
        "name": "string",
        "city": {
          "id": "ObjectID",
          "name": "string"
        }
      },
      "last_login": "Y-m-d datetime",
      "created_at": "Y-m-d datetime",
      "updated_at": "Y-m-d datetime"
    },
    ...
  ]

## Get User by Id

- Method: GET
- URL: `/users/{userId}`
- Description: Retrieve a user by their ID.
- Parameters:
    - userId: The ID of the user  
- Response Status: 
    - On Success: 200
    - On Error: 404  

## Register User

- Method: POST
- URL: `/register`
- Description: Registers a new user with valid information.
- Request Body:
  ```json
  {
  "email": string, is well formatted email
  "password": string, | match confirm_password
  "confirm_password": string | match password,
  "name" : string,
  "address": string,
  "cityId":string, exist on collection city
  "hobbies": array of string
  } 
    ```
- Response Status: 
    - On Success: 201
    - On Error: 403
- Response Body:
    - On Error: 
        ```json
        {
        "email": "email tidak valid" || "email sudah digunakan",
        "password": "password tidak valid",
        "confirm_password": "confirm password tidak valid",
        "password_equal": "password dan confirm_password harus sama",
        "name" : "nama tidak valid",
        "address": "address tidak valid",
        "cityId": "cityId tidak valid",
        "hobbies": "hobbies tidak valid"
        }
        ```

## Login

- Method: POST
- URL: `/login`
- Description: Authenticates a user with valid credentials.
- Request Body:
  ```json
  {
  "email": string, non well-formatted email,
  "password": string
  }
    ```
- Response Status: 
    - On Success: 200
    - On Error: 401
- Response Body:
    - On Success: 
        ```json
        {
            id: ObjectID,
            email: string,
            profile: {
                name: string,
                address: string,
                city: {
                id: ObjectID,
                name: string
                },
                hobbies: [array of string]
            },
            last_login: Y-m-d datetime,
            created_at: Y-m-d datetime,
            updated_at: Y-m-d datetime
        }
        ```

## Delete User by Id

- Method: DELETE
- URL: `/users/{userId}`
- Description: Delete a user by their ID.
- Parameters:
    - userId: The ID of the user to be deleted
- Response Status: 
    - On Success: 201
    - On Error: 404  

## Change Currently Logged In User's Password

- Method: PATCH
- URL: `/users/current`
- Description: Change the password of the currently logged-in user.
- Request Body:
  ```json
  {
  "current_password": string | match current password,
  "new_password": string | match confirm_new_password,
  "confirm_new_password" : string | match password,
  }
    ```
- Response Status: 
    - On Success: 201
    - On Error: 403
- Response Body:
    - On Error: 
        ```json
        {
        "current_password   ": "format current_password tidak valid",
        "new_password  ": "format new_password tidak valid",
        "confirm_new_password  ": "format confirm_new_password tidak valid",
        "check_equality_current_password ": "current_password salah",
        "check_equality_new_password " : "new_password dan confirm_new_password harus sama",
        }
        ```
