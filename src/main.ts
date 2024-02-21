import { Image, RegularSet, pickCard } from './_js/geisters_blitz.ts'

const set = RegularSet

function imageTag(image: Image) {
  const [color, shape] = image
  return `<svg class="image ${shape}" style="fill: ${color}"><use href="#${shape}-svg"></use></svg>`
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const itemsTag = set.items.map(imageTag).join('')
const items = document.getElementById('items')!
items.innerHTML = itemsTag;

const cardElem = document.getElementById('card')!

  ;
(async () => {
  let resolve: () => void;
  Array.from(items.children).forEach(item => {
    item.addEventListener('click', () => resolve())
  });
  while (true) {
    const [card, correct] = pickCard(set)
    const cardTag = card.map(imageTag).join('')
    cardElem.innerHTML = cardTag
    await new Promise<void>((res) => { resolve = res });
    const item = items.querySelector(`.${correct[1]}`)!
    item.classList.add('correct')
    await sleep(500)
    item.classList.remove('correct')
    console.log({correct})
  }
})()
