console.log("✅ Background Service Worker Loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action !== "apiRequest") return;

    chrome.storage.local.get(["token"], async (result) => {

        const token = result.token;

        if (!token) {

            sendResponse({
                success: false,
                message: "NOT_LOGGED_IN"
            });

            return;
        }

        try {

            console.log("Sending request:", request.url);

            const res = await fetch(request.url, {

                method: request.method,

                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },

                body: request.body
                    ? JSON.stringify(request.body)
                    : undefined

            });

            console.log("HTTP Status:", res.status);

            const text = await res.text();

            console.log("Raw Response:", text);

            let data = {};

            try {

                data = JSON.parse(text);

            } catch (e) {

                console.error("JSON Parse Error:", e);

            }

            sendResponse({

                success: res.ok,

                status: res.status,

                data

            });

        }

        catch (err) {

            console.error("BACKGROUND ERROR:", err);

            sendResponse({

                success: false,

                message: err.message

            });

        }

    });

    return true;

});