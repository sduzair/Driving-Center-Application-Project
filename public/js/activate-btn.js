document.querySelectorAll("input").forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    console.log("input event");
    document.querySelector("#btnUpdate").disabled = false;
  });
});
