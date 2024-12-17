export function makeElementVisible(element) {
  element.classList.remove("invisible");
  element.style.display = 'block';
  element.classList.add("border");
}

export function makeElementInvisible(element) {
  element.classList.add("invisible");
  element.style.display = 'none';
  element.classList.remove("border");

}
