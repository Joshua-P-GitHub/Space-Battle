//Create a ship with hull, firepower, accuarcy, and team
const projectile = document.querySelector('.fire')
const projectileStyle = window.getComputedStyle(projectile)
const goodShip = document.querySelector('.good')
const badShip = document.querySelector('.bad')
const goodHealth = document.querySelector('.goodH')
const badHealth = document.querySelector('.badH')
const sleep = async (milliseconds) => {
  await new Promise(resolve => {
    return setTimeout(resolve, milliseconds)
  })
}
let l;
class Ship {
  constructor(team, name, hull = null, firepower = null) {
    this.team = team
    this.name = name
    if (this.team === 'good') {
      this.hull = hull
      goodHealth.innerText = this.hull
      this.firePower = firepower
      this.accuracy = () => {
        if (Math.random() < .7) {
          return true
        } else {
          console.log(this.name + " missed")
          return false
        }
      }
    } else if (this.team === 'bad') {
      this.hulls = [3, 4, 5, 6]
      this.firePowers = [2, 3, 4]
      this.accuracies = [.6, .7, .8]
      this.hull = this.hulls[Math.floor(Math.random() * 4)]
      badHealth.innerText = this.hull
      this.firePower = this.firePowers[Math.floor(Math.random() * 3)]
      this.int = this.accuracies[Math.floor(Math.random() * 3)]
      this.accuracy = () => {
        if (Math.random() < this.int) {
          return true
        } else {
          console.log(this.name + " missed")
          return false
        }
      }
    }
    this.shipDestroyed = 0
  }
  //Created attack function Fundamentals
  async attack(target) {
    //Attack a ship
    if (this.accuracy()) {
      target.hull -= this.firePower
      await fire(this.team , target)
      console.log(`${this.name} hit ${target.name} and the ship had ${target.hull + this.firePower} and now have ${target.hull} health left`)
      if (target.hull <= 0) {
        this.shipDestroyed++
        console.log(this.shipDestroyed)
        if (this.shipDestroyed === 6) {
          badShip.style.display = 'none'
          return "I am done"
        }
        if (this.team === 'good') {
          badShip.style.display = 'none'
          await sleep(1000)
          console.log('choose to retreat')
          let p = window.prompt('Would you like to retreat')
          if (p === 'no') {
            badShip.style.display = 'block'
            target = new Ship('bad', 'enemyship')
            this.attack(target)
          } else if (p === 'yes') {
            console.log('You have retreated')
            goodShip.style.display = 'none'
          }
        } else if (this.team === 'bad') {
          console.log('You have been destroyed')
          goodShip.style.display = 'none'
        }
      } else {
        target.attack(this)
      }
    } else {
      target.attack(this)
    }
  }
}

async function fire(team, target) {
  let windowHeight = 821;
  let frames = 30
  let sec = 2
  let length = sec * frames
  l = sec * 1000
  let targetPos;
  let currentPos;
  if (team === 'bad') {
    projectile.style.backgroundColor = 'red'
    projectile.style.top = '10%'
    currentPos = windowHeight * .10
    targetPos = windowHeight * .90
    projectile.style.display = 'block'
  } else if (team === 'good') {
    projectile.style.backgroundColor = 'green'
    projectile.style.top = '90%'
    currentPos = windowHeight * .90
    console.log(currentPos)    
    targetPos = windowHeight * .10
    projectile.style.display = 'block'
  }
  let interval = (targetPos - currentPos) / length
  for (let i = 0; i <= length; i++) {
    console.log(interval);
    currentPos += interval
    projectile.style.top = `${currentPos}px`
    await sleep(33.33333)
  }
  projectile.style.display = 'none'
  if (team === 'good'){
    badHealth.innerText = target.hull
  } else {
    goodHealth.innerText = target.hull
  }
  await sleep(1000)
  console.log(projectileStyle.display)
}
console.log('uss')
uSS = new Ship('good', 'uss', 20, 5)
alienShip1 = new Ship('bad', 'enemy')
uSS.attack(alienShip1)