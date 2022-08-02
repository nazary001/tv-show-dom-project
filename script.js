let root = document.querySelector('#root');

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function formatSeazonAndNumber(number ){
  return number >= 10 ? number : `0${number}`;
}

function makePageForEpisodes(episodeList) {
  const root = document.getElementById("root");
  episodeList.forEach(epis => {
    let episode = document.createElement('div');
    episode.className = 'episodes';
    let episodeName = document.createElement('h1');
    episodeName.className = 'episode_names';
    let episodeImg = document.createElement('img');
    episodeImg.className = 'episode_imgs';
    let episodeSummary = document.createElement('p');
    episodeSummary.className = 'episode_summarys';
    
    episodeName.innerText = `${epis.name} S${formatSeazonAndNumber(epis.season)}E${formatSeazonAndNumber(epis.number)}`;
    episodeImg.src = epis.image.medium;
    episodeSummary.innerHTML = epis.summary;

    episode.appendChild(episodeName);
    episode.appendChild(episodeImg);
    episode.appendChild(episodeSummary);
    root.appendChild(episode);
  })
}



window.onload = setup;
