import * as React from 'react'
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Home from './pages/Home.js'
import NotFound from './pages/NotFound'
import MenuAppBar from './components/MenuAppBar'

const theme = createTheme({
  palette: {
    white: {
      main: '#FFFFFF',
    },
    red: {
      main: '#CA0000',
    },
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#eeffff',
      main: '#bbdefb',
      dark: '#8aacc8',
      contrastText: '#000',
    },
  },
  typography: {
    button: {
      textTransform: 'none' // แก้ตัวอักษรถูก render เป็นพิมพ์ใหญ่เอง
    }
  }
});

axios.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('access_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (err) {
  return Promise.reject(err)
})

export default function App() {

  const [user, setUserData] = React.useState(null)
  const [searchData, setSearchData] = React.useState("")

  const userData = (data) => {
    setUserData(data)
  }

  const setSearchDataCallback = (data) => {
    setSearchData(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <MenuAppBar userData={userData} setSearchData={setSearchDataCallback} />
      <Router>
        <Switch>
          <Route path='/' element={<Home user={user} searchData={searchData} />}/>
          <Route path='*' element={<NotFound />}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
