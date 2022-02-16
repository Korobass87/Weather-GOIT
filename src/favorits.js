const textCity = document.querySelector('input');
const addFavor = document.querySelector('button');

textCity.addEventListener('input', onInputText);
addFavor.addEventListener('click', onClickSubmit);

function onInputText(e) {
  const currentValue = e.currentTarget.value;
  console.log(currentValue);
}

function onClickSubmit(e) {
  e.preventDefault();
}

function renderFavoritsMarkup(value) {
  const renderFavor = document.querySelector('.favorits');

  let markup = value
    .map(el => {
      return `
            <button>${el.currentValue}</button>
        `;
    })
    .join('');
  renderFavor.insertAdjacentHTML('beforeend', markup);
}
