function main() {
  const container = document.getElementById("container");
  if (!container) {
    throw new Error("container not found");
  }

  const displayCount = document.createElement("span");
  displayCount.textContent = "0"

  const incrementButton = document.createElement("button");
  incrementButton.textContent = "Increment";
  const decrementButton = document.createElement("button");
  decrementButton.textContent = "Decrement";

  container.appendChild(displayCount);
  container.appendChild(incrementButton);
  container.appendChild(decrementButton);
}

main();
