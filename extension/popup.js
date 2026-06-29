const app = document.getElementById("app");

init();

async function init() {

    chrome.storage.local.get(["token", "user"], (data) => {

        if (data.token) {

            showHome(data.user);

        } else {

            showLogin();

        }

    });

}

function showLogin() {

app.innerHTML = `

<div class="container">

<div class="login-header">

<div class="logo">

<div class="logo-icon">
💼
</div>

<div>

<h1>JobVault</h1>

<p>Your Internship Tracker</p>

</div>

</div>

</div>

<div class="input-group">

<label>Email</label>

<input
id="email"
type="email"
placeholder="Enter your email">

</div>

<div class="input-group">

<label>Password</label>

<input
id="password"
type="password"
placeholder="Enter your password">

</div>

<button
id="loginBtn"
class="login-btn">

Login

</button>

<p class="signup-text">

New user?

<a href="#" id="signupLink">

Sign Up

</a>

</p>

</div>

`;

document.getElementById("signupLink").onclick=()=>{

chrome.tabs.create({

url:"http://localhost:5173/signup"

});

};

document.getElementById("loginBtn").onclick = async () => {

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

if(!email||!password){

alert("Please fill all fields.");

return;

}

try{

const data=await login(email,password);

if(!data.token){

alert(data.message);

return;

}

chrome.storage.local.set({

token:data.token,

user:data.user

},()=>{

showHome(data.user);

});

}

catch(err){

alert("Unable to connect to server.");

}

};

}
function showHome(user){

app.innerHTML=`

<div class="container">

<div class="header">

<div class="logo">

<div class="logo-icon">
💼
</div>

<div>

<h1>JobVault</h1>

<p>Your Internship Tracker</p>

</div>

</div>

<div class="status">

🟢 Logged In

</div>

</div>


<div class="welcome">

<h3>

👋 Welcome back,

</h3>

<h2>

${user.name}

</h2>

</div>


<button

id="dashboard"

class="dashboard-btn"

>

📊 Open Dashboard

</button>


<button

id="logout"

class="logout"

>

🚪 Logout

</button>




</div>

`;

document.getElementById("dashboard").onclick=()=>{

chrome.tabs.create({

url:"http://localhost:5173"

});

};

document.getElementById("logout").onclick=()=>{

chrome.storage.local.clear(()=>{

showLogin();

});

};

}