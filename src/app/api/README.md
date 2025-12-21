# API Documentation

## Overview

This document provides detailed information about the API endpoints for the MystryMsg application.

## Authentication & Security

Most routes require user authentication via a session token managed by NextAuth.js. Authenticated routes will return a `401 Unauthorized` status code if the session token is missing or invalid.

Specific security measures, such as rate limiting, are detailed in the documentation for each route.

## Routes

### Authentication

#### User Registration

-   **Method**: `POST`
-   **Endpoint**: `/api/sign-up`
-   **Purpose**: To register a new user in the system. A verification code is sent to the user's email upon successful registration.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "username": "john-doe",
      "email": "john.doe@example.com",
      "password": "strongpassword123"
    }
    ```
    -   `username`: A unique identifier for the user.
    -   `email`: The user's email address.
    -   `password`: The user's password.
-   **Response**:
    -   **Success (201)**:
        ```json
        {
          "success": true,
          "message": "User Registered Successfully and Verification Email sent"
        }
        ```
    -   **Error (400)**: Bad Request. The request body is missing required fields or the username/email is already taken.
    -   **Error (500)**: Internal Server Error. An error occurred while registering the user or sending the verification email.
-   **Security Notes**:
    -   This endpoint checks for existing verified users to prevent username and email duplication.
    -   If an unverified user with the same email exists, it updates the user's details and sends a new verification code.

#### Verify User

-   **Method**: `POST`
-   **Endpoint**: `/api/verify-code`
-   **Purpose**: To verify a user's account using the verification code sent to their email.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "username": "john-doe",
      "email": "john.doe@example.com",
      "verifyCode": "123456"
    }
    ```
    -   `username`: The username of the user to verify.
    -   `email`: The email of the user to verify.
    -   `verifyCode`: The 6-digit verification code.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "User Verified Successfully"
        }
        ```
    -   **Error (400)**: Bad Request. The verification code has expired.
    -   **Error (401)**: Unauthorized. The verification code is incorrect.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (429)**: Too Many Requests. The user has made too many verification attempts. The `Retry-After` header indicates when to try again.
    -   **Error (500)**: Internal Server Error.
-   **Security Notes**:
    -   This endpoint is rate-limited to prevent brute-force attacks on the verification code.
    -   The verification code expires after a certain period (e.g., 1 hour).

#### Forgot Password

-   **Method**: `POST`
-   **Endpoint**: `/api/forgot-password/send-verification-link`
-   **Purpose**: To initiate the password reset process by sending a reset link to the user's email.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "rawIdentifier": "john-doe"
    }
    ```
    -   `rawIdentifier`: The username or email of the user.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Reset Password Request Successfully, if the user exists"
        }
        ```
    -   **Error (400)**: Bad Request. The request body is invalid.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.
-   **Security Notes**:
    -   To prevent user enumeration, the endpoint returns a success message even if the user does not exist.
    -   The reset token sent to the user's email is time-limited (e.g., 1 hour).

#### Reset Password

-   **Method**: `POST`
-   **Endpoint**: `/api/reset-password/{username}`
-   **Purpose**: To reset the user's password using a valid reset token.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "newPassword": "newstrongpassword123"
    }
    ```
    -   `newPassword`: The new password for the user.
-   **Query Parameters**:
    -   `token`: The password reset token received via email.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Password reset successfully"
        }
        ```
    -   **Error (400)**: Bad Request. The new password is invalid, or the reset token is invalid or expired.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.
-   **Security Notes**:
    -   The reset token is single-use and expires after a short period.
    -   The user is required to provide their username in the URL, and the token is validated against the user.

### User

#### Get Current User

-   **Method**: `GET`
-   **Endpoint**: `/api/me`
-   **Purpose**: To retrieve the details of the currently authenticated user.
-   **Authentication**: Required (session token).
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "User found",
          "user": {
            "username": "john-doe",
            "email": "john.doe@example.com",
            "isVerified": true,
            "isAcceptingMessages": true
          }
        }
        ```
    -   **Error (401)**: Unauthorized. The user is not authenticated.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.

#### Get User Profile

-   **Method**: `GET`
-   **Endpoint**: `/api/user-profile/{username}`
-   **Purpose**: To retrieve the public profile of a user.
-   **Authentication**: Not required.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "User found",
          "user": {
            "username": "jane-doe",
            "isVerified": true,
            "isAcceptingMessages": true
          }
        }
        ```
    -   **Error (400)**: Bad Request. The username is invalid.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.

#### Check Username Uniqueness

-   **Method**: `GET`
-   **Endpoint**: `/api/check-username-unique`
-   **Purpose**: To check if a username is available.
-   **Authentication**: Not required.
-   **Query Parameters**:
    -   `username`: The username to check.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Username Available"
        }
        ```
    -   **Error (400)**: Bad Request. The username is invalid or already taken.
    -   **Error (429)**: Too Many Requests.
    -   **Error (500)**: Internal Server Error.
-   **Security Notes**:
    -   This endpoint is rate-limited.

#### Change Password

-   **Method**: `POST`
-   **Endpoint**: `/api/change-password/{username}`
-   **Purpose**: To change the password for the authenticated user.
-   **Authentication**: Required (session token). The username in the URL must match the authenticated user.
-   **Request Body**:
    ```json
    {
      "oldPassword": "oldstrongpassword123",
      "newPassword": "newstrongpassword456"
    }
    ```
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Password updated Successfully"
        }
        ```
    -   **Error (400)**: Bad Request. The request body is invalid.
    -   **Error (401)**: Unauthorized. The old password is incorrect or the user is not authenticated.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.

### Messages

#### Get Messages

-   **Method**: `GET`
-   **Endpoint**: `/api/get-messages`
-   **Purpose**: To retrieve all messages for the authenticated user.
-   **Authentication**: Required (session token).
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Fetched messages successfully",
          "messages": [
            {
              "content": "This is a test message.",
              "createdAt": "2023-10-27T10:00:00Z"
            }
          ]
        }
        ```
    -   **Error (401)**: Unauthorized. The user is not authenticated.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.

#### Send Message

-   **Method**: `POST`
-   **Endpoint**: `/api/send-message`
-   **Purpose**: To send a message to a user.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "username": "john-doe",
      "content": "This is a test message."
    }
    ```
    -   `username`: The username of the recipient.
    -   `content`: The content of the message.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Message Sent Successfully"
        }
        ```
    -   **Error (400)**: Bad Request. The request body is invalid.
    -   **Error (403)**: Forbidden. The user is not accepting messages.
    -   **Error (429)**: Too Many Requests. The sender has sent too many messages.
    -   **Error (500)**: Internal Server Error.
-   **Security Notes**:
    -   This endpoint is rate-limited by the sender's IP address or user ID to prevent spam.

#### Delete Message

-   **Method**: `DELETE`
-   **Endpoint**: `/api/delete-message/{message_id}`
-   **Purpose**: To delete a specific message for the authenticated user.
-   **Authentication**: Required (session token).
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Message Deleted successfully"
        }
        ```
    -   **Error (400)**: Bad Request. The message ID is invalid.
    -   **Error (401)**: Unauthorized. The user is not authenticated.
    -   **Error (404)**: Not Found. The message was not found or has already been deleted.
    -   **Error (500)**: Internal Server Error.

#### Toggle Message Acceptance

-   **Method**: `POST`, `GET`
-   **Endpoint**: `/api/accept-messages`
-   **Purpose**:
    -   `POST`: To enable or disable accepting messages for the authenticated user.
    -   `GET`: To check if the authenticated user is currently accepting messages.
-   **Authentication**: Required (session token).
-   **Request Body (POST only)**:
    ```json
    {
      "acceptMessages": true
    }
    ```
    -   `acceptMessages`: A boolean value to set the message acceptance status.
-   **Response (POST)**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Status Updated Successfully",
          "user": { ... }
        }
        ```
    -   **Error (400)**: Bad Request. The request body is invalid.
    -   **Error (401)**: Unauthorized. The user is not authenticated.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.
-   **Response (GET)**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Status Returning Successfully",
          "user": { ... },
          "isAcceptingMessage": true
        }
        ```
    -   **Error (401)**: Unauthorized. The user is not authenticated.
    -   **Error (404)**: Not Found. The user was not found.
    -   **Error (500)**: Internal Server Error.

#### Suggest Messages

-   **Method**: `POST`
-   **Endpoint**: `/api/suggest-messages`
-   **Purpose**: To generate anonymous message suggestions using AI.
-   **Authentication**: Not required.
-   **Request Body**:
    ```json
    {
      "description": "A topic for the message suggestions"
    }
    ```
    -   `description` (optional): A string to provide context for the AI to generate more relevant suggestions.
-   **Response**:
    -   **Success (200)**:
        ```json
        {
          "success": true,
          "message": "Fetched the fresh Messages Sussessfully",
          "suggestions": {
            "suggestion_1": "Suggestion 1",
            "suggestion_2": "Suggestion 2",
            "suggestion_3": "Suggestion 3"
          }
        }
        ```
    -   **Error (429)**: Too Many Requests.
    -   **Error (500)**: Internal Server Error (AI service).
-   **Security Notes**:
    -   This endpoint is rate-limited.

### Image Generation

#### OG Image for User Profile

-   **Method**: `GET`
-   **Endpoint**: `/api/og/user`
-   **Purpose**: To generate an Open Graph (OG) image for a user's profile page, suitable for social media sharing.
-   **Authentication**: Not required.
-   **Query Parameters**:
    -   `username`: The username of the user for whom to generate the image.
-   **Response**:
    -   **Success (200)**: An image (`image/png`) of size 1200x630.
    -   **Error (500)**: A text response indicating failure to generate the image.
-   **Notes**:
    -   This endpoint returns an image, not JSON. It is intended to be used in the `og:image` meta tag of a user's profile page.
    -   If the username is not provided or invalid, a default image with the username "someone" will be generated.
