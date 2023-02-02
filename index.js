const inputEl = document.querySelector("#input");
const infoTextEl = document.querySelector("#info-text");
const meaningContainerEl = document.querySelector("#meaning-container");

const titleEl = document.querySelector("#title");
const audioEl = document.querySelector("#audio");
const meaningEl = document.querySelector("#meaning");

async function fetchApi(word) {
  try {
    infoTextEl.style.display = "block"; //1-infotext (type the word press enter) gözükecek, sonra da...
    meaningContainerEl.style.display = "none"; //4-audio ve meaning olan kısım gidiyor.

    infoTextEl.innerText = `Searching the meaning of "${word}"`; //2-inputa yazıp enter diyince searching diyecek
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none"; //3-entera basınca da açıklama kalkacak
      meaningContainerEl.style.display = "block"; //4-anlamı ve audisu görünecek...
      audioEl.style.display="inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }

    console.log(result);
  } catch (error) {
    console.log(error);
    infoTextEl.innerText=`an error happened, try again later`
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
