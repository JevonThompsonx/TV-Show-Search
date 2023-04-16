# TV-Show-Search 📺

 A search website using the TV Maze APi to return results  

## Instructions 📖

Type in the name of desired show then submit using the submit button/enter key  

## How it works 🐱‍👓

- The search uses the [TV Maze API](https://www.tvmaze.com) to return results  
  1. The Api is searched then returns the name of the show, it's image and genres
  2. A list (***list a***) is created with the name, image, and genres  
      - A second list (***list b***) is nested inside of the ***list a*** containing the genre types
  3. Results are returned to the DOM tree, loading ***list a*** visually
