document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById("name-input")
  const timeInput = document.getElementById("time-input")
  const saveBtn = document.getElementById("save-btn")

  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const notificationTime = parseInt(timeInput.value);

    if (name === '') {
      alert('Please enter your name.');
      return;
    }

    if (isNaN(notificationTime) || notificationTime < 1) {
      alert('Please enter a valid notification time (minimum 1 second).');
      return;
    }

    // Save the options to Chrome storage
    chrome.storage.sync.set({ name, notificationTime }, () => {
      console.log('Name:', name);
      console.log('Time:', notificationTime);
      alert('Options saved successfully!');
    });
  });

  // Load saved options
  chrome.storage.sync.get(["name", "notificationTime"], (res) => {
    nameInput.value = res.name ?? "???"
    timeInput.value = res.notificationTime ?? 1000
  });
});
