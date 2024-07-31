document.addEventListener('DOMContentLoaded', async function () {
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    const characterList = document.getElementById('characterList');

    responseData.forEach((char) => {
      if (char.name != 'Traveler') {
        const displayItem = document.createElement('div');
        displayItem.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 d-flex align-items-stretch';
        const rarity = `<span style="font-size: 25px">${'✦'.repeat(char.rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
          5 - char.rarity
        )}</span></span>`;
        displayItem.innerHTML = `
        <div class="card">
            <div class="card-img char-img">
              <img src="${currentUrl}/assets/characters/${char.name
          .toLowerCase()
          .replace(' ', '-')}/card" alt="" class="card-img" loading="lazy"/>
            </div>
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <img src="${currentUrl}/assets/elements/${char.vision_key.toLowerCase()}/icon" alt="" class="img-fluid" style="width: 40px; height: 40px;" loading="lazy"/>
                    <div class="ms-3"><h5 class="card-title">${char.name}</h5></div>
                </div>
                <div class="card-text pt-2">
                    <div>
                        <img src="assets/img/sword-logo.png" style="width:25px;color:gray"> ${
                          char.weapon_type.charAt(0).toUpperCase() + char.weapon_type.slice(1).toLowerCase()
                        }
                    </div>
                    <div>${char.title}</div>
                </div>
            </div>
            <div class="card-footer">
                ${rarity}
            </div>
        </div>
      `;
        characterList.appendChild(displayItem);
      }
    });
  };

  fetchMethod(currentUrl + '/api/inv/allChar', callback);
});
