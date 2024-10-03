import { Style } from '@/types'

export const style: Style = {

  stepper: {
    marginBottom: "16px",
    '& .MuiStep-root': {
      color: '#BDBDBD',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    '& .MuiStepLabel-label': {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
    },

    '& .MuiStepLabel-root .Mui-active': {
      color: '#5CB85C !important',
    },
    '& .MuiStepLabel-root .Mui-completed': {
      color: '#5CB85C !important',
    },
  },

  iconWrapper: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  },

  iconActive: {
    backgroundColor: '#5CB85C',
    color: 'white',
  },

  iconInactive: {
    backgroundColor: '#BDBDBD',
    color: 'white',
  }
}