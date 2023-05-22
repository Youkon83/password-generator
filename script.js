const resultElem = document.getElementById('result')
const lengthElem = document.getElementById('length')
const uppercaseElem = document.getElementById('uppercase')
const lowercaseElem = document.getElementById('lowercase')
const numbersElem = document.getElementById('numbers')
const symbolsElem = document.getElementById('symbols')
const generateElem = document.getElementById('generate')
const clipboardElem = document.getElementById('clipboard')


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardElem.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultElem.innerText

    if(!password){
        return
    }

    navigator.clipboard.writeText(password)
    alert('Password copied to clipboard!')
})

generateElem.addEventListener('click', () =>{
    const length = +lengthElem.value
    const hasLower = lowercaseElem.checked
    const hasUpper = uppercaseElem.checked
    const hasNumber = numbersElem.checked
    const hasSymbol = symbolsElem.checked

    resultElem.innerText = generatePassword(hasLower, hasNumber, hasUpper, hasSymbol, length)
})

function generatePassword(lower, number, upper, symbol, length){
    let generated = ''
    const typesCount = lower + upper + number + symbol
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0){
        return ''
    }

    for(let i = 0; i < length; i += typesCount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generated += randomFunc[funcName]()

        })
    }
    const finalPassword = generated.slice(0, length)
    return finalPassword

}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()[]=+<>?'
    return symbols[Math.floor(Math.random() * symbols.length)]
}