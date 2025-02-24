

const lcs_ajax_object_meta = document.querySelector('meta[name="lcs_ajax_object"]'); // Get the AJAX object meta tag.
const lcs_ajax_object = lcs_ajax_object_meta ? JSON.parse(lcs_ajax_object_meta.content) : {}; // Parse the AJAX object from the meta tag.
let isRunningAjax = false; // A flag to ensure only one AJAX request runs at a time.

/**
 * Sends an AJAX request with JSON data or FormData for file uploads.
 *
 * This function prevents multiple concurrent AJAX requests by checking the `isRunningAjax` flag. 
 * It supports both JSON data and FormData (for file uploads), automatically managing headers 
 * and ensuring secure communication with the server using a nonce (if applicable).
 * 
 * The function dynamically detects whether `data` is a plain object or `FormData`, 
 * applying the appropriate `Content-Type` header. If a nonce is provided in `lcs_ajax_object`, 
 * it is included in the request for security.
 *
 * @param {Record<string, any> | FormData} data - The data to send in the request body. Use `FormData` for file uploads.
 * @param {string} [url=lcs_ajax_object.ajaxurl || ''] - The request URL. Defaults to the AJAX endpoint from `lcs_ajax_object.ajaxurl`, if available.
 * @param {string} [method='POST'] - The HTTP method to use (e.g., 'GET', 'POST'). Defaults to 'POST'.
 * @param {Record<string, string>} [headers={}] - Additional headers to include, merged with default headers based on the data type.
 * @returns {Promise<Record<string, any>>} - A promise that resolves with the response data (JSON object) or rejects with an error message.
 */
async function lcsSendAjaxRequest(data, url = lcs_ajax_object.ajaxurl || '', method = 'POST', headers = {}) {
    return new Promise(async (resolve, reject) => {
        /**
         * Ensure only one AJAX request runs at a time.
         * If another request is already running (`isRunningAjax` is true), wait until it finishes.
         */
        while (isRunningAjax) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        isRunningAjax = true; // Block further requests until the current one is finished.

        method = method.toUpperCase(); // Normalize the HTTP method to uppercase.
        const isFormData = data instanceof FormData; // Check if the data is FormData (for file uploads).

        /**
         * Set default headers:
         * - For JSON data: Set 'Content-Type' to 'application/json' and 'X-Requested-With' to 'XMLHttpRequest'.
         * - For FormData: Skip 'Content-Type' since it is automatically handled by the browser.
         */
        const defaultHeaders = isFormData
            ? { 'X-Requested-With': 'XMLHttpRequest' }
            : {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            };

        // Merge user-specified headers with the default headers.
        const requestHeaders = {
            ...defaultHeaders,
            ...headers
        };

        /**
         * Attach a nonce for security verification if required.
         * The nonce is added to the request to prevent CSRF attacks.
         * If nonce retrieval fails, the request is aborted.
         */
        if (data.security !== false && data.nonce !== false) {
            try {
                const nonce = await lcsGetNonce();
                if (isFormData) {
                    data.append('security', nonce); // Append nonce for FormData.
                    data.append('nonce_is_settled', true);
                } else {
                    data.security = nonce; // Add nonce for JSON data.
                    data.nonce_is_settled = true;
                }
            } catch (error) {
                if (isFormData) {
                    if (!data.has('nonce_is_settled')) {
                        data.append('nonce_is_settled', false);
                    }
                } else {
                    if (!data.hasOwnProperty('nonce_is_settled')) {
                        data.nonce_is_settled = false;
                    }
                }  
                console.error("Error occurred while fetching nonce:", error.message);
                isRunningAjax = false; // Reset flag
                return reject(new Error("Failed to fetch nonce, aborting request."));
            }
        }

        /**
         * Prepare the fetch request options:
         * - Headers are skipped for FormData since it is handled by the browser automatically.
         * - If the method is 'GET', no body is included.
         */
        const options = {
            method,
            headers: isFormData ? undefined : requestHeaders,
            body: method === 'GET' ? undefined : isFormData ? data : JSON.stringify(data)
        };

        try {
            // Perform the AJAX request using the Fetch API.
            const response = await fetch(url, options);

            // Validate if the response is JSON.
            const contentType = response.headers.get('Content-Type') || '';
            if (!contentType.includes('application/json')) {
                const textResponse = await response.text();
                throw new Error(`Expected JSON but received: ${contentType}. Response: ${textResponse}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            resolve(responseData);
        } catch (error) {
            console.error('Request failed:', error);
            reject(new Error('Request failed due to server error!'));
        } finally {
            isRunningAjax = false; // Ensure the flag is reset, even if an error occurs.
        }
    });
}


/**
 * Fetches a nonce from the server for AJAX requests.
 * 
 * The function sends a request to the server to fetch a nonce, which can be used for 
 * securing AJAX requests. The nonce is stored in a global object and returned once fetched.
 * 
 * @param {string} nonceName The name of the nonce to fetch. Defaults to 'lcs_ajax_nonce'.
 * @returns {Promise<string>} A Promise that resolves with the fetched nonce string.
 * @throws {Error} Throws an error if the request fails or the server responds with an error.
 */
async function lcsGetNonce(nonceName = 'lcs_ajax_nonce') {
    // Return a new Promise to handle asynchronous behavior
    return new Promise((resolve, reject) => {
        const url = lcs_ajax_object.ajaxurl; // Use the default AJAX endpoint.

        /**
         * Define the request payload for fetching the nonce.
         */
        const requestData = {
            nonce_name: nonceName // Specify the nonce name.
        };

        // Make the request using the Fetch API
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest' // Standard header for AJAX requests
            },
            body: JSON.stringify(requestData) // Send the request data as JSON
        })
        .then((response) => {
            // Parse the response JSON once the request is successful
            response.json().then((responseData) => {
                if (!response.ok) {
                    // Reject the promise if the server responded with an error status
                    reject(new Error(`Nonce fetch failed with status: ${response.status}`));
                }

                // Update the global nonce object with the fetched nonce
                lcs_ajax_object.nonce = responseData.data;

                // Resolve the promise with the fetched nonce
                resolve(lcs_ajax_object.nonce);
            });
        })
        .catch((error) => {
            // Reject the promise if there was a network error or fetch failure
            reject(new Error(`Nonce request failed: ${error.message}`));
        });
    });
}