// personenauswahl.js

function saveResults() {
    const selectedPeople = Array.from(document.getElementsByName("person"))
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    if (selectedPeople.length !== 3) {
      alert("Bitte wählen Sie genau 3 Personen aus.");
    } else {
      alert("Ergebnisse gespeichert:\n" + selectedPeople.join("\n"));
    }
  }
  