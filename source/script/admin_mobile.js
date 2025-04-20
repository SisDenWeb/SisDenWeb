const toggleBtn = document.getElementById("menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
      const dropdownItems = document.querySelectorAll(".dropdown-item");

      let menuOpen = false;

      function toggleDropdown() {
        if (menuOpen) {
          mobileMenu.classList.remove("max-h-40", "opacity-100");
          mobileMenu.classList.add("max-h-0", "opacity-0");
        } else {
          mobileMenu.classList.remove("max-h-0", "opacity-0");
          mobileMenu.classList.add("max-h-40", "opacity-100");
        }
        menuOpen = !menuOpen;
      }

      toggleBtn?.addEventListener("click", toggleDropdown);

      dropdownItems.forEach((item) => {
        item.addEventListener("click", () => {
          toggleDropdown(); // fecha o menu ao clicar
        });
      });