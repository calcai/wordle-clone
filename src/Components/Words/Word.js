import wordBank from './WordList.txt'

export const boardwordle = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
]

export const generateWords = async()=>{
    let wordSet ;
    let todaysWord;
    await fetch(wordBank)
    .then(response=>response.text())
    .then((result=>{
        const wordArr = result.trim().split(/\s+/);
        //console.log(wordArr)
        //to get random word
        todaysWord = wordArr[Math.floor(Math.random()* wordArr.length)]
        wordSet = new Set(wordArr)
    }))
    return {wordSet,todaysWord}

}