class CustomSelect {
  #currentSelectedOption;
  #currentSelectedOptionRef;
  #id;
  #options;
  constructor(id, options) {
    this.#id = id;
    this.#options = options;
  }

  render(container) {
    const selectDropdown = document.createElement("div");
    selectDropdown.className = `select-dropdown select-dropdown--${this.#id}`;

    const buttonChoose = document.createElement("button");
    buttonChoose.className = `select-dropdown__button select-dropdown--${
      this.#id
    }`;

    const spanText = document.createElement("span");
    spanText.className = `select-dropdown select-dropdown--${this.#id}`;
    spanText.innerText = "Выберите элемент";

    const unorderedList = document.createElement("ul");
    unorderedList.className = `select-dropdown__list select-dropdown__list--${this.id}`;

    selectDropdown.append(buttonChoose, unorderedList);
    buttonChoose.append(spanText);

    options.forEach((value) => {
      const listContent = document.createElement("li");
      listContent.className = "select-dropdown__list-item";
      listContent.dataset.value = `${value.value}`;
      listContent.innerText = `${value.text}`;
      unorderedList.append(listContent);
    });

    container.append(selectDropdown);

    buttonChoose.addEventListener("click", function () {
      if (unorderedList.classList.contains("active")) {
        unorderedList.classList.remove("active");
      } else {
        unorderedList.classList.add("active");
      }
    });

    unorderedList.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (li) {
        if (this.#currentSelectedOptionRef) {
          this.#currentSelectedOptionRef.classList.remove("selected");
        }
        this.#currentSelectedOptionRef = li;
        li.classList.add("selected");
        const choosenId = li.dataset.value;
        const selectedObject = options.filter(
          (option) => option.value === +choosenId
        )[0];
        spanText.innerText = selectedObject.text;
        this.#currentSelectedOption = selectedObject;
        console.log(this.#currentSelectedOption);
        console.log(spanText);
      }
    });

    return container;
  }

  get selectedValue() {
    return this.#currentSelectedOption;
  }
}

const options = [
  { value: 1, text: "JavaScript" },
  { value: 2, text: "NodeJS" },
  { value: 3, text: "ReactJS" },
  { value: 4, text: "HTML" },
  { value: 5, text: "CSS" },
];

const customSelect = new CustomSelect("123", options);
const mainContainer = document.querySelector("#container");
customSelect.render(mainContainer);
