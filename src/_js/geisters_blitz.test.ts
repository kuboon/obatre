import { RegularSet, NineSet, correctItemFor, pickCard } from './geisters_blitz.ts'
import { equal, assertEquals } from 'std/assert/mod.ts'


Deno.test('pickCard', () => {
  const set = NineSet
  const [card, correct] = pickCard(set)
  assertEquals(correct, correctItemFor(set, card))
})
Deno.test('correctItemFor RegularSet', () => {
  const set = RegularSet
  assertEquals(['blue', 'book'], correctItemFor(set, [['blue', 'book'], ['white', 'bottle']]))
  assertEquals(['green', 'bottle'], correctItemFor(set, [['blue', 'ghost'], ['green', 'bottle']]))
  assertEquals(false, correctItemFor(set, [['blue', 'book'], ['green', 'bottle']]))
  assertEquals(['green', 'bottle'], correctItemFor(set, [['blue', 'ghost'], ['red', 'mouse']]))
})
Deno.test('correctItemFor NineSet', {only: true}, () => {
  const set = NineSet
  assertEquals(['white', 'ghost'], correctItemFor(set, [['blue', 'vase'], ['green', 'hat'], ['white', 'ghost']]))
  assertEquals(['blue', 'light'], correctItemFor(set, [['red', 'ghost'], ['green', 'hat'], ['black', 'clock']]))
})
