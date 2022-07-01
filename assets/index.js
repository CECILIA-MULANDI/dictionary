// const wrapper = document.querySelector(".wrapper"),
//   searchInput = wrapper.querySelector("input"),
//   synonyms = wrapper.querySelector(".synonym .list"),
//   volume = wrapper.querySelector(".word i"),
//   removeIcon = wrapper.querySelector(".search span"),
//   infoText = wrapper.querySelector(".info-text");
// let audio;

// // fetch api function
// function fetchApi(word) {
//   infoText.style.color = "#000";
//   wrapper.classList.remove("active");
//   infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
//   let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((result) => data(result, word));
// }

const wrapper = document.querySelector(".wrapper");
searchInput = wrapper.querySelector("input");
infoText = wrapper.querySelector(".info-text");
clearIcon = wrapper.querySelector(".search span")

const dataProcessing = (result, word) => {
    console.log({ result });
    if (result.title) {
        infoText.innerHTML = `<span>This word :${word} cannot be found here</span>`
    } else {
        wrapper.classList.add("active");
        let definitions = result[0].meanings[0].definitions[0];
        let synonyms = result[0].meanings[0].synonyms[0];
        phonetics = `commonly pronunced as: ${result[0].phonetics[0].text} `;
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        // document.querySelector(".synonym span").innerText = synonyms && `no similar words`;




    }


}

const queryAPI = word => {
    infoText.style.color = "#000";
    wrapper.classList.remove("active");
    infoText.innerHTML = `<span>Looking for the meaning of: ${word}</span>`;
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => dataProcessing(res.data, word))
        // .catch(err => console.log(err));
}






searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && e.target.value) {
        queryAPI(e.target.value);
    }

})

clearIcon.addEventListener("click", () => {
    searchInput.value = " ";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = `Type any existing word and press enter to get meaning, example, synonyms, etc.`;



})