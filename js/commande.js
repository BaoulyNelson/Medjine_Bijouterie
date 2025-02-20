function redirectToForm(productNumber) {
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfUC8V3ZVr5axSC4XoLI2-0angRqqvGJT2TX1q7V2sR6qD9-w/viewform";
    
    // ID du champ "Numéro de produit" dans Google Forms
    let fieldID = "entry.618311227";  

    // Construire l'URL avec le bon numéro de produit
    let finalURL = googleFormURL + "?usp=pp_url&" + fieldID + "=" + encodeURIComponent(productNumber);

    // Rediriger l'utilisateur
    window.location.href = finalURL;
  }