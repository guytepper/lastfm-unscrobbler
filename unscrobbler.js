// Get all scrobble rows & menu elements, in order to modify them.
const scrobbleRows = document.querySelectorAll('.js-focus-controls-container');
const moreMenu = document.querySelectorAll('.chartlist-more-menu');

// Add a checkbox for each scrobble row.
scrobbleRows.forEach(row => {
  const loveTableData = row.querySelector('.chartlist-loved');

  // Create the checkbox container, which will be appended to the table row.
  const checkboxTableData = document.createElement('td');
  checkboxTableData.className = 'chartlist-checkbox';

  // Create the checkbox element, and append it to it's container.
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'unscrobble-checkbox';
  checkboxTableData.appendChild(checkbox);

  // Insert the checkbox before the track heart icon.
  row.insertBefore(checkboxTableData, loveTableData);
});

// Add a 'Delete selected scrobbles' button to each scrobble menu.
moreMenu.forEach(menu => {
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.className = 'mimic-link dropdown-menu-clickable-item';
  deleteButton.textContent = 'Delete selected scrobbles';
  deleteButton.onclick = deleteScrobbles;
  listItem.appendChild(deleteButton);
  menu.appendChild(listItem);
});

// Delete all the checked scrobble rows.
function deleteScrobbles() {
  const checkboxes = document.getElementsByName('unscrobble-checkbox');

  // Convert NodeList to an array.
  const checkboxesArr = Array.from(checkboxes);

  // Create a new array that contains only checked checkboxes.
  const checkedScrobbles = checkboxesArr.filter(node => node.checked);

  // Delete the selected scrobbles.
  // This is done by clicking on every 'Delete scrobble' button that it's row has been checked.
  checkedScrobbles.forEach(checkbox => {
    const scrobbleRow = checkbox.parentNode.parentNode;
    const deleteBtn = scrobbleRow.querySelector('[data-ajax-form-sets-state="deleted"]');
    deleteBtn.click();
  });
}
