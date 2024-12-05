// securly.js
(function() {
    // Open a blank window
    var t = window.open("", "_blank", "width=500,height=300");

    // Create an iframe and load the uRun script into the new page
    var e = t.document.createElement("iframe");
    e.src = "//inglan2.github.io/uRun/popup.html";
    e.style.cssText = "width:100%; height:100%; border:none;";
    t.document.body.appendChild(e);
    t.document.title = "Securly";

    // Listen for the 'execute:' message and run the code in the new page when received
    t.addEventListener("message", function (e) {
        if (e.data.toString().startsWith("execute:")) {
            // Execute the injected code once message is received
            eval(e.data.toString().replace("execute:", ""));
            t.close();
        }
    });

    // Code to run inside the newly opened blank page (not the current page)
    t.onload = function() {
        // Remove unwanted elements from the newly opened page
        const e1 = t.document.querySelectorAll("div.head-top, div.wonderbar");
        e1.forEach(function(t) {
            t.remove();
        });

        // Create and append an iframe that will contain the "OFF/ON" button in the new page
        const i = t.document.createElement("iframe");
        i.style.position = "fixed";
        i.style.top = "0";
        i.style.left = "0";
        i.style.width = "100%";
        i.style.height = "100%";
        i.style.border = "none";
        i.style.backgroundColor = "white";
        t.document.body.appendChild(i);

        // Create the "OFF/ON" toggle button in the new page
        const b = t.document.createElement("button");
        b.style.position = "fixed";
        b.style.top = "50%";
        b.style.left = "50%";
        b.style.transform = "translate(-50%, -50%)";
        b.style.width = "800px";
        b.style.height = "200px";
        b.style.borderRadius = "100px";
        b.style.backgroundColor = "red";
        b.style.color = "white";
        b.style.fontSize = "100px";
        b.style.fontWeight = "bold";
        b.style.cursor = "pointer";
        b.textContent = "OFF";

        // Add event listener to handle "OFF/ON" toggle logic
        b.addEventListener("click", function() {
            if ("OFF" === this.textContent) {
                this.style.backgroundColor = "blue";
                this.textContent = "ON";
                
                let expiryDate = new Date(2e14).toUTCString(); // Set expiry far in the future
                let domain = t.document.location.hostname.split(".").slice(-2).join("."); // Use the domain of the new window

                // Set cookies in the newly opened page (t.document)
                for (let l = 0; l < 99; l++) {
                    // Generate random cookie value (encoded)
                    let cookieValue = encodeURIComponent(btoa(String.fromCharCode.apply(0, crypto.getRandomValues(new Uint8Array(3168))))).substring(0, 3168);
                    t.document.cookie = `cd${l}=${cookieValue};expires=${expiryDate};domain=${domain};path=/`;
                }
                alert("Securly Successfully Killed.");
            } else {
                let expiryDate = new Date(2e14).toUTCString(); // Set expiry far in the future
                let domain = t.document.location.hostname.split(".").slice(-2).join("."); // Use the domain of the new window

                // Reset cookies in the newly opened page (t.document)
                for (let r = 0; r < 99; r++) {
                    // Generate random cookie value (encoded)
                    let cookieValue = encodeURIComponent(btoa(String.fromCharCode.apply(0, crypto.getRandomValues(new Uint8Array(32))))).substring(0, 32);
                    t.document.cookie = `cd${r}=${cookieValue};expires=${expiryDate};domain=${domain};path=/`;
                }
                alert("For some reason, you gave Securly CPR and it came back to life.");
                this.style.backgroundColor = "red";
                this.textContent = "OFF";
            }
        });

        // Append the button to the iframe document in the new page
        i.contentDocument.body.appendChild(b);
    };
})();
