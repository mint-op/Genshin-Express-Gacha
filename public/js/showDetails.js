document.addEventListener('DOMContentLoaded', function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const charId = urlParams.get('charId');
  const weaponId = urlParams.get('weapId');

  const attrbtn = document.getElementById('attrbtn');
  const weaponbtn = document.getElementById('weaponbtn');
  const profilebtn = document.getElementById('profilebtn');

  if (charId != null) {
    loadCharData(charId);
    attrbtn.addEventListener('click', function () {
      loadCharData(charId);
    });
    weaponbtn.addEventListener('click', function () {
      loadCharWeap(charId);
    });
    profilebtn.addEventListener('click', function () {
      loadCharProfile(charId);
    });
  }
});

function loadCharData(charId) {
  const callback = (responseStatus, responseData) => {
    // console.log(responseData);
    const attr = document.getElementById('attr');
    const img = document.getElementById('placeholderImg');

    const rarity = `${'✦'.repeat(responseData.rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
      5 - responseData.rarity
    )}</span><br />`;

    img.innerHTML = `<img src="${currentUrl}/assets/characters/${responseData.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace("'", '')}/portrait" alt="" class="img-fluid" />`;

    attr.innerHTML = `
      <h2 style="font-family: Georgia; font-weight: 550; font-size: 25px; line-height: 28px">
        <span>${responseData.name}</span><br />
        ${rarity}
        Level ${responseData.character_level}<span style="color: #808080"> / 90</span>
      </h2>
      
      <div class="progress my-2 rounded-1">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 50%; height: 5px; background: #29c6e5"
        ></div>
      </div>

      <div class="row" style="justify-content: space-between">
        <div class="col" style="line-height: 30px; display: block; font-family: Georgia">
          <img src="assets/img/health-logo.png" style="width: 25px" /> Max HP<br />
          <img src="assets/img/sword-logo.png" style="width: 25px; color: gray" />
          ATK<br />
          <img src="assets/img/def-logo.png" style="width: 25px; color: gray" />
          DEF<br />
        </div>
        <div class="col" style="line-height: 30px; text-align: right">
          <p>
            <!-- HP -->${responseData.health.toFixed(2)}<br />
            <!-- ATK -->${(responseData.atk + responseData.totalAttack).toFixed(2)}<br />
            <!-- DEF -->${responseData.def.toFixed(2)}<br />
          </p>
        </div>
      </div>

      <div class="p-2" style="margin-top: 5px">
        <span style="float: left"
          ><img src="https://f2.toyhou.se/file/f2-toyhou-se/images/52673769_qluIUaelkOsMiSL.png" style="width: 20px" />
          Description </span
        >
      </div>
      <div class="progress my-2 rounded-1">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 70%; height: 5px; background: #aca3fb"
        ></div>
      </div>
      <p style="color: gray">
        ${responseData.description}
      </p>
    `;
  };

  fetchMethod(currentUrl + '/api/inv/characters/' + charId, callback, 'GET', null, localStorage.getItem('token'));
}

function loadCharWeap(charId) {
  const callback = (responseStatus, responseData) => {
    // console.log(responseData);
    const weap = document.getElementById('weapon');
    const img = document.getElementById('placeholderImg');

    const rarity = `${'✦'.repeat(responseData.weapon_rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
      5 - responseData.weapon_rarity
    )}</span><br />`;

    img.innerHTML = `<img src="${currentUrl}/assets/weapons/${responseData.weapon_name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace("'", '')}/protrait" alt="" class="img-fluid" />`;

    weap.innerHTML = `
      <div>
        <h2 style="font-family: Georgia; font-weight: 550; font-size: 25px; line-height: 28px">${responseData.weapon_name}<br /></h2>
        <p style="font-size: 19px; color: #808080">${responseData.weapon_type}</p>
        <p class="p-2" style="background: rgba(100, 100, 100, 0.1); border-radius: 5px">
          Base ATK
          <span style="float: right">${responseData.totalAttack.toFixed(2)}</span>
        </p>
       
        <div class="flex row" style="align-items: center">
          <div>
            <span
              style="background: rgba(100, 100, 100, 0.1); border-radius: 5px; margin-left: 15px; margin-right: 5px"
              class="p-1 mr-2"
              >Lv. ${responseData.weapon_level} / 90</span
            >
          </div>
          <!-- use "✦" for stars -->
          <div>
            <p style="font-size: 30px; letter-spacing: 2px">
              ${rarity}
            </p>
          </div>
        </div>
      </div>
      `;
  };

  fetchMethod(currentUrl + '/api/inv/characters/' + charId, callback, 'GET', null, localStorage.getItem('token'));
}

function loadCharProfile(charId) {
  const callback = (responseStatus, responseData) => {
    console.log(responseData);
    const profile = document.getElementById('profile');
    const img = document.getElementById('placeholderImg');

    img.innerHTML = `<img src="${currentUrl}/assets/characters/${responseData.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace("'", '')}/portrait" alt="" class="img-fluid" />`;

    profile.innerHTML = `
      <div class="p-2" style="font-family: georgia; font-size: 17px; line-height: 30px">
        <h1>${responseData.name}</h1>
        <br />
        <hr style="margin-top: -10px" />
        
        <div>Birthday <span style="float: right">${responseData.birthday}</span></div>
        <div>Affiliation <span style="float: right">${responseData.affiliation}</span></div>
        <div>Vision <span style="float: right">${
          responseData.vision_key.charAt(0) + responseData.vision_key.slice(1).toLowerCase()
        }</span></div>
        <div>
        Constellation
        <span style="float: right">${responseData.constellation}</span><br />
        </div>
        <br />
        <p style="color: gray">
        ${responseData.description}
        </p>
        
      </div>
    `;
  };

  fetchMethod(currentUrl + '/api/inv/characters/' + charId, callback, 'GET', null, localStorage.getItem('token'));
}
