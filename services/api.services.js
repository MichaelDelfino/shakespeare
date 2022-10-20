// Shared API call service

// https://poetrydb.org/author,title/Shakespeare;Sonnet
// https://poetrydb.org/author/Emily Dickinson/title

const call = (num, callback) => {
  fetch(`https://poetrydb.org/author,title/Shakespeare;Sonnet`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      callback(data[num]);
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log(error);
      }
    });
};
export default call;
