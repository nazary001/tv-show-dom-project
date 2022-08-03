const root = document.querySelector('#root');
const searchInput = document.querySelector('#search_input');
const numberOfEpisodes = document.querySelector('#number_of_episodes');
const selectEpisode = document.querySelector('#episode_select');

searchInput.addEventListener('keyup', startSearch);


//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function formatSeazonAndNumber(number ){
  return number >= 10 ? number : `0${number}`;
}

function makePageForEpisodes(episodeList) {
  root.replaceChildren([]);
  episodeList.forEach(epis => {
    let episode = document.createElement('div');
    episode.className = 'episodes';
    let episodeName = document.createElement('h1');
    episodeName.className = 'episode_names';
    let episodeImg = document.createElement('img');
    episodeImg.className = 'episode_imgs';
    let episodeSummary = document.createElement('p');
    episodeSummary.className = 'episode_summarys';
    let episodeOption = document.createElement('option');
    episodeOption.value = epis.name;
    
    episodeName.innerText = `${epis.name} S${formatSeazonAndNumber(epis.season)}E${formatSeazonAndNumber(epis.number)}`;
    episodeImg.src = epis.image.medium;
    episodeSummary.innerHTML = epis.summary;
    episodeOption.textContent = `S${formatSeazonAndNumber(epis.season)}E${formatSeazonAndNumber(epis.number)} - ${epis.name}`;

    episode.appendChild(episodeName);
    episode.appendChild(episodeImg);
    episode.appendChild(episodeSummary);
    root.appendChild(episode);
    selectEpisode.appendChild(episodeOption);
  })
}

function startSearch(){
  const allEpisodes = getAllEpisodes();
  let searchValue = searchInput.value.toLowerCase();
  let foundEpisodes = allEpisodes.filter((episode) => {
   return episode.name.toLowerCase().includes(searchValue) || episode.summary.toLowerCase().includes(searchValue);
  })
  makePageForEpisodes(foundEpisodes);
  numberOfEpisodes.innerText = `Displaying ${foundEpisodes.length}/${allEpisodes.length} episodes`;
}

selectEpisode.addEventListener('change', (evnt) => {
  if(evnt.target.value === 'all_episodes'){
    const allEpisodes = getAllEpisodes();
    makePageForEpisodes(allEpisodes);
  }
  else{
    const allEpisodes = getAllEpisodes();
    let foundEpisode = allEpisodes.filter((episode) => {
    return evnt.target.value === episode.name ? true : false;
    })
  makePageForEpisodes(foundEpisode);
  }
  
})


window.onload = setup;
