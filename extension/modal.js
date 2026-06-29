const url = window.location.href;

async function openModal() {

    // Prevent duplicate modal
    if (document.getElementById("jobvault-overlay")) return;

    // Check if already saved
    const checkData = await new Promise((resolve) => {

    chrome.runtime.sendMessage({

        action: "apiRequest",

        url: `http://localhost:5000/jobs/check?url=${encodeURIComponent(url)}`,

        method: "GET"

    }, resolve);

});

if (!checkData.success) {

    if (checkData.message === "NOT_LOGGED_IN") {

        window.open("http://localhost:5173/login", "_blank");

        return;

    }

  console.log(checkData);

alert(JSON.stringify(checkData));

    return;

}

const existingJob = checkData.data.job;

    const title =
        document.querySelector("h1")?.innerText.trim() || "-";

    const company =
        document.querySelector(".company_name a")?.innerText.trim() || "-";

    const location =
        document.querySelector("#location_names a")?.innerText.trim() || "-";

    const stipend =
        document.querySelector(".stipend")?.innerText.trim() || "-";

    const overlay = document.createElement("div");

    overlay.id = "jobvault-overlay";

    overlay.innerHTML = `
        <div id="jobvault-modal">

            <div class="jv-header">
                <h2>JobVault</h2>
            </div>

            <div class="jv-body">

                <div class="jv-group">
                    <label>Title</label>
                    <div>${title}</div>
                </div>

                <div class="jv-group">
                    <label>Company</label>
                    <div>${company}</div>
                </div>

                <div class="jv-group">
                    <label>Location</label>
                    <div>${location}</div>
                </div>

                <div class="jv-group">
                    <label>Stipend</label>
                    <div>${stipend}</div>
                </div>

                <div class="jv-group">
                    <label>Status</label>

                    <select id="job-status">

                        <option value="Saved" ${existingJob?.status === "Saved" ? "selected" : ""}>Saved</option>

                        <option value="Applied" ${existingJob?.status === "Applied" ? "selected" : ""}>Applied</option>

                        <option value="Interview" ${existingJob?.status === "Interview" ? "selected" : ""}>Interview</option>

                        <option value="Offer" ${existingJob?.status === "Offer" ? "selected" : ""}>Offer</option>

                        <option value="Rejected" ${existingJob?.status === "Rejected" ? "selected" : ""}>Rejected</option>

                    </select>

                </div>

                <div class="jv-group">

                    <label>Notes</label>

                    <textarea
                        id="job-notes"
                        rows="4"
                        placeholder="Add notes..."
                    >${existingJob?.notes || ""}</textarea>

                </div>

            </div>

            <div class="jv-footer">

                <button id="cancel-btn">
                    Cancel
                </button>

                <button id="save-btn">
                    ${existingJob ? "Update" : "Save"}
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("cancel-btn").onclick = () => {
        overlay.remove();
    };

    overlay.onclick = (e) => {

        if (e.target.id === "jobvault-overlay") {
            overlay.remove();
        }

    };

    document.getElementById("save-btn").onclick = async () => {

        const status = document.getElementById("job-status").value;

        const notes = document.getElementById("job-notes").value;

        const body = {

            title,
            company,
            location,
            stipend,
            status,
            notes,
            url

        };

        try {

    const response = await new Promise((resolve) => {

        chrome.runtime.sendMessage({

            action: "apiRequest",

            url: existingJob
                ? `http://localhost:5000/jobs/${existingJob.id}`
                : "http://localhost:5000/jobs",

            method: existingJob ? "PUT" : "POST",

            body

        }, resolve);

    });

    if (!response.success) {

        if (response.message === "NOT_LOGGED_IN") {

            window.open("http://localhost:5173/login", "_blank");

            return;

        }

        alert(response.data?.message || "Unable to save internship.");

        return;

    }

    overlay.remove();

    const btn = document.querySelector("#jobvault-btn button");

    btn.innerText = "✓ Saved";

    btn.disabled = true;

}
catch(err){

    console.error(err);

    alert("Unable to save internship.");

}

    };

}