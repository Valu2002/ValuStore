var checkboxes = document.querySelectorAll('.option-input.checkbox');

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('click', function () {

    checkboxes.forEach(function (otherCheckbox) {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});

