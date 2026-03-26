import Box from '@mui/material/Box'
import { Fragment } from 'react'
import Header from './Header'

export const Layout = (props) => {
  return (
    <Fragment>
        <header>
            <Header/>
        </header>
        <Box component="main" sx={{ margin:'100px auto', width:'80vw'}}>
            {props.children}
        </Box>
        <footer>
        </footer>

    </Fragment>
  )
}
