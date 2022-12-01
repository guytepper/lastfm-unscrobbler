function unscrobbler() {
  // Get all scrobble rows & menu elements in order to modify them.
  const scrobbleRows = document.querySelectorAll('.js-focus-controls-container');
  const moreMenu = document.querySelectorAll('.chartlist-more-menu');
  const recentTrackSection = document.querySelector('#recent-tracks-section');
  const libraryTracklistSection = document.querySelectorAll('.tracklist-section');

  // Where the range selection should start
  let startIndex;
  // Where the range selection should end
  let endIndex;
  // Whether the startIndex has been selected / deselected
  let isStartSelected;
  // Keeps the previous range of selected checkboxes
  let previousRange = [];
  // Whether the shift key was pressed or not while changing checkbox input
  let shiftKeyPressed;

  function handleShiftKey(event) {
    shiftKeyPressed = event.shiftKey;
  }

  document.addEventListener('keydown', handleShiftKey, true);
  document.addEventListener('keyup', handleShiftKey, true);

  /**
   * Add a checkbox to each scrobble row that'll allow it's selection for deletion.
   * The scrobbles are contained inside table rows, so we'll have to create a new
   * table data element for each checkbox and append it to the scrobble row.
   */
  scrobbleRows.forEach((row) => {
    const loveTableData = row.querySelector('.chartlist-loved');

    // Create the checkbox container, which will be appended to the scrobble row.
    const checkboxTableData = document.createElement('td');
    checkboxTableData.className = 'chartlist-checkbox';

    // Create the checkbox element, and append it to it's container.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'unscrobble-checkbox';
    checkboxTableData.appendChild(checkbox);

    // When the checkbox input is changed, check if it was accompanied with the
    // SHIFT keypress and thereby select range
    checkbox.addEventListener('input', () => {
      const checkboxes = [...document.getElementsByName('unscrobble-checkbox')];

      if (shiftKeyPressed) {
        const currentIndex = checkboxes.indexOf(checkbox);
        if (currentIndex < startIndex) {
          startIndex = currentIndex;
        } else {
          endIndex = currentIndex;
        }

        const newRange = checkboxes.slice(startIndex, endIndex + 1);
        // Decides whethere the checkboxes should be selected / deselected,
        // using the value of the first selected checkbox.
        previousRange.map((cb) => (cb.checked = isStartSelected));
        newRange.map((cb) => (cb.checked = !isStartSelected));
        previousRange = newRange;
      }
      // (Re)Initiate values
      else {
        startIndex = endIndex = checkboxes.indexOf(checkbox);
        isStartSelected = !checkbox.checked;
        previousRange = [];
      }
    });

    // Insert the checkbox before the track heart icon.
    row.insertBefore(checkboxTableData, loveTableData);

    // Add checkbox click trigger on row click event.
    row.addEventListener('click', (event) => {
      if (['TD', 'TR'].includes(event.target.tagName)) {
        checkbox.click();
      }
    });
  });

  // Add a 'Delete selected scrobbles' button to each scrobble menu.
  moreMenu.forEach((menu) => {
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.className = 'mimic-link dropdown-menu-clickable-item delete-selected-scrobbles-btn';
    deleteButton.textContent = 'Delete selected scrobbles';
    deleteButton.onclick = deleteScrobbles;
    listItem.appendChild(deleteButton);
    menu.appendChild(listItem);
  });

  // Track the state of the 'Select All' button.
  let status = 'select';
  // Alternate between the select & deselect tracks methods.
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

  function createSelectAllButton(section) {
    const selectAllBtn = document.createElement('button');
    selectAllBtn.className = 'btn-secondary btn-sm select-all-btn';
    selectAllBtn.textContent = 'Select All';
    selectAllBtn.onclick = () => selectAllHandler(selectAllBtn, section);
    return selectAllBtn;
  }

  // If the user is on their profile page, add 'Select All' button on the recent tracks section.
  if (recentTrackSection) {
    const title = recentTrackSection.querySelector('h2');
    const selectAllBtn = createSelectAllButton(recentTrackSection);
    title.appendChild(selectAllBtn);
  }

  // If the user is on library tracklist page, add 'Select All' button to each date section.
  if (libraryTracklistSection[0]) {
    libraryTracklistSection.forEach((section) => {
      // Add the button to each date on the section.
      const dateTitles = section.querySelectorAll('.date-heading');
      dateTitles.forEach((title) => {
        const selectAllBtn = createSelectAllButton(section);
        title.appendChild(selectAllBtn);
      });
    });
  }

  // Delete the checked scrobble rows.
  function deleteScrobbles() {
    const checkboxes = document.getElementsByName('unscrobble-checkbox');

    // Convert the checkbox NodeList to an array.
    const checkboxesArr = Array.from(checkboxes);

    // Create a new array that contains only the checked checkboxes.
    const checkedScrobbles = checkboxesArr.filter((node) => node.checked);

    // Delete the selected scrobbles.
    // This is done by manually clicking on every 'Delete scrobble' button that it's scrobble has been checked.
    checkedScrobbles.forEach((checkbox) => {
      const scrobbleRow = checkbox.parentNode.parentNode;
      const deleteBtn = scrobbleRow.querySelector('[data-ajax-form-sets-state="deleted"]');
      deleteBtn.click();
    });
  }

  // Select all tracks for the provided section
  function selectAllTracks(section) {
    const checkboxes = section.querySelectorAll('input[name="unscrobble-checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
    // return deselectAllTracks(section);
  }

  // Deselect all tracks for the provided section
  function deselectAllTracks(section) {
    const checkboxes = section.querySelectorAll('input[name="unscrobble-checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  // Check if the page has the redesigned library
  if (document.querySelectorAll('.chartlist-artist').length > 0) {
    document.body.classList.add('new-design');
  }
}

// Check if user is logged in and can use the extension on the current page
function validatePage() {
  const username = document.querySelector('.auth-dropdown-menu-item strong')?.innerText;
  const url = new URL(document.URL);

  if (!username) alert('You are not logged in.\nPlease log in to use Last.FM Unscrobbler.');
  else if (
    url.pathname.endsWith(username) ||
    url.pathname.endsWith(`${username}/library`) ||
    // Covers the library track page
    // The path includes "username/library" and between the album and the track there is an underscore ("album/_/track").
    (url.pathname.includes(`${username}/library`) && url.pathname.split('/').slice(-2)[0] == '_')
  )
    unscrobbler();
  else
    alert(
      'Last.FM Unscrobbler works only on:\n· Your profile page\n· Your library scrobbles page\n· An individual track scrobble history'
    );
}

// Run unscrobbler once per page
if (!document.querySelector('.chartlist-checkbox')) validatePage();
