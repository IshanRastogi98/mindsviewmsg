## API Route: `/api/accept-messages`

**HTTP Methods:** `POST`, `GET`

**Purpose:**

*   `POST`: Updates the user's message acceptance status.
*   `GET`: Retrieves the user's message acceptance status.

**Request Details:**

*   **Authentication:** Required (uses `next-auth` session).
*   **POST Request Body:**
    ```json
    {
      "acceptMessages": true
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **POST Success Response:**
    ```json
    {
      "success": true,
      "message": "Status Updated Successfully",
      "user": {
        
      }
    }
    ```
*   **GET Success Response:**
    ```json
    {
      "success": true,
      "message": "Status Returning Successfully",
      "user": {
        
      },
      "isAcceptingMessage": true
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `401 Unauthorized`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/auth/[...nextauth]`

**HTTP Methods:** `GET`, `POST`

**Purpose:**

Handles all authentication-related requests for NextAuth.js, including sign-in, sign-out, session management, and callbacks. This route is managed by the NextAuth.js library.

**Request Details:**

*   **Authentication:** This is the authentication endpoint itself.
*   **Request Body:** The request body and query parameters are determined by the specific NextAuth.js flow being used (e.g., OAuth, Credentials).

**Response Details:**

*   **Content-Type:** `application/json` / `text/html` (depending on the flow)
*   **Response:** The response is managed by NextAuth.js and will vary depending on the authentication action being performed.

**Status Codes:**

The status codes are managed by NextAuth.js and will vary depending on the authentication action.

---

## API Route: `/api/check-username-unique`

**HTTP Methods:** `GET`

**Purpose:**

*   `GET`: Checks if a username is unique and available.

**Request Details:**

*   **Authentication:** Not strictly required, but uses session user ID or IP for rate limiting.
*   **Query Parameters:**
    *   `username`: The username to check.

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Username Available"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `429 Too Many Requests`
*   `500 Internal Server Error`

---

## API Route: `/api/delete-message/[message_id]`

**HTTP Methods:** `DELETE`

**Purpose:**

*   `DELETE`: Deletes a specific message from a user's message list.

**Request Details:**

*   **Authentication:** Required (uses `next-auth` session).
*   **URL Parameters:**
    *   `message_id`: The ID of the message to be deleted.

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Message Deleted successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `401 Unauthorized`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/get-messages`

**HTTP Methods:** `GET`

**Purpose:**

*   `GET`: Retrieves all messages for the authenticated user.

**Request Details:**

*   **Authentication:** Required (uses `next-auth` session).

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Fetched messages successfully",
      "messages": [
        {
          "_id": "message_id",
          "content": "message content",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `401 Unauthorized`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/send-message`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Sends a message to a user.

**Request Details:**

*   **Authentication:** Not strictly required, but uses session user ID or IP for rate limiting.
*   **Request Body:**
    ```json
    {
      "username": "recipient_username",
      "content": "message_content"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Message Sent Successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `403 Forbidden`
*   `429 Too Many Requests`
*   `500 Internal Server Error`

---

## API Route: `/api/sign-up`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Registers a new user and sends a verification email.

**Request Details:**

*   **Authentication:** None
*   **Request Body:**
    ```json
    {
      "username": "new_username",
      "email": "user@example.com",
      "password": "strong_password"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "User Registered Successfully and Verification Email sent"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `201 Created`
*   `400 Bad Request`
*   `500 Internal Server Error`

---

## API Route: `/api/suggest-messages`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Generates three anonymous message suggestions based on an optional description.

**Request Details:**

*   **Authentication:** Not strictly required, but uses session user ID or IP for rate limiting.
*   **Request Body:**
    ```json
    {
      "description": "Optional user description"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Fetched the fresh Messages Sussessfully",
      "suggestions": {
        "message1": "Suggestion 1",
        "message2": "Suggestion 2",
        "message3": "Suggestion 3"
      }
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `429 Too Many Requests`
*   `500 Internal Server Error`

---

## API Route: `/api/verify-code`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Verifies a user's account using a verification code.

**Request Details:**

*   **Authentication:** None
*   **Request Body:**
    ```json
    {
      "username": "user_to_verify",
      "verifyCode": "123456",
      "email": "user@example.com"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "User Verified Successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `401 Unauthorized`
*   `404 Not Found`
*   `429 Too Many Requests`
*   `500 Internal Server Error`

---

## API Route: `/api/change-password`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Changes the password for the authenticated user.

**Request Details:**

*   **Authentication:** Required (uses `next-auth` session).
*   **Request Body:**
    ```json
    {
      "oldPassword": "current_password",
      "newPassword": "new_strong_password"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Password changed successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `401 Unauthorized`
*   `500 Internal Server Error`

---

## API Route: `/api/forgot-password`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Sends a password reset email to the user.

**Request Details:**

*   **Authentication:** None
*   **Request Body:**
    ```json
    {
      "email": "user@example.com"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Password reset email sent successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/me`

**HTTP Methods:** `GET`

**Purpose:**

*   `GET`: Retrieves the profile of the authenticated user.

**Request Details:**

*   **Authentication:** Required (uses `next-auth` session).

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "User profile retrieved successfully",
      "user": {
        "_id": "user_id",
        "username": "user_username",
        "email": "user@example.com",
        "isVerified": true,
        "isAcceptingMessages": true
      }
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `401 Unauthorized`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/og`

**HTTP Methods:** `GET`

**Purpose:**

*   `GET`: Generates an Open Graph (OG) image for a user's profile.

**Request Details:**

*   **Authentication:** None
*   **Query Parameters:**
    *   `username`: The username for which to generate the OG image.

**Response Details:**

*   **Content-Type:** `image/png`
*   **Success Response:** An image representing the user's profile.
*   **Error Response:** An error message or a default image.

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `404 Not Found`
*   `500 Internal Server Error`

---

## API Route: `/api/reset-password`

**HTTP Methods:** `POST`

**Purpose:**

*   `POST`: Resets the user's password using a verification code.

**Request Details:**

*   **Authentication:** None
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "newPassword": "new_strong_password",
      "verifyCode": "123456"
    }
    ```

**Response Details:**

*   **Content-Type:** `application/json`
*   **Success Response:**
    ```json
    {
      "success": true,
      "message": "Password reset successfully"
    }
    ```
*   **Error Response:**
    ```json
    {
      "success": false,
      "message": "Error message"
    }
    ```

**Status Codes:**

*   `200 OK`
*   `400 Bad Request`
*   `404 Not Found`
*   `500 Internal Server Error`