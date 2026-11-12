
(function () {
    const STORAGE_KEY = "ashraya_theme";

    function initTheme() {
        const toggle = document.getElementById("themeToggle");

        if (!toggle) {
            console.error("Ashraya: Theme toggle not found.");
            return;
        }

        const sunIcon = toggle.querySelector(".sun-icon");
        const moonIcon = toggle.querySelector(".moon-icon");

        function updateTheme() {
            const isDark = document.body.classList.contains("dark-theme");

            if (sunIcon) {
                sunIcon.hidden = isDark;
                sunIcon.style.display = isDark ? "none" : "block";
            }

            if (moonIcon) {
                moonIcon.hidden = !isDark;
                moonIcon.style.display = isDark ? "block" : "none";
            }

            toggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );

            toggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
        }

        toggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");

            const isDark = document.body.classList.contains("dark-theme");

            try {
                localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
            } catch (error) {
                console.error("Ashraya: Could not save theme.");
            }

            updateTheme();
        });

        updateTheme();
    }

    function applySavedTheme() {
        try {
            if (localStorage.getItem(STORAGE_KEY) === "dark") {
                document.body.classList.add("dark-theme");
            }
        } catch (error) {
            console.error("Ashraya: Could not load theme.");
        }
    }

    function start() {
        applySavedTheme();
        initTheme();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
