//Create a ship with hull, firepower, accuarcy, and team

class Ship {
  constructor(team, name, hull = null, firepower = null) {
    this.team = team
    this.name = name
    if (this.team === 'good') {
      this.hull = hull
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
  attack(target){
   //Attack a ship
   if (this.accuracy()){
    target.hull -= this.firePower
    console.log(`${this.name} hit ${target.name} and the ship had ${target.hull + this.firePower} and now have ${target.hull} health left` )
    if (target.hull <= 0){
      this.shipDestroyed++
      console.log(this.shipDestroyed)
      if (this.shipDestroyed === 6){
        return "I am done"
      }
      if (this.team === 'good'){
      console.log('choose to retreat')
      let p = window.prompt('Would you like to retreat')
      if (p === 'no'){
       target = new Ship('bad', 'enemyship')
       this.attack(target)
      } else if(p === 'yes') {
        console.log('You have retreated')
      }        
      } else  if (this.team === 'bad'){
        console.log('You have been destroyed')
      }
    } else {
      target.attack(this)
    }
   } else {
    target.attack(this)
   }
  }
}

uSS = new Ship('good','uss', 20, 5)
alienShip1 = new Ship('bad', 'enemy')
uSS.attack(alienShip1)