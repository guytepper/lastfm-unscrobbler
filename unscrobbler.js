const trackRows = document.querySelectorAll(".js-focus-controls-container");
const moreMenu = document.querySelectorAll(".chartlist-more-menu");

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

  row.insertBefore(checkboxTableData, loveTableData);
});

moreMenu.forEach(menu => {
  const listItem = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.className = "mimic-link dropdown-menu-clickable-item";
  deleteButton.textContent = "Delete selected scrobbles";
  listItem.appendChild(deleteButton);
  menu.appendChild(listItem);
});
