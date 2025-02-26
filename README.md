# **LCS Ajax**
*A secure and efficient JavaScript library for handling AJAX requests with nonce-based CSRF protection.*

![LCS Ajax](https://img.shields.io/badge/version-0.0.3-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## **Table of Contents**
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Basic Usage](#basic-usage)
  - [Handling FormData (File Uploads)](#handling-formdata-file-uploads)
  - [Adding Custom Headers](#adding-custom-headers)
  - [GET Requests](#get-requests)
- [Security & CSRF Protection](#security--csrf-protection)
- [Advanced Usage](#advanced-usage)
  - [Fetching a Nonce Manually](#fetching-a-nonce-manually)
  - [Customizing the Nonce Name](#customizing-the-nonce-name)
  - [Handling API Responses](#handling-api-responses)
- [Error Handling](#error-handling)
- [API Reference](#api-reference)
- [Development & Contribution](#development--contribution)
- [License](#license)
- [Support](#support)

---

## **Introduction**
`lcs_ajax` is a lightweight JavaScript library designed for making secure AJAX requests with **nonce-based CSRF protection**. It simplifies communication between the frontend and backend while ensuring **security and flexibility**.  

Built using the **Fetch API**, `lcs_ajax` supports:
- **JSON & FormData (file uploads)**
- **Custom headers**
- **Automatic nonce retrieval for security**
- **One request at a time to prevent conflicts**
- **Easy API integration**

---

## **Features**
✅ **Secure AJAX Requests** – Includes **nonce-based CSRF protection** to prevent cross-site request forgery.  
✅ **Easy Integration** – Works seamlessly with APIs and web applications.  
✅ **Automatic Nonce Handling** – Fetches and attaches a nonce for extra security.  
✅ **Supports JSON & FormData** – Works with structured JSON data and file uploads.  
✅ **Asynchronous & Efficient** – Uses modern `async/await` with **Fetch API** for speed and reliability.  
✅ **Prevents Concurrent Requests** – Ensures that **only one AJAX request runs at a time** to avoid conflicts.  
✅ **Lightweight** – Minimal dependencies, **just pure JavaScript**.

---

## **Installation**
You can use `lcs_ajax` in your project in multiple ways.

### **1. Install via NPM**
```sh
npm install lcs_ajax
```
Then, import it in your JavaScript file:
```js
import { lcsSendAjaxRequest } from 'lcs_ajax';
```

### **2. Include via CDN**
Add the following script to your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/lcs_ajax/dist/la.min.js"></script>
```

### **3. Manually Download**
Download [`la.min.js`](https://github.com/lcsnigeria/lcs_ajax/dist/la.min.js) and include it in your project:
```html
<script src="path/to/la.min.js"></script>
```

---

## **Quick Start**
### **Basic Usage**
Sending a simple AJAX request:
```js
const requestData = { name: 'John Doe', email: 'john@example.com' };

lcsSendAjaxRequest(requestData, 'https://example.com/api', 'POST')
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
```

---

### **Handling FormData (File Uploads)**
To send **file uploads**, use `FormData`:
```js
const formData = new FormData();
formData.append('file', document.querySelector('#fileInput').files[0]);

lcsSendAjaxRequest(formData, 'https://example.com/upload', 'POST')
    .then(response => console.log('File uploaded:', response))
    .catch(error => console.error('Upload failed:', error));
```

---

### **Adding Custom Headers**
```js
const headers = { Authorization: 'Bearer my-token' };

lcsSendAjaxRequest({ data: 'test' }, 'https://example.com/secure', 'POST', headers)
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
```

---

### **GET Requests**
```js
lcsSendAjaxRequest({}, 'https://example.com/api/data', 'GET')
    .then(response => console.log('Fetched Data:', response))
    .catch(error => console.error('Fetch error:', error));
```

---

## **Security & CSRF Protection**
`lcs_ajax` automatically retrieves a **nonce** before sending a request. This prevents **CSRF attacks** by ensuring only authorized requests are executed.

**How it works:**
1. The library fetches a **nonce** from the server.
2. The **nonce** is attached to every AJAX request.
3. The server validates the **nonce** before processing the request.

By default, `lcs_ajax` looks for a **meta tag** containing the AJAX object:
```html
<meta name="lcs_ajax_object" content='{"ajaxurl": "https://example.com/api", "nonce": "secure-token"}'>
```

---

## **Advanced Usage**
### **Fetching a Nonce Manually**
You can manually fetch a **nonce** before making a request:
```js
lcsGetNonce({ nonce_name: 'lcs_ajax_nonce' }, 'https://example.com/api')
    .then(nonce => console.log('Fetched Nonce:', nonce))
    .catch(error => console.error('Nonce error:', error));
```

---

### **Customizing the Nonce Name**
You can specify a **custom nonce name**:
```js
lcsSendAjaxRequest({ data: 'test', nonce_name: 'custom_nonce' }, 'https://example.com/api', 'POST')
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
```

---

### **Handling API Responses**
The function returns a **Promise**, allowing structured error handling:
```js
lcsSendAjaxRequest({ username: 'testuser' }, 'https://example.com/login', 'POST')
    .then(response => {
        if (response.success) {
            console.log('Login successful!');
        } else {
            console.error('Login failed:', response.message);
        }
    })
    .catch(error => console.error('AJAX error:', error));
```

---

## **Error Handling**
#### **Common Errors**
| Error | Cause |
|-------|-------|
| `Network Errors` | The server is unreachable. |
| `Invalid JSON Response` | The response is not valid JSON. |
| `Failed to verify client!` | Nonce retrieval failed |
| `Request failed due to server error!` | Network/server issue |
| `Expected JSON but received: text/html` | API returned invalid response |

To handle errors properly:
```js
lcsSendAjaxRequest({ email: 'invalid' }, 'https://example.com/register', 'POST')
    .catch(error => console.error('Error:', error.message));
```

---

## **API Reference**
### **`lcsSendAjaxRequest(data, url, method, headers)`**
Sends an AJAX request.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | `Object | FormData` | `{}` | The request payload (JSON or FormData). |
| `url` | `string` | `lcs_ajax_object.ajaxurl` | The request endpoint. |
| `method` | `string` | `'POST'` | HTTP method (`GET`, `POST`, etc.). |
| `headers` | `Object` | `{}` | Additional request headers. |
| **Returns** | `Promise<Object>` | - | Resolves with the response data. |

---

## **Development & Contribution**
Want to improve `lcs_ajax`? Contributions are welcome!  

🔹 **Fork the repository**  
🔹 **Create a feature branch** (`git checkout -b feature-name`)  
🔹 **Commit changes** (`git commit -m "Add feature"`)  
🔹 **Push and create a Pull Request**  

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Support**
💬 **Found a bug or need help?** Open an issue at:  
[📌 GitHub Issues](https://github.com/lcsnigeria/lcs_ajax/issues)

📧 **Contact**: jcfuniverse@gmail.com, loadedchannelsolutions@gmail.com  