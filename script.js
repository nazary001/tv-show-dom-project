const root = document.querySelector('#root');
const searchInput = document.querySelector('#search_input');
const numberOfShowsAndEpisodes = document.querySelector('#number_of_shows_and_episodes');
const selectShowAndEpisode = document.querySelector('#show_and_episode_select');

const allShows = getAllShows();

let isEpisodesClicked = false;

let allEpisodes = '';

function makePageForShows(showList){
  root.replaceChildren([]);
  selectShowAndEpisode.replaceChildren([]);

  numberOfShowsAndEpisodes.innerText = `Found ${showList.length} show(s)`;

  let allShowsOption = document.createElement('option');
  allShowsOption.value = 'all_shows';
  allShowsOption.innerText = 'All Shows';
  selectShowAndEpisode.appendChild(allShowsOption);

  showList.forEach(show => {
    let showDiv = document.createElement('div');
    showDiv.className = 'show';
    let contentShowDiv = document.createElement('div');
    contentShowDiv.className = 'content_show';
    let showName = document.createElement('h2');
    showName.className = 'showName';
    let showImg = document.createElement('img');
    showImg.className = 'show_img';
    let showSummary = document.createElement('div');
    showSummary.className = 'show_summary';
    let additionalShowInfoDiv = document.createElement('div');
    additionalShowInfoDiv.className = 'additional_show_info';
    let raitedShow = document.createElement('p');
    let genresShow = document.createElement('p');
    let statusShow = document.createElement('p');
    let runtimeShow = document.createElement('p');

    showName.innerText = show.name;
    showImg.src = show.image.medium;
    showSummary.innerHTML = show.summary;
    raitedShow.innerText = `Rated: ${show.rating.average}`;
    genresShow.innerText = `Genres: ${show.genres}`;
    statusShow.innerText = `Status: ${show.status}`;
    runtimeShow.innerText = `Runtime: ${show.runtime}`;


    showDiv.appendChild(showName);
    contentShowDiv.appendChild(showImg);
    contentShowDiv.appendChild(showSummary);
    additionalShowInfoDiv.appendChild(raitedShow);
    additionalShowInfoDiv.appendChild(genresShow);
    additionalShowInfoDiv.appendChild(statusShow);
    additionalShowInfoDiv.appendChild(runtimeShow);
    contentShowDiv.appendChild(additionalShowInfoDiv);
    showDiv.appendChild(contentShowDiv);
    root.appendChild(showDiv);

    let showOption = document.createElement('option');

    showOption.value = show.name;
    showOption.innerText = show.name;
    selectShowAndEpisode.appendChild(showOption);

    showName.addEventListener('click', () => {
      fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
      .then(response => response.json())
      .then(data => {
        allEpisodes = data;
        makePageForEpisodes(allEpisodes);
      })
    })
  })
}

searchInput.addEventListener('keyup', searchShow);

function makePageForEpisodes(episodeList) {
  root.replaceChildren([]);
  selectShowAndEpisode.replaceChildren([]);

  numberOfShowsAndEpisodes.innerText = `Found ${episodeList.length} episode(s)`;

  let allEpisodesOption = document.createElement('option');
  allEpisodesOption.value = 'all_episodes';
  allEpisodesOption.innerText = 'All Episodes';
  selectShowAndEpisode.appendChild(allEpisodesOption);

  episodeList.forEach(episode => {
    let episodeDiv = document.createElement('div');
    episodeDiv.className = 'episode';
    let contentEpisodeDiv = document.createElement('div');
    contentEpisodeDiv.className = 'content_episode';
    let episodeName = document.createElement('h2');
    episodeName.className = 'episode_name';
    let episodeImg = document.createElement('img');
    episodeImg.className = 'episode_img';
    let episodeSummary = document.createElement('div');
    episodeSummary.className = 'episode_summary';
    
    episodeName.innerText = `${episode.name} S${episode.season.toString().padStart(2, '0')}E${episode.number.toString().padStart(2, '0')}`;
    episodeImg.src = episode.image.medium;
    episodeSummary.innerHTML = episode.summary;
    

    episodeDiv.appendChild(episodeName);
    contentEpisodeDiv.appendChild(episodeImg);
    contentEpisodeDiv.appendChild(episodeSummary);
    episodeDiv.appendChild(contentEpisodeDiv);
    root.appendChild(episodeDiv);

    let episodeOption = document.createElement('option');

    episodeOption.value = episode.name;
    episodeOption.innerText = episode.name;
    selectShowAndEpisode.appendChild(episodeOption);

    isEpisodesClicked = true;
  })
}

function searchShow(event){
  let searchValue = event.target.value.toLowerCase();
  if(!isEpisodesClicked){
    if(searchValue.length >= 3){
      let foundShows = allShows.filter((show) => {
        return show.name.toLowerCase().includes(searchValue) || show.summary.toLowerCase().includes(searchValue);
      }) 
      makePageForShows(foundShows);
    }
    else{
      makePageForShows(allShows);
    }
  }
  else if(isEpisodesClicked){
    if(searchValue.length >= 3){
      let foundEpisodes = allEpisodes.filter((episode) => {
        return episode.name.toLowerCase().includes(searchValue) || episode.summary.toLowerCase().includes(searchValue);
      }) 
      makePageForEpisodes(foundEpisodes);
    }
    else{
      makePageForEpisodes(allEpisodes);
    }
  }
}

selectShowAndEpisode.addEventListener('change', (evnt) => {
  if(evnt.target.value === 'all_shows'){
    makePageForShows(allShows);
  }
  else if(evnt.target.value === 'all_episodes'){
    makePageForEpisodes(allEpisodes);
  }
  else if(!isEpisodesClicked){
    let foundShows = allShows.filter((show) => {
      return evnt.target.value === show.name ? true : false;
    })
    makePageForShows(foundShows);
  }
  else if(isEpisodesClicked){
    let foundEpisode = allEpisodes.filter((episode) => {
      return evnt.target.value === episode.name ? true : false;
      })
      makePageForEpisodes(foundEpisode);
  }
})

function setup() {
  makePageForShows(allShows);
}

window.onload = setup;