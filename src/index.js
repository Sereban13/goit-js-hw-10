import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = input.value.trim();

  if (countryName === '') {
    countriesList.innerHTML = '';
    countryCard.innerHTML = '';
    return;
  } else
    fetchCountries(countryName)
      .then(data => {
        if (data.length < 2) {
          countriesList.innerHTML = '';
          countryCard.innerHTML = createCountryCard(data);
          Notiflix.Notify.success('Here is your result');
        } else if (data.length >= 2 && data.length <= 10) {
          countryCard.innerHTML = '';
          countriesList.innerHTML = createCountryList(data);
          Notiflix.Notify.info('We have some matches');
        } else {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(() => {
        countriesList.innerHTML = '';
        countryCard.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
}

function createCountryCard(arrowCountry) {
  return arrowCountry
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => `
      <img src="${svg}" alt="${official} height="70" width="90"">
        <h3>Ofiicial name: ${official}</h3>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        
        <p>Languages: ${Object.values(languages).join(',')}</p>`
    )
    .join('');
}

function createCountryList(arrowCountry) {
  return arrowCountry
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="card-li">
      <img src="${svg}" alt="${official} height="70" width="90"">  
      <h3>${official}</h3>
      </li>`
    )
    .join('');
}
