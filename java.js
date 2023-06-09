const showButton = document.querySelector('#show-button');
const showList = document.querySelector('#show-list');
const showSearchBar = document.querySelector('#tv-search');

const showData = async () => {
    try {
        const searchBarData = showSearchBar.value
        const rawData = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchBarData}`);
        return rawData.data
    } catch (err) {
        console.log(err);
    }
}

const showNameFunc = async () => {
    try {
    const rawData = await showData()
    const showName = rawData[0].show.name
    const showListItem = document.createElement('li');
    showListItem.textContent = showName
    showListItem.style.fontSize = '30px'
    showListItem.style.fontWeight = 'bold'
    return showListItem}
    catch {searchError()}

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
    const genreTitle = document.createElement('li');
    genreTitle.textContent = 'Genres:';
    genreTitle.style.fontWeight = 'bold';
    genreList.append(genreTitle)
    for (i = 0; i < showGenres.length; i++) {
        const genreListItem = document.createElement('li');
        genreListItem.textContent = showGenres[i];
        genreSubList.append(genreListItem);
        genreListItem.style.marginBlock = '10px';
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
    clearSearch();
    const errorItem = document.createElement('li');
    errorItem.textContent = 'Invalid search. Please try again';
    errorItem.style.marginTop = '2vh';
    errorItem.style.fontSize ='2em';
    errorItem.style.color = 'red';
    showList.append(errorItem);
}
const clearSearch = () => {
    if (!!showList.firstChild) {
    try {
    setTimeout(()=> {
    showList.removeChild(showList.firstChild)
    },500)
    }
    catch {}
    }
    else {}
}

const clearSearchInput = ()=> {
    showSearchBar.value = ''
}
showButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearSearch();
    setTimeout(() => {
    showListSection();
    }, 500);
    setTimeout(()=>{
    clearSearchInput();
    },1000)
})