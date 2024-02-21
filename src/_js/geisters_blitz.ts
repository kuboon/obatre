export type Shape = string
export type Color = string
export type Image = [Color, Shape]
export type Card = Image[]
export type Item = Image
export type Set = { imagesOnCard: number, items: Item[] }

export const RegularSet: Set = {
  imagesOnCard: 2,
  items: [
    ['blue', 'book'],
    ['green', 'bottle'],
    ['white', 'ghost'],
    ['gray', 'mouse'],
    ['red', 'sofa'],
  ]
}
export const NineSet: Set = {
  imagesOnCard: 3,
  items: [
    ['white', 'ghost'],
    ['blue', 'light'],
    ['blue', 'clock'],
    ['red', 'vase'],
    ['red', 'owl'],
    ['green', 'key'],
    ['green', 'mirror'],
    ['black', 'hat'],
    ['black', 'bat'],
  ]
}

export function pickCard(set: Set) {
  let card: Card, correct: Item | false
  do {
    const colors = pickFrom(set.items.map(item => item[0]), set.imagesOnCard)
    const shapes = pickFrom(set.items.map(item => item[1]), set.imagesOnCard)

    card = shapes.map((x, i) => [colors[i], x])
    correct = correctItemFor(set, card)
  } while (!correct)

  return [card, correct] as [Card, Item]
}

export function correctItemFor(set: Set, card: Card) {
  if (set.imagesOnCard !== card.length) throw new Error('Images count does not match set definition')
  const { items } = set
  const exactMatches = card.filter(image => items.some(item => match(image, item)))
  if (exactMatches.length === 1) return exactMatches[0]
  if (exactMatches.length > 1) {
    // console.info('Multiple exact matches', exactMatches, { card })
    return false
  }

  const imageColors = card.map(item => item[0])
  const imageShapes = card.map(item => item[1])
  const colorMismatch = items.filter(item => !imageColors.includes(item[0]))
  const colorAndShapeMismatch = colorMismatch.filter(item => !imageShapes.includes(item[1]))
  if (colorAndShapeMismatch.length === 1) return colorAndShapeMismatch[0]
  // console.info('Multiple remains', colorAndShapeMismatch, { card })
  return false
}

function match(image1: Image, image2: Image) {
  return image1[0] === image2[0] && image1[1] === image2[1]
}

function pickFrom<T>(array: T[], num: number): T[] {
  const result: T[] = []
  for (let i = 0; i < num; i++) {
    const index = Math.floor(Math.random() * array.length)
    result.push(array[index])
    array.splice(index, 1)
  }
  return result
}
