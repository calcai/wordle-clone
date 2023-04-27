import React from 'react'
import { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board';
import GameOver from './Components/GameOver';
import Keyboard from './Components/Keyboard/Keyboard';
import { boardwordle, generateWords } from './Components/Words/Word';
import ButtonAppBar from './Components/IconButtons/AppBar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';


export const AppContext = createContext()

function App() {

  const [board,setBoard] = useState(boardwordle)
  const [wordSet,setWordSet] = useState(new Set())
  const [correctWord,setCorrectWord] = useState("")
  const [currentAttempt,setCurrAttempt] = useState({attempt:0,letterPoss:0})
  const [gameOver,setGameOver] = useState({gameOver:false,guessedWord:false})

  const [disabledLetters,setDisabledLetters] = useState([])
  const [almostLetters,setAlmostLetters] = useState([])
  const [correctLetters,setCorrectLetters] = useState([])
  const [open, setOpen] = React.useState(false);
  
  useEffect(()=>{

    generateWords()
    .then((words)=>{
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })

  },[])

  console.log(correctWord)

  const onSelectLetter=(keyVal)=>{
    if(currentAttempt.letterPoss > 4) return;

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss] = keyVal
    setBoard(newBoard)
    setCurrAttempt({
      attempt:currentAttempt.attempt,
      letterPoss:currentAttempt.letterPoss+1
    })
  }

  const onEnter=()=>{
    if(currentAttempt.letterPoss !== 5) return

    let currWord =""
    for(let i=0;i<5;i++){
      currWord += board[currentAttempt.attempt][i]
    }

    if(wordSet.has(currWord.toLowerCase())){
      setCurrAttempt({attempt:currentAttempt.attempt+1,letterPoss:0})
    }
    if(!wordSet.has(currWord.toLowerCase())){
      //alert("Word not in the list") 
      setOpen(true)
    }

    if(currWord.toLowerCase() === correctWord){
      setGameOver({gameOver:true,guessedWord:true})
    }

    if(currentAttempt.attempt >= 5 && wordSet.has(currWord.toLowerCase())){
      setGameOver({gameOver:true,guessedWord:false})
      return;
    }
  }

  const onDelete = ()=>{
    if(currentAttempt.letterPoss === 0) return;

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPoss-1] = ""
    setBoard(newBoard)
    setCurrAttempt({
      ...currentAttempt,
      letterPoss:currentAttempt.letterPoss-1
    })

  }






  return (
    <div className="App">
      <ButtonAppBar />
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Invalid word. Try again.
        </Alert>
      </Collapse>
    </Box>
      <AppContext.Provider value={{board,setBoard,correctWord,wordSet,
        setCorrectWord,currentAttempt,setCurrAttempt,gameOver,setGameOver,
        disabledLetters,setDisabledLetters,almostLetters,setAlmostLetters,correctLetters,setCorrectLetters,
        onSelectLetter,onEnter,onDelete
        }}>
      <div className='game'>
        <Board/>

        {gameOver.gameOver ? <GameOver/> :  <Keyboard/>}
       
      </div>

      </AppContext.Provider>
     
      <br/><br/>
    </div>
  );
}

export default App;