import { createMuiTheme } from '@material-ui/core/styles'

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#009e37',
      light: '#53d065',
      dark: '#006e03'
    },
    secondary: {
      main: '#455a64',
      light: '#718792',
      dark: '#1c313a'
    }
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: '#009e37'
      }
    },
    MuiBottomNavigationAction: {
      root: {
        '&$selected': {
          color: '#fff'
        }
      }
    }
  }
})
