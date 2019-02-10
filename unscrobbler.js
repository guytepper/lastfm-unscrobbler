// Get all scrobble rows & menu elements in order to modify them.
const scrobbleRows = document.querySelectorAll('.js-focus-controls-container');
const moreMenu = document.querySelectorAll('.chartlist-more-menu');
const recentTrackSection = document.querySelector('#recent-tracks-section');
const libraryTracklistSection = document.querySelectorAll('.tracklist-section');

/**
 * Add a checkbox for each scrobble row that will allow to select the track for deletion.
 * The scrobbles are contained inside table rows, so we'll have to create a new
 * table data element for each checkbox and append it to the scrobble row.
 */
scrobbleRows.forEach(row => {
  const loveTableData = row.querySelector('.chartlist-loved');

  // Create the checkbox container, which will be appended to the scrobble row.
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

// Track the state of the 'Select All' button.
let status = 'select';
// Alternate between the select & deselect methods.
function selectAllHandler(button, section) {
  if (status === 'select') {
    selectAllTracks(section);
    status = 'deselect';
    button.innerText = 'Deselect All';
  } else if (status === 'deselect') {
    deselectAllTracks(section);
    status = 'select';
    button.innerText = 'Select All';
  }
}

// If the user is on their profile page, add 'Select All' button on the recent tracks section.
if (recentTrackSection) {
  const title = recentTrackSection.querySelector('h2');
  const selectAllBtn = document.createElement('button');
  selectAllBtn.className = 'btn-secondary btn-sm';
  selectAllBtn.textContent = 'Select All';
  selectAllBtn.onclick = () => selectAllHandler(selectAllBtn, recentTrackSection);
  title.appendChild(selectAllBtn);
}

// If the user is on library tracklist page, add 'Select All' button.
if (libraryTracklistSection[0]) {
  libraryTracklistSection.forEach(section => {
    const dateTitles = section.querySelectorAll('.date-heading');
    dateTitles.forEach(title => {
      const selectAllBtn = document.createElement('button');
      selectAllBtn.className = 'btn-secondary btn-sm';
      selectAllBtn.textContent = 'Select All';
      selectAllBtn.onclick = () => selectAllHandler(selectAllBtn, section);
      title.appendChild(selectAllBtn);
    });
  });
}

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

// Select all tracks for the provided section
function selectAllTracks(section) {
  const checkboxes = section.querySelectorAll('input[name="unscrobble-checkbox"]');
  checkboxes.forEach(checkbox => (checkbox.checked = true));
  // return deselectAllTracks(section);
}

// Deselect all tracks for the provided section
function deselectAllTracks(section) {
  const checkboxes = section.querySelectorAll('input[name="unscrobble-checkbox"]');
  checkboxes.forEach(checkbox => (checkbox.checked = false));
}
