function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getObjRandom(min, max) {
  let objRandom = {};

  for (let index = 1; index <= max; index++) {
    let numberRandom = getRandom(min, max);
    numberRandom = numberRandom.toString();
    // console.log('numberRandom', numberRandom)

    if (Object.keys(objRandom).length === 0) {
      objRandom[numberRandom] = 1;
    } else {
      const listKeys = Object.keys(objRandom);
      // console.log('listKeys', listKeys)
      if (listKeys.some(key => Number(key) === Number(numberRandom))) {
        objRandom[numberRandom] = Number(objRandom[numberRandom]) + 1;
      } else {
        objRandom[numberRandom] = 1;
      }
    }
    // console.log('objRandom', objRandom)
  }
  return objRandom;
}

process.on('message', (message) => {
  if (message === 'start') {
    // console.log('MESSAGE')
    // console.log('process.argv[2]', process.argv[2])
    // console.log('process.argv[3]', process.argv[3])
    const min = Number(process.argv[2]);
    const max = Number(process.argv[3]);

    let objRandom = getObjRandom(min, max);
    // console.log('objRandom calculo.js', objRandom)
    process.send(objRandom);
  } else {
    console.log('NO inicio la función')
  }
})