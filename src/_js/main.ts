import {RegularSet, pickCard} from './geisters_blitz.ts'

const set = RegularSet

const [card, correct] = pickCard(set)
console.log(card, correct)
