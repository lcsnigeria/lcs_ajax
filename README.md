# **LCS Ajax**  
*A secure and efficient JavaScript library for handling AJAX requests with nonce-based CSRF protection.*

![LCS Ajax](https://img.shields.io/badge/version-0.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## **Table of Contents**
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Handling FormData](#handling-formdata)
  - [Adding Custom Headers](#adding-custom-headers)
  - [GET Requests](#get-requests)
- [Security & CSRF Protection](#security--csrf-protection)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [License](#license)
- [Contributing](#contributing)
- [Support](#support)

---

## **Introduction**
`lcs_ajax` is a lightweight JavaScript library designed for making secure AJAX requests with **nonce-based CSRF protection**. It simplifies communication between the frontend and backend while ensuring **security and flexibility**.  

Built using the **Fetch API**, `lcs_ajax` supports **JSON and FormData**, integrates seamlessly with APIs, and ensures **one request at a time** to prevent conflicts.  

---

## **Features**
✅ **CSRF Protection** – Uses **nonce tokens** for secure communication.  
✅ **Supports JSON & FormData** – Easily handles **both structured and file uploads**.  
✅ **One-Request Policy** – Ensures **only one request runs at a time** for efficiency.  
✅ **Custom Headers** – Allows adding extra **authentication or custom headers**.  
✅ **Promise-based** – Fully **asynchronous and easy to work with `.then()` and `async/await`**.  
✅ **Minimal & Fast** – **Lightweight** library optimized for performance.  

---

## **Installation**
You can include `lcs_ajax` in your project using **npm** or directly via a CDN.  

### **Using npm**
```sh
npm install lcs_ajax
```

### **Using CDN (Direct Include)**
```html
<script src="https://cdn.jsdelivr.net/npm/lcs_ajax/dist/la.min.js"></script>
```

---

## **Usage**
`lcs_ajax` simplifies AJAX requests using a **single function**:  

```js
lcsSendAjaxRequest(data, url, method, headers);
```

### **Basic Usage**
```js
const data = { action: 'get_user', user_id: 123 };
const url = 'https://example.com/api/user';

lcsSendAjaxRequest(data, url)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

---

### **Handling FormData**
To **upload files**, simply pass a `FormData` object:

```js
const formData = new FormData();
formData.append('action', 'upload_file');
formData.append('file', fileInput.files[0]);

lcsSendAjaxRequest(formData, 'https://example.com/api/upload')
    .then(response => console.log('Upload Successful:', response))
    .catch(error => console.error('Upload Failed:', error));
```

---

### **Adding Custom Headers**
You can **pass custom headers** like authentication tokens:

```js
const headers = { Authorization: 'Bearer YOUR_ACCESS_TOKEN' };
lcsSendAjaxRequest({ action: 'get_data' }, 'https://example.com/api/data', 'POST', headers)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

---

### **GET Requests**
For **GET requests**, simply pass `'GET'` as the method:

```js
lcsSendAjaxRequest({}, 'https://example.com/api/posts', 'GET')
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

---

## **Security & CSRF Protection**
🔒 `lcs_ajax` **automatically** attaches a nonce to every request to prevent CSRF attacks.  

- **Nonce Fetching**: The function calls `lcsGetNonce()` to retrieve a fresh token.  
- **Automatic Injection**: The nonce is added to the request (`data.security = nonce`).  
- **Prevents Unauthorized Access**: If nonce retrieval fails, the request is rejected.

🔹 **Handling Nonce Failures**
If nonce verification fails, you’ll receive:
```json
{ "success": false, "data": "Failed to verify client!" }
```

---

## **API Reference**
### **`lcsSendAjaxRequest(data, url, method, headers)`**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | `Object | FormData` | `{}` | Request payload (JSON or FormData) |
| `url` | `String` | `lcs_ajax_object.ajaxurl` | API endpoint |
| `method` | `String` | `'POST'` | HTTP method (`GET`, `POST`, etc.) |
| `headers` | `Object` | `{}` | Custom request headers |

#### **Returns**
A `Promise` resolving to the **response JSON**.

---

## **Error Handling**
If a request fails, `lcs_ajax` **rejects** the Promise with an error message.  

### **Example**
```js
lcsSendAjaxRequest({ action: 'get_posts' }, 'https://example.com/api/posts')
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error.message));
```

#### **Common Errors**
| Error | Cause |
|-------|-------|
| `Failed to verify client!` | Nonce retrieval failed |
| `Request failed due to server error!` | Network/server issue |
| `Expected JSON but received: text/html` | API returned invalid response |

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Contributing**
Want to improve `lcs_ajax`? Contributions are welcome!  

🔹 **Fork the repository**  
🔹 **Create a feature branch** (`git checkout -b feature-name`)  
🔹 **Commit changes** (`git commit -m "Add feature"`)  
🔹 **Push and create a Pull Request**  

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## **Support**
💬 **Found a bug or need help?** Open an issue at:  
[📌 GitHub Issues](https://github.com/lcsnigeria/lcs_ajax/issues)

📧 **Contact**: jcfuniverse@gmail.com  

---

🚀 **LCS Ajax: Secure AJAX Requests Made Simple!** 🚀  