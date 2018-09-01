const trackRows = document.querySelectorAll(".js-focus-controls-container");

trackRows.forEach(row => {
  const loveTableData = row.querySelector(".chartlist-loved");

  const checkboxTableData = document.createElement("td");
  checkboxTableData.className = "chartlist-checkbox";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = "value";
  checkbox.id = "id";
  checkboxTableData.appendChild(checkbox);

  console.log(row.insertBefore(checkboxTableData, loveTableData));
});
