function main() {
  const container = document.getElementById("container");
  if (!container) {
    throw new Error("container not found");
  }

  let countNumber = 0

  const displayCount = document.createElement("span");
  function updateDisplay () {
    displayCount.textContent = countNumber.toString();
  };

  const incrementButton = document.createElement("button");
  incrementButton.textContent = "Increment";
  const decrementButton = document.createElement("button");
  decrementButton.textContent = "Decrement";

  incrementButton.addEventListener("click", () => {
    countNumber = countNumber + 1;
    updateDisplay();
  });

  decrementButton.addEventListener("click", () => {
    countNumber = countNumber - 1;
    updateDisplay();
  });

  updateDisplay();

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    window.electron.save(countNumber).catch(e => {
      window.alert(e);
    });
  });

  const loadButton = document.createElement("button");
  loadButton.textContent = "Load";

  container.appendChild(displayCount);
  container.appendChild(incrementButton);
  container.appendChild(decrementButton);
  container.appendChild(document.createElement('br'))
  container.appendChild(saveButton);
  container.appendChild(loadButton);
}

main();
