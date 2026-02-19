document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);

        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('bi-moon-stars');
                    icon.classList.add('bi-sun');
                } else {
                    icon.classList.remove('bi-sun');
                    icon.classList.add('bi-moon-stars');
                }
            }
        });
    };

    // Initialize
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemTheme);
    }

    // Toggle Event
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });

    // Initialize Bootstrap Tooltips (if needed later)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Sidebar Toggle Logic
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target) &&
                sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    }

    // Hub mobile ☰ menu toggle
    const hubMobileToggle = document.getElementById('hub-mobile-toggle');
    const hubMobileMenu = document.getElementById('hub-mobile-menu');
    if (hubMobileToggle && hubMobileMenu) {
        hubMobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            hubMobileMenu.classList.toggle('open');
        });
        // If sidebar-toggle is inside the dropdown, close the dropdown when it's clicked
        const sidebarToggleInMenu = hubMobileMenu.querySelector('#sidebar-toggle');
        if (sidebarToggleInMenu && sidebar) {
            sidebarToggleInMenu.addEventListener('click', () => {
                hubMobileMenu.classList.remove('open');
                sidebar.classList.toggle('show');
            });
        }
        document.addEventListener('click', (e) => {
            if (!hubMobileMenu.contains(e.target) && !hubMobileToggle.contains(e.target)) {
                hubMobileMenu.classList.remove('open');
            }
        });
    }
});
