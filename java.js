const showButton = document.querySelector('#show-button');
const showList = document.querySelector('#show-list');
const showSearchBar = document.querySelector('#tv-search');

const showData = async () => {
    try {
        const searchBarData = showSearchBar.value
        const rawData = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchBarData}`);
        if (rawData === '') {
            errorHeader();
        }
        else  {
        return rawData.data
        }
    } catch (err) {
        console.log(err);
    }
}


const showNameFunc = async () => {
    const rawData = await showData()
    const showName = rawData[0].show.name
    const showListItem = document.createElement('li');
    showListItem.textContent = showName
    showListItem.style.fontSize = '30px'
    showListItem.style.fontWeight = 'bold'
    return showListItem
}
const showImageFunc = async () => {
    const rawData = await showData()
    const showImageUrl = rawData[0].show.image.medium
    const showListItem = document.createElement('img');
    showListItem.setAttribute('src', showImageUrl);
    showListItem.setAttribute('height', '300px');
    showListItem.setAttribute('width', '300px');
    const showImageLi = document.createElement('li');
    showImageLi.append(showListItem);
    return showImageLi
}
const showGenreFunc = async () => {
    const rawData = await showData()
    const showGenres = rawData[0].show.genres
    const genreList = document.createElement('li');
    const genreSubList = document.createElement('ul');
    for (i = 0; i < showGenres.length; i++) {
        const genreListItem = document.createElement('li');
        genreListItem.textContent = showGenres[i];
        genreSubList.append(genreListItem);
    }
    genreList.append(genreSubList)
    return genreList
}
const showListSection = async () => {
    
    const newList = document.createElement('ul');
    const name = await showNameFunc()
    const image = await showImageFunc()
    const genre = await showGenreFunc()
    newList.classList.add('searchedList')
    newList.append(name)
    newList.append(image)
    newList.append(genre)
    showList.append(newList);
}   
const searchError = () => {
    const errorItem = document.createElement('li')
    const errorHeader = document.createElement('h3');
    errorHeader.style.textContent = 'Invalid search. Please try again';
    errorItem.append(errorHeader);
    showList.append(errorItem);
}
// const clearSearch = () => {
//     try {

//     }
// }
showButton.addEventListener('click', (event) => {
    event.preventDefault();
    showListSection();
})

//goal: Make it so that with every submit, the search bar result is searched through the tv maze API and results are returned
//goal ACHIEVED YESSSIRR
//LESSON: always use await 
//biggest problems: 
//                  Nesting lists
//                  Not awaiting functions that pull from an API (lines 89-91)