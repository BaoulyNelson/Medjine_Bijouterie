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

// Fonction pour activer la recherche dynamique avec sélection
function setupSearch() {
  const searchIcon = document.getElementById("searchIcon");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let selectedIndex = -1; // Pour suivre l'élément sélectionné

  // Toggle pour afficher/masquer la barre de recherche
  searchIcon.addEventListener("click", () => {
    searchBar.classList.toggle("d-none"); // Afficher ou masquer la barre
    if (!searchBar.classList.contains("d-none")) {
      searchInput.focus(); // Activer automatiquement le focus
    } else {
      searchInput.value = ""; // Réinitialiser la recherche
      searchResults.innerHTML = ""; // Vider les résultats
    }
  });

  // Recherche en temps réel
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = ""; // Réinitialiser les résultats
    selectedIndex = -1; // Réinitialiser la sélection
    if (query) {
      const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(query)
      );
      if (filteredItems.length > 0) {
        filteredItems.forEach((item, index) => {
          const li = document.createElement("li");
          li.textContent = item;
          li.className = "list-group-item";
          li.dataset.index = index; // Associer un index pour le suivi
          searchResults.appendChild(li);

          // Sélection par clic
          li.addEventListener("click", () => {
            searchInput.value = item; // Insérer l'élément choisi
            searchResults.innerHTML = ""; // Vider les résultats
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

  // Gestion des touches fléchées et Entrée
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
        e.preventDefault(); // Éviter de soumettre un formulaire
        searchInput.value = items[selectedIndex].textContent; // Sélectionner l'élément
        searchResults.innerHTML = ""; // Vider les résultats
      }
    }
  });

  // Fonction pour mettre en surbrillance l'élément sélectionné
  function highlightItem(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add("active"); // Ajouter une classe CSS pour le style
      } else {
        item.classList.remove("active");
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

