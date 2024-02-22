import { Image, RegularSet, pickCard } from './_js/geisters_blitz.ts'
import { SpeedMeter } from './_js/speed_meter.ts'

const set = RegularSet

function imageTag(image: Image) {
  const [color, shape] = image
  return `<svg class="image ${shape}" data-shape="${shape}" style="fill: ${color}"><use href="#${shape}-svg"></use></svg>`
}

let score = 0, maxSpeed = 0
const scoreElem = document.querySelector('#score span')!
const meterElem: HTMLDivElement = document.querySelector('#meter div')!
const speedMeter = new SpeedMeter(5)
function updateScore(hit: boolean, time: number) {
  if (hit) {
    score += 1
    speedMeter.push(time)
  } else {
    score = 0
    speedMeter.clear()
  }
  const speed = speedMeter.speed()
  if(speed){
    maxSpeed = Math.max(maxSpeed, speed)
    scoreElem.textContent = `score:${score} max speed: ${maxSpeed.toFixed(2)}/min`
    meterElem.style.width = `${speed/maxSpeed*100}%`
  } else {
    scoreElem.textContent = `${score} / 5`
    meterElem.style.width = `${score * 100 / 5}%`
  }
}
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const itemsTag = set.items.map(imageTag).join('')
const items = document.getElementById('items')!
items.innerHTML = itemsTag;

const cardElem = document.getElementById('card')!

let resolve: (shape: string | null) => void;
items.addEventListener('click', (e) => {
  const target = e.target! as HTMLElement
  resolve(target.closest('svg')?.dataset.shape!)
})

async function loop() {
  while (true) {
    const [card, correct] = pickCard(set)
    const cardTag = card.map(imageTag).join('')
    cardElem.innerHTML = cardTag
    const now = Date.now()
    const selected = await new Promise<string | null>((res) => { resolve = res });
    const hit = selected === correct[1]
    updateScore(hit, Date.now() - now)
    const correctElem = items.querySelector(`.${correct[1]}`)!
    correctElem.classList.add("correct")
    if (hit) { correctElem.classList.add("hit") }
    console.log({hit, selected})
    await sleep(500)
    correctElem.classList.remove('correct', 'hit')
  }
}
loop()
