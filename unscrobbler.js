const trackRows = document.querySelectorAll('.js-focus-controls-container');
const moreMenu = document.querySelectorAll('.chartlist-more-menu');

trackRows.forEach(row => {
  const loveTableData = row.querySelector('.chartlist-loved');

  const checkboxTableData = document.createElement('td');
  checkboxTableData.className = 'chartlist-checkbox';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'unscrobble-checkbox';
  checkboxTableData.appendChild(checkbox);

  row.insertBefore(checkboxTableData, loveTableData);
});

moreMenu.forEach(menu => {
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.className = 'mimic-link dropdown-menu-clickable-item';
  deleteButton.textContent = 'Delete selected scrobbles';
  deleteButton.onclick = deleteScrobbles;
  listItem.appendChild(deleteButton);
  menu.appendChild(listItem);
});

function deleteScrobbles() {
  const checkboxes = document.getElementsByName('unscrobble-checkbox');
  // Convert NodeList to an array.
  const checkboxesArr = Array.from(checkboxes);
  const checkedScrobbles = checkboxesArr.filter(node => node.checked);
  checkedScrobbles.forEach(checkbox => {
    const scrobbleRow = checkbox.parentNode.parentNode;
    const deleteBtn = scrobbleRow.querySelector('[data-ajax-form-sets-state="deleted"]');
    deleteBtn.click();
  });
}
