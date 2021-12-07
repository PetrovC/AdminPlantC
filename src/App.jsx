import { useRoutes } from 'react-router';
import './App.scss';
import Routes from './Routes';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import { Alert, createTheme, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from './store/interactionsSlice';
import { ThemeProvider } from '@emotion/react';
import ConfirmDialog from './containers/ConfirmDialog/ConfirmDialog';

const App = () => {

  const routes = useRoutes(Routes);

  const { open, severity, message } = useSelector(state => state.interactions.toast);

  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0b524f'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <>
          {routes}
        </>
        <ConfirmDialog />
        <Snackbar open={open} 
                  autoHideDuration={6000} 
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                  onClose={() => dispatch(hideToast())}>
          <Alert severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
