import dotenv from 'dotenv';
import constants from './constants.js';

/** Init .env file */
dotenv.config();

/** Inserir as constantes na variavel global */
globalThis.CONSTANTS = constants;