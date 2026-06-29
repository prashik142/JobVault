const API = "http://localhost:5000/auth";

async function login(email, password) {

    const res = await fetch(`${API}/login`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email,
            password

        })

    });

    return await res.json();

}