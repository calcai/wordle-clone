import React, { useContext } from 'react'
import { AppContext } from '../App'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {createTheme } from '@mui/material/styles';

const BlackTheme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
  },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };




export default function GameOver() {

  const {currentAttempt,gameOver,correctWord} = useContext(AppContext)
  
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let attempts = "".concat("You solved it in ", currentAttempt.attempt," ", currentAttempt.attempt >= 2 ? 'attempts' : 'attempt')

  function RefreshPage(){
    window.location.reload(false);
  }

  return (

    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {gameOver.guessedWord ? "You Guessed Correctly! Refresh to play again." : "Game Over. Refresh to try again."}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {gameOver.guessedWord ? attempts : ""}
          </Typography>
          <Button theme = {BlackTheme} onClick = {RefreshPage} variant="outlined">Refresh</Button>
        </Box>
      </Modal>
    </div>
  )
}
