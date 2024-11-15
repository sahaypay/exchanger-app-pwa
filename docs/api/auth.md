# Authentication APIs Documentation

## 1. User Authentication

**Endpoint**: `/api/v1/auth/login`  
**Method**: `POST`  
**Description**: Authenticate user with email and password

### Request body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response: (200 OK)

```json
{
  "success": true,
  "userId": "user_id_here",
  "email": "user@example.com",
  "name": "User Name",
  "role": "user",
  "requires2FA": true
}
```

### Error Response: (401 Unauthorized)

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## 2. Check User Exists

**Endpoint**: `/api/v1/auth/verify-email`  
**Method**: `POST`  
**Description**: Check if user exists (for forgot password flow)

### Request body:

```json
{
  "email": "user@example.com"
}
```

### Success Response: (200 OK)

```json
{
  "exists": true
}
```

---

## 3. Update Password

**Endpoint**: `/api/v1/auth/password`  
**Method**: `PUT`  
**Description**: Update user password

### Request body:

```json
{
  "userId": "user_id_here",
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

### Success Response: (200 OK)

```json
{
  "success": true
}
```

### Error Response: (400 Bad Request)

```json
{
  "success": false,
  "error": "Invalid current password"
}
```

---

## 4. Verify Two-Factor Authentication

**Endpoint**: `/api/v1/auth/2fa/verify`  
**Method**: `POST`  
**Description**: Verify 2FA code

### Request body:

```json
{
  "userId": "user_id_here",
  "code": "123456"
}
```

### Success Response: (200 OK)

```json
{
  "success": true
}
```

### Error Response: (400 Bad Request)

```json
{
  "success": false,
  "error": "Invalid code"
}
```

---

## 5. Resend OTP

**Endpoint**: `/api/v1/auth/2fa/resend`  
**Method**: `POST`  
**Description**: Resend OTP to user

### Request body:

```json
{
  "userId": "user_id_here"
}
```

### Success Response: (200 OK)

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Error Response: (429 Too Many Requests)

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

---

### Notes:

- All responses should include proper error messages for validation failures.
- User ID will be provided by the frontend in necessary endpoints.
