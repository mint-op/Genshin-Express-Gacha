document.addEventListener('DOMContentLoaded', async function () {
  const callback = (responseStatus, responseData) => {
    // console.log('responseStatus:', responseStatus);
    // console.log('responseData:', responseData);

    const weaponList = document.getElementById('weaponList');

    responseData.forEach((weap) => {
      const displayItem = document.createElement('div');
      displayItem.classList = 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3 d-flex align-items-stretch';
      const rarity = `<span style="font-size: 25px">${'✦'.repeat(weap.rarity)}<span style="color:#808080; font-size: 25px;">${'✦'.repeat(
        5 - weap.rarity
      )}</span></span>`;

      displayItem.innerHTML = `
          <div class="card">
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
        `;
      weaponList.appendChild(displayItem);
    });
  };

  fetchMethod(currentUrl + '/api/inv/allWeap', callback);
});
