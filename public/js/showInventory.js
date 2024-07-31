document.addEventListener('DOMContentLoaded', function () {
  const character = document.getElementById('tab-character');
  const weapon = document.getElementById('tab-weapon');

  const characterList = document.getElementById('characterList');
  const weaponList = document.getElementById('weaponList');

  const callbackCharList = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    responseData
      .sort((a, b) => b.rarity - a.rarity)
      .forEach((char) => {
        const displayItem = document.createElement('div');
        displayItem.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 d-flex align-items-stretch';
        const rarity = `<span style="font-size: 25px">${'✦'.repeat(char.rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
          5 - char.rarity
        )}</span></span>`;
        displayItem.innerHTML = `
        <a href="details.html?charId=${char.user_character_id}">
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
        </a>
      `;
        characterList.appendChild(displayItem);
      });
  };

  const callbackWeapList = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    responseData
      .sort((a, b) => b.rarity - a.rarity)
      .forEach((weap) => {
        const displayItem = document.createElement('div');
        displayItem.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 d-flex align-items-stretch';
        const rarity = `<span style="font-size: 25px">${'✦'.repeat(weap.rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
          5 - weap.rarity
        )}</span></span>`;

        displayItem.innerHTML = `
          <a href="#">
          <div class="card" id="weap-${weap.user_weapon_id}">
              <div class="card-img weap-img">
                <img src="${currentUrl}/assets/weapons/${weap.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace("'", '')}/icon" alt="" class="card-img" loading="lazy"/>
              </div>
              <div class="card-body">
                <h5 class="card-title">${weap.name}</h5>
                <div class="card-text">
                    <div>
                        <img src="assets/img/sword-logo.png" style="width:25px;color:gray"><span style="color:gray;">ATK</span>&nbsp;&nbsp;${
                          weap.baseAttack
                        }
                    </div>
                    <div>
                        <img src="assets/img/sword-logo.png" style="width:25px;color:gray"><span style="color:gray;">Type</span> ${
                          weap.type.charAt(0).toUpperCase() + weap.type.slice(1).toLowerCase()
                        }
                    </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="d-flex align-items-center">
                    ${rarity}
                </div>
              </div>
          </div>
          </a>
        `;
        weaponList.appendChild(displayItem);
      });
  };

  character.addEventListener('click', function () {
    character.classList.add('active');
    weapon.classList.remove('active');
    characterList.classList.remove('d-none');
    weaponList.classList.add('d-none');
  });

  weapon.addEventListener('click', function () {
    weapon.classList.add('active');
    character.classList.remove('active');
    weaponList.classList.remove('d-none');
    characterList.classList.add('d-none');
  });

  fetchMethod(currentUrl + '/api/inv/characters', callbackCharList, 'GET', null, localStorage.getItem('token'));
  fetchMethod(currentUrl + '/api/inv/weapons', callbackWeapList, 'GET', null, localStorage.getItem('token'));
});
