const aleatorio = (min,max)=>{
    return Math.floor(Math.random()*(max-min)+min)
}
console.log(aleatorio(100000,999999))