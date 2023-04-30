export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
