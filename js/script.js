// Définir les liens de navigation
const links = [
  { href: "Accueil", text: "Accueil" },
  { href: "Collections", text: "Collections" },
  { href: "Offres", text: "Offres" },
  { href: "À-Propos", text: "À Propos" },
  { href: "Contact", text: "Contact" },
  { href: "Panier", text: "Panier" },
  { href: "Comptes", text: "Comptes" }
];

// Fonction pour générer les liens dynamiquement
function generateLinks() {
  const navLinksContainer = document.querySelector(".nav-links");
  const offcanvasLinksContainer = document.querySelector("#dynamic-links");

  links.forEach(link => {
    const navLink = document.createElement("a");
    navLink.href = "#" + link.href; // Assurez-vous que les liens correspondent aux ID des sections
    navLink.textContent = link.text;
    navLink.classList.add("nav-link");
    navLinksContainer.appendChild(navLink);

    const offcanvasLink = document.createElement("a");
    offcanvasLink.href = "#" + link.href;
    offcanvasLink.textContent = link.text;
    offcanvasLink.classList.add("offcanvas-link");
    offcanvasLinksContainer.appendChild(offcanvasLink);

    // Ajout de l'événement de clic pour chaque lien de navigation
    navLink.addEventListener("click", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut de navigation
      showSection(link.href);
      closeOffcanvas(); // Fermer le panneau
    });

    offcanvasLink.addEventListener("click", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut de navigation
      showSection(link.href);
      closeOffcanvas(); // Fermer le panneau
    });
  });
}

// Fonction pour fermer le panneau offcanvas
function closeOffcanvas() {
  const offcanvas = document.querySelector("#offcanvasMenu");
  offcanvas.classList.remove("show"); // Enlever la classe "show" pour fermer le panneau
  document.body.style.overflow = ''; // Réactiver le défilement de la page
}


// Fonction pour afficher la section correspondante et masquer les autres
function showSection(sectionId) {
  // Masquer toutes les sections
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.classList.add("d-none");
  });

  // Afficher la section demandée
  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.classList.remove("d-none");
  }
}
// Liste des bijoux disponibles
const items = [
  "Bague en or",
  "Collier diamant",
  "Bracelet argent",
  "Boucles d'oreilles perle",
  "Chaîne en or",
  "Pendentif cœur",
  "Bracelet en perles",
  "Bague sertie de saphir",
  "Collier en argent",
  "Boucles d'oreilles créoles",
  "Montre élégante",
  "Bijou de cheville",
  "Broche fleur",
  "Parure complète",
  "Charms personnalisés"
];


// Fonction pour activer la recherche dynamique avec sélection
function setupSearch() {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let selectedIndex = -1; // Suivi de l'élément sélectionné

  // Toggle pour afficher/masquer la barre de recherche
  searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("d-none");
    if (!searchBar.classList.contains("d-none")) {
      searchInput.focus();
    } else {
      searchInput.value = "";
      searchResults.innerHTML = "";
    }
  });

  // Fermer la barre de recherche en cliquant à l'extérieur
  document.addEventListener("click", (event) => {
    if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
      searchBar.classList.add("d-none");
      searchResults.innerHTML = "";
    }
  });

  // Recherche en temps réel
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = "";
    selectedIndex = -1;

    if (query) {
      const filteredItems = items.filter((item) => item.toLowerCase().includes(query));

      if (filteredItems.length > 0) {
        filteredItems.forEach((item, index) => {
          const li = document.createElement("li");
          li.textContent = item;
          li.className = "list-group-item list-group-item-action";
          li.dataset.index = index;
          searchResults.appendChild(li);

          // Sélection par clic
          li.addEventListener("click", () => {
            searchInput.value = item;
            searchResults.innerHTML = "";
          });
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "Aucun résultat trouvé";
        li.className = "list-group-item text-muted";
        searchResults.appendChild(li);
      }
    }
  });

  // Navigation avec les touches fléchées et Enter
  searchInput.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".list-group-item");
    if (items.length > 0) {
      if (e.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % items.length;
        highlightItem(items);
      } else if (e.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        highlightItem(items);
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        searchInput.value = items[selectedIndex].textContent;
        searchResults.innerHTML = "";
      }
    }
  });

  // Fonction pour mettre en surbrillance l'élément sélectionné
  function highlightItem(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add("list-group-item-action", "active");
      } else {
        item.classList.remove("list-group-item-action", "active");
      }
    });
  }
}



// Empêcher la fermeture du panneau avec le bouton hamburger
document.addEventListener("DOMContentLoaded", () => {
  generateLinks();
  setupSearch();

  // Initialiser la première section par défaut
  showSection("Accueil"); // Affiche la section "Accueil" par défaut

  const btnMenu = document.querySelector(".btn-menu");

  // Evénement pour empêcher la fermeture si déjà ouvert
  btnMenu.addEventListener("click", (event) => {
    const offcanvas = document.querySelector("#offcanvasMenu");
    if (offcanvas.classList.contains("show")) {
      event.preventDefault();
    }
  });
});

