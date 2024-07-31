const model = require('../models/gameModel');
const fs = require('fs');

module.exports.gacha = async (data) => {
  // * Store the result in the object
  var gacha_result = [];
  var banner = '';

  // * In case character drop then the character is given default weapon
  const default_weap = new Map([
    ['SWORD', 'Dull Blade'],
    ['BOW', "Hunter's Bow"],
    ['CATALYST', "Apprentice's Notes"],
    ['POLEARM', "Beginner's Protector"],
    ['CLAYMORE', 'Waster Greatsword'],
  ]);

  // * Get Required Data and wait for excution
  const characters = await getCharacters();
  const weapons = await getWeapons();

  // * Counters are from mysql userData table (counter5 + 1 if get 1 rarity5)
  var counter5 = data.counter5;
  var counter4 = data.counter4;

  // * Probalities for each drops (rarity5 = _rate5, etc..)
  const dropRates = {
    _rate5: 0.006,
    _rate4: 0.051,
    _pity5: 73,
    _pity4: 8,
  };

  const compute = (guarantee4 = false) => {
    const x = Math.random();
    let prob5 = dropRates._rate5 + Math.max(0, (counter5 - dropRates._pity5) * 10 * dropRates._rate5);
    let prob4 = dropRates._rate4 + Math.max(0, (counter4 - dropRates._pity4) * 10 * dropRates._rate5);

    if (guarantee4) {
      counter5 += 1;
      counter4 = 8;
      console.log('4', counter5, counter4); // * For Debuging
      // guarantee4 = true;
      drop('4star');
    } else if (x < prob5) {
      counter5 = 1;
      counter4 += 1;
      console.log('5', counter5, counter4); // * For Debuging
      // return drop('5star');
      drop('5star');
    } else if (x < prob4 + prob5) {
      counter5 += 1;
      counter4 = 1;
      console.log('4', counter5, counter4); // * For Debuging
      // return drop('4star');
      drop('4star');
    } else {
      counter5 += 1;
      counter4 += 1;
      console.log('3', counter5, counter4); // * For Debuging
      // return drop('3star');
      drop('3star');
    }
  };

  async function drop(rarity) {
    // * Get characters except 'Traveler' because it is default character
    const rarity5 = characters.filter((f) => f.rarity == 5 && f.name != 'Traveler');
    const rarity4 = characters.filter((f) => f.rarity == 4);
    // * Get all weapons
    const rarity5_weap = weapons.filter((f) => f.rarity == 5);
    const rarity4_weap = weapons.filter(
      (f) =>
        f.rarity == 4 &&
        (function (f) {
          const data = fs
            .readFileSync('src/assets/data/others/non-gacha-weap.txt', 'utf8')
            .split('\r\n')
            .some((data) => f.name.toLowerCase().replace(/\s+/g, '-').replace("'", '') == data);
          // console.log(f.name, f.name.toLowerCase().replace(/\s+/g, '-').replace("'", ''), data);
          return !data;
        })(f)
    );
    // * Get all weapons except default weapons
    const rarity3 = weapons.filter(
      (f) =>
        f.rarity == 3 &&
        f.name != default_weap.get('SWORD') &&
        f.name != default_weap.get('BOW') &&
        f.name != default_weap.get('CATALYST') &&
        f.name != default_weap.get('POLEARM') &&
        f.name != default_weap.get('CLAYMORE') &&
        (function (f) {
          const data = fs
            .readFileSync('src/assets/data/others/non-gacha-weap.txt', 'utf8')
            .split('\r\n')
            .some((data) => f.name.toLowerCase().replace(/\s+/g, '-').replace("'", '') == data);
          // console.log(f.name, f.name.toLowerCase().replace(/\s+/g, '-').replace("'", ''), data);
          return !data;
        })(f)
    );

    if (banner === 'char') {
      if (rarity === '5star') {
        const character = rarity5[Math.floor(Math.random() * rarity5.length)];
        const char_weapType = character.weapon_type;
        const weap_stat = weapons.find((f) => f.name == default_weap.get(char_weapType));

        gacha_result.push({
          ...character,
          weapon_id: weap_stat.weapon_id,
          weapon_name: weap_stat.name,
          type: weap_stat.type,
          weapon_rarity: weap_stat.rarity,
          baseAttack: weap_stat.baseAttack,
          subStat: weap_stat.subStat,
          counter: [counter5, counter4],
        });

        // return { character: character, weapon: weap_stat, counter: [counter5, counter4] };
      } else if (rarity === '4star') {
        const character = rarity4[Math.floor(Math.random() * rarity4.length)];
        const char_weapType = character.weapon_type;
        const weap_stat = weapons.find((f) => f.name == default_weap.get(char_weapType));

        gacha_result.push({
          ...character,
          weapon_id: weap_stat.weapon_id,
          weapon_name: weap_stat.name,
          type: weap_stat.type,
          weapon_rarity: weap_stat.rarity,
          baseAttack: weap_stat.baseAttack,
          subStat: weap_stat.subStat,
          counter: [counter5, counter4],
        });

        // return { character: character, weapon: weap_stat, counter: [counter5, counter4] };
      } else if (rarity === '3star') {
        const weapon = rarity3[Math.floor(Math.random() * rarity3.length)];

        gacha_result.push({
          ...weapon,
          counter: [counter5, counter4],
        });

        // return { weapon: weapon, counter: [counter5, counter4] };
      }
    } else if (banner === 'weap') {
      if (rarity === '5star') {
        const weapon = rarity5_weap[Math.floor(Math.random() * rarity5_weap.length)];

        gacha_result.push({
          ...weapon,
          counter: [counter5, counter4],
        });
      } else if (rarity === '4star' || rarity === '3star') {
        const weapon = rarity4_weap[Math.floor(Math.random() * rarity4_weap.length)];
        // Reset counter4 to default because weapon banner only have 5 and 4 star
        counter4 = data.counter4;
        gacha_result.push({
          ...weapon,
          counter: [counter5, counter4],
        });
      }
    }
  }

  return {
    single(bannerType) {
      banner = bannerType;
      compute();
      const result = gacha_result;
      const { counter, ...others } = result[0];
      return [others, counter];
      /**
       * Example return
       * [
       *  {
       *    weapon_id: 140,
       *    name: "Traveler's Handy Sword",
       *    type: 'SWORD',
       *    rarity: 3,
       *    baseAttack: 40,
       *    subStat: 'DEF'
       *  },
       *  [ 21, 2 ]
       * ]
       */
    },
    multi(bannerType) {
      banner = bannerType;
      // * Loop 10 times for 10 pull
      for (let i = 0; i < 10; i++) {
        compute();
      }
      // Check if 4-star exists in gacha_result
      const hasFourStar = gacha_result.some((item) => item.rarity === 4);
      if (!hasFourStar) {
        console.log('No 4-star found');
        compute(true);
        gacha_result.shift();
      }

      // * Store the final_counter, need to update this in mysql later
      const final_counter = gacha_result[gacha_result.length - 1].counter;
      // * Using reduce() to remove all counter properties for each item
      const results = gacha_result.reduce((acc, item) => {
        const { counter, ...results } = item;
        acc.push(results);
        return acc;
      }, []);
      results.push(final_counter);
      return results;
    },
  };
};

function getCharacters() {
  return new Promise((resolve, reject) => {
    model.selectAllCharacters((errors, results, fields) => {
      if (errors) reject(errors);
      else resolve(results);
    });
  });
}

function getWeapons() {
  return new Promise((resolve, reject) => {
    model.selectAllWeapons((errors, results, fields) => {
      if (errors) reject(errors);
      else resolve(results);
    });
  });
}
