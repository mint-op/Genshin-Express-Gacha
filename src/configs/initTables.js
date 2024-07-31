const pool = require('../services/db');
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const callback = (error, results, fields) => {
  if (error) {
    console.error('Error creating tables:', error);
  } else {
    console.log('Table created successfully');
  }
  process.exit();
};

bcrypt.hash(process.env.DB_PASSWORD, saltRounds, (error, hash) => {
  if (error) {
    console.error('Error hashing password:', error);
  } else {
    // console.log('Hashed password:', hash);

    const SQLSTATEMENT = `
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS messages;
      DROP TABLE IF EXISTS task;
      DROP TABLE IF EXISTS taskprogress;

      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO users (username, email, password) VALUES
      ('admin', 'admin@.com', '${hash}');

      CREATE TABLE messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        message_text TEXT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO messages (message_text, user_id) VALUES
      ('Hello, World!', 1);

      CREATE TABLE task (
        task_id INT PRIMARY KEY AUTO_INCREMENT,
        title TEXT,
        description TEXT,
        points INT
      );

      INSERT INTO task (title, description, points) VALUES
      ("Plant a Tree", "Plant a tree in your neighbourhood or a designated green area.", 50),
      ("Use Public Transportation", "Use public transportation or carpool instead of driving alone.", 30),
      ("Reduce Plastic Usage", "Commit to using reusable bags and containers.", 40),
      ("Energy Conservation", "Turn off lights and appliances when not in use.", 25),
      ("Composting", "Start composting kitchen scraps to create natural fertilizer.", 35),
      ("Sustainable Game", "Win a game to support developments for sustainability", 60);
    
      CREATE TABLE taskprogress (
        progress_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        completion_date TIMESTAMP,
        notes TEXT
      );

      DROP TABLE IF EXISTS userData;
      DROP TABLE IF EXISTS characters;
      DROP TABLE IF EXISTS user_character;
      DROP TABLE IF EXISTS weapons;
      DROP TABLE IF EXISTS user_weapon;

      CREATE TABLE userData (
        user_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        primogems INT NOT NULL DEFAULT 0,
        counter5 INT NOT NULL DEFAULT 1,
        counter4 INT NOT NULL DEFAULT 1,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO userData (user_id, name, primogems) VALUES (1, 'admin', 999999999);
    
      CREATE TABLE characters (
        character_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        title VARCHAR(50),
        vision_key ENUM ('ANEMO', 'CRYO', 'DENDRO', 'ELECTRO', 'GEO', 'HYDRO', 'PYRO') NOT NULL,
        weapon_type ENUM ('SWORD', 'BOW', 'POLEARM', 'CATALYST', 'CLAYMORE') NOT NULL,
        gender VARCHAR(10),
        nation VARCHAR(50) NOT NULL,
        affiliation VARCHAR(50),
        rarity INT NOT NULL,
        release_date DATE,
        constellation VARCHAR(50),
        birthday VARCHAR(10),
        description TEXT,
        NORMAL_ATTACK JSON NOT NULL,
        ELEMENTAL_SKILL JSON NOT NULL,
        ELEMENTAL_BURST JSON NOT NULL
      );

      CREATE TABLE user_character (
        user_character_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        character_id INT NOT NULL,
        user_weapon_id INT NOT NULL,
        character_level INT NOT NULL DEFAULT 1,
        health FLOAT NOT NULL,
        atk FLOAT NOT NULL,
        def FLOAT NOT NULL,
        experience INT NOT NULL DEFAULT 0
      );

      CREATE TABLE weapons (
        weapon_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        type ENUM ('SWORD', 'BOW', 'POLEARM', 'CATALYST', 'CLAYMORE') NOT NULL,
        rarity INT NOT NULL,
        baseAttack FLOAT NOT NULL,
        subStat VARCHAR(50) NOT NULL
      );
    
      CREATE TABLE user_weapon (
        user_weapon_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        weapon_id INT NOT NULL,
        weapon_level INT NOT NULL DEFAULT 1,
        totalAttack FLOAT NOT NULL
      );
    `;

    pool.query(SQLSTATEMENT, callback);
  }
});
