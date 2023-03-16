//Create a ship with hull, firepower, accuarcy, and team

class Ship{
  constructor(hull, firepower, team){
    this.team = team
    if (this.team === 'good'){
      this.hull = hull
      this.firepower = firepower
      this.accuracy = () => {
        if (Math.random() < .7){
          console.log('you hit it')
          return true
        } else {
          return false
        }
      }
    } else if (this.team === 'bad') {
      this.hulls = [3,4,5,6]
      this.firePowers = [2,3,4]
      this.accuracies = [.6,.7,.8]
      this.hull = this.hulls[Math.floor(Math.random() * 3)]
      this.firePower = this.firePowers[Math.floor(Math.random() * 2)]
      this.accuracy = () => {
       if (Math.random() < this.accuracies[Math.floor(Math.random() * 3)]){
        console.log('you hit it')
        return true
       } else {
        return false
       }
      }
    }

  }
}