import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HelpIcon from '@mui/icons-material/Help';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';


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
  
const BlackTheme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
  },
});
const WhiteTheme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF'
      },
    },
});

const TitleTheme = createTheme({
    typography: {
      fontFamily: [
        'Helvetica',
        'sans-serif',
      ].join(','),
    },
  });



export default function ButtonAppBar() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" theme = {WhiteTheme}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            theme = {BlackTheme}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <ThemeProvider theme = {TitleTheme}>
            <Typography align = 'center' variant="h6" component="div" sx={{ flexGrow: 1, margin: 0, color: 'black', fontSize: 40}}>
                Calvin's Wordle
            </Typography>
          </ThemeProvider>
          <IconButton
            tabIndex= {-1}
            size="large"
            edge="start"
            theme = {BlackTheme}
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {handleOpen}
          >
            <HelpIcon tabIndex = {-1}/>
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                How To Play
            </Typography>
            <Typography id="modal-modal-description" variant = "h6" sx={{ mt: 2 }}>
                Guess The Wordle in 6 Tries
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ul>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    <li>A gray tile means that the letter is not in the word</li>
                    <li>A yellow tile means that the letter is in the word, but in the wrong spot</li>
                    <li>A green tile means that the letter is in the word and in the wrong spot</li>
                </ul>
            
            </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}