var curr_index = 0;

document.addEventListener('DOMContentLoaded', async function () {
  /**
   * Initializes the carousel and sets up a MutationObserver to track changes in the active item.
   */
  const initCarousel = () => {
    // Get the carousel element
    const carousel = document.getElementById('carouselExample');
    // Get all items inside the carousel
    const carouselItems = Array.from(carousel.querySelectorAll('.carousel-item'));

    // Configuration for the MutationObserver
    const observerConfig = { attributes: true, attributeFilter: ['class'] };

    // Callback function for the MutationObserver
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        // Check if the 'class' attribute has changed
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          let targetElement = mutation.target;
          // Find the index of the target element in the carouselItems array
          let index = carouselItems.indexOf(targetElement);
          let hasActiveClass = targetElement.classList.contains('active');
          // If the target element has the 'active' class, update the curr_index and log a message
          if (hasActiveClass) {
            curr_index = index; // Assuming curr_index is defined elsewhere
            console.log(`Class 'active' added to item at index: ${index}`);
          }
        }
      }
    };

    // Create a new MutationObserver with the callback function
    const observer = new MutationObserver(callback);

    // Observe each item in the carousel
    carouselItems.forEach((item) => {
      observer.observe(item, observerConfig);
    });
  };

  const getPrimogem = async () => {
    const getPrimogem = new Promise((resolve, reject) => {
      const callback = (responseStatus, responseData) => {
        if (responseStatus == 200) {
          resolve(responseData);
        } else {
          reject();
        }
      };

      fetchMethod(currentUrl + '/api/game', callback, 'GET', null, localStorage.getItem('token'));
    });
    // Primogem data
    const primogem = document.getElementById('d-primogem');
    const primogemValue = await getPrimogem;

    //   console.log(primogemValue);
    primogem.innerHTML = `
    <div class="primogem-bar">
        <div class="primogems">
          <button class="primogem">
            <img
              src="./assets/img/logo-primo.webp"
              alt="primogem"
              width="auto"
              height="80%"
              style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%)"
            />
            ${primogemValue[0].primogems}
          </button>
        </div>
    </div>
  `;
  };

  initCarousel();
  getPrimogem();
});

async function wish(type) {
  console.log(curr_index);
  console.log(type);

  const carousel = document.getElementById('carousel-div');
  const wishbtn = document.getElementById('wishbtn');
  const launch_modal = document.getElementById('launch-modal');
  const d_primogem = document.getElementById('d-primogem');

  // videos
  const r3_single = document.getElementById('3star-single');
  const r4_single = document.getElementById('4star-single');
  const r4_multi = document.getElementById('4star-multi');
  const r5_single = document.getElementById('5star-single');
  const r5_multi = document.getElementById('5star-multi');

  const wish_result = await new Promise((resolve, reject) => {
    const banner = curr_index == 0 ? 'char' : 'weap';
    const pull = type == 'single' ? '' : 'multi/';

    const callback = (responseStatus, responseData) => {
      if (responseStatus == 200) {
        const primogems = responseData.pop();

        updatePrimo(primogems);
        resolve(responseData);
      } else {
        reject();
      }
    };

    fetchMethod(currentUrl + `/api/gacha/${pull}${banner}`, callback, 'GET', null, localStorage.getItem('token'));
  });

  if (wish_result.some((item) => item.rarity == '5') && type == 'single') {
    r5_single.style.display = 'unset';
    r5_single.play();

    setTimeout(() => {
      r5_single.style.display = 'none';
    }, 6500);
  } else if (wish_result.some((item) => item.rarity == '5') && type == 'multi') {
    r5_multi.style.display = 'unset';
    r5_multi.play();

    setTimeout(() => {
      r5_multi.style.display = 'none';
    }, 6500);
  } else if (wish_result.some((item) => item.rarity == '4') && type == 'single') {
    r4_single.style.display = 'unset';
    r4_single.play();

    setTimeout(() => {
      r4_single.style.display = 'none';
    }, 6500);
  } else if (type == 'multi') {
    r4_multi.style.display = 'unset';
    r4_multi.play();

    setTimeout(() => {
      r4_multi.style.display = 'none';
    }, 6500);
  } else if (type == 'single') {
    r3_single.style.display = 'unset';
    r3_single.play();

    setTimeout(() => {
      r3_single.style.display = 'none';
    }, 6500);
  }

  carousel.classList.add('d-none');
  wishbtn.classList.add('d-none');
  launch_modal.classList.add('d-none');
  d_primogem.classList.add('d-none');

  // For gacha display
  const layouts = document.getElementById('layouts');
  wish_result.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList = 'layout-item container-fluid single d-flex justify-content-center align-items-center d-none';
    const folder = item.character_id != undefined ? 'characters' : 'weapons';
    const elements =
      item.character_id != undefined
        ? `<div><img src="${currentUrl}/assets/elements/${item.vision_key
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace("'", '')}/icon" class="img-fluid" alt="" /></div>`
        : '';

    itemDiv.innerHTML = `
        <div class="d-flex position-fixed w-100-custom">
            ${elements}
            <div class="px-3">
              <div style="font-size: 30px; color: white">${item.name}</div>
              <div style="font-size: 20px">${'⭐'.repeat(item.rarity)}</div>
            </div>
        </div>
        <div class="img-container">
            <img src="${currentUrl}/assets/${folder}/${item.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace("'", '')}/gacha-splash" class="img-fluid" alt="" />
        </div>
    `;

    layouts.appendChild(itemDiv);
  });

  display();

  function updatePrimo(wish_result) {
    const primogem = document.getElementById('d-primogem');
    primogem.innerHTML = `
    <div class="primogem-bar">
        <div class="primogems">
          <button class="primogem">
            <img
              src="./assets/img/logo-primo.webp"
              alt="primogem"
              width="auto"
              height="80%"
              style="position: absolute; left: 5px; top: 50%; transform: translateY(-50%)"
            />
            ${wish_result.remaining_primogems}
          </button>
        </div>
    </div>
  `;
  }

  function display() {
    const layouts = document.getElementById('layouts');
    const layout_item = Array.from(layouts.querySelectorAll('.layout-item'));

    layouts.classList.remove('d-none');
    layout_item[0].classList.remove('d-none');

    layout_item.forEach((item, idx) => {
      item.addEventListener('click', () => {
        item.classList.add('d-none');
        if (idx + 1 < layout_item.length) {
          layout_item[idx + 1].classList.remove('d-none');
        } else {
          carousel.classList.remove('d-none');
          wishbtn.classList.remove('d-none');
          launch_modal.classList.remove('d-none');
          d_primogem.classList.remove('d-none');
          document.getElementById('layouts').innerHTML = '';
        }
      });
    });

    // carousel.classList.remove('d-none');
    // wishbtn.classList.remove('d-none');
    // launch_modal.classList.remove('d-none');
    // d_primogem.classList.remove('d-none');

    // document.getElementById('layouts').innerHTML = '';
  }
}
