console.log("JobVault Loaded");

function injectButton() {

    if (document.getElementById("jobvault-btn")) {
        return true;
    }

    const applyBtn = document.querySelector(".top_apply_now_cta");

    if (!applyBtn) {
        return false;
    }

    // Clone Internshala button
    const jobVaultBtn = applyBtn.cloneNode(true);

    jobVaultBtn.id = "jobvault-btn";
    jobVaultBtn.href = "javascript:void(0)";

    const btn = jobVaultBtn.querySelector("button");

    btn.innerText = "Save to JobVault";

    jobVaultBtn.style.marginLeft = "12px";

    jobVaultBtn.addEventListener("click", (e) => {

        e.preventDefault();
        e.stopPropagation();

        openModal();

    });

    applyBtn.insertAdjacentElement("afterend", jobVaultBtn);

    return true;
}

const interval = setInterval(() => {

    if (injectButton()) {
        clearInterval(interval);
    }

}, 500);