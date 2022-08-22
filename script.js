const root = document.querySelector('#root');
const searchInput = document.querySelector('#search_input');
const numberOfEpisodes = document.querySelector('#number_of_episodes');
const selectEpisode = document.querySelector('#episode_select');
const selectShow = document.querySelector('#show_select');

const allShows = getAllShows();

let allEpisodes = '';

function makePageForShows(showList){
  showList.forEach(show => {
    let showOption = document.createElement('option');
    showOption.innerText = show.name;
    showOption.value = show.id;

    selectShow.appendChild(showOption);
  })
  
}

selectShow.addEventListener('change', event => {
  fetch(`https://api.tvmaze.com/shows/${event.target.value}/episodes`)
  .then(response => response.json())
  .then(data => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);
  });
})

searchInput.addEventListener('keyup', searchEpisode);

//You can edit ALL of the code here
function setup() {
  makePageForShows(allShows);
}

function makePageForEpisodes(episodeList) {
  root.replaceChildren([]);
  episodeList.forEach(episode => {
    let episodeDiv = document.createElement('div');
    episodeDiv.className = 'episodes';
    let episodeName = document.createElement('h1');
    episodeName.className = 'episode_names';
    let episodeImg = document.createElement('img');
    episodeImg.className = 'episode_imgs';
    let episodeSummary = document.createElement('p');
    episodeSummary.className = 'episode_summarys';
    let episodeOption = document.createElement('option');
    episodeOption.value = episode.name;
    
    episodeName.innerText = `${episode.name} S${episode.season.toString().padStart(2, '0')}E${episode.number.toString().padStart(2, '0')}`;
    episodeImg.src = episode.image.medium;
    episodeSummary.innerHTML = episode.summary;
    episodeOption.textContent = `S${episode.season.toString().padStart(2, '0')}E${episode.number.toString().padStart(2, '0')} - ${episode.name}`;

    episodeDiv.appendChild(episodeName);
    episodeDiv.appendChild(episodeImg);
    episodeDiv.appendChild(episodeSummary);
    root.appendChild(episodeDiv);
    selectEpisode.appendChild(episodeOption);
  })
}

function searchEpisode(event){
  let searchValue = event.target.value.toLowerCase();
  let foundEpisodes = allEpisodes.filter((episode) => {
   return episode.name.toLowerCase().includes(searchValue) || episode.summary.toLowerCase().includes(searchValue);
  })
  makePageForEpisodes(foundEpisodes);
  numberOfEpisodes.innerText = `Displaying ${foundEpisodes.length}/${allEpisodes.length} episodes`;
}

selectEpisode.addEventListener('change', (evnt) => {
  if(evnt.target.value === 'all_episodes'){
    makePageForEpisodes(allEpisodes);
  }
  else{
    let foundEpisode = allEpisodes.filter((episode) => {
    return evnt.target.value === episode.name ? true : false;
    })
  makePageForEpisodes(foundEpisode);
  }
  
})


window.onload = setup;