
let infoSection = document.querySelector('#wrapper')

let search = document.querySelector('#search');

let submit = document.querySelector('#submit');

let playSample = document.querySelector('audio');

//  ---   //   ---    //   ---    //   ---    //   ---    //    ---   //



function getMusic() {

//    ---   These lines clear the page   ---   //
  while (infoSection.hasChildNodes()) {
    infoSection.removeChild(infoSection.firstChild);
  }

//    ---   Begin data retrieval for page population    ---   //
fetch (`https://itunes.apple.com/search?term=${search.value}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
      for (let j = 0; j < 6; j++) {

      let i = Math.floor(Math.random() * data.results.length);

      let musicInfo = document.createElement('div');
      let att = document.createAttribute('class');
      att.value = 'musicInfo';
      musicInfo.setAttributeNode(att);

      musicInfo.style.backgroundImage = `url(${data.results[i].artworkUrl100})`

      musicInfo.innerHTML = data.results[i].trackName;

      musicInfo.addEventListener('click', function() {
        playSample.src = data.results[i].previewUrl
        playSample.autoplay = true;
      });

      infoSection.appendChild(musicInfo);
  }
  });
}


//    //    //    Event Listeners here    //    //    //    //    //
submit.addEventListener('click', getMusic);

search.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    getMusic();
  }
});
