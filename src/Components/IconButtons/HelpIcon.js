import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';

export default function Help(){
    return(
        <div>
            <IconButton aria-label="delete">
                <HelpIcon />
            </IconButton>
        </div>
    )
}