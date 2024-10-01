import { Style } from '@/types'



export const style: Style = {
  box: {
    p: 4,
    maxWidth: 500,
    gap: 3,
    borderRadius: 2.5,
    bgcolor: 'background.default',
    mx: 'auto',
    border: 1,
    borderColor: 'divider',
  },
  text:{
    fontWeight:"485",
    my: 2
  },
  caption :{
    m: -0.5,
    p:0,
    mx:1,
  },
  span :{
    color: 'success.light'
  },
  otpinput:{
    my:2,
    fontWeight:"bold",
    alignItems: 'center',      

  },
  icon:{
    display: 'flex',           
    justifyContent: 'left',   
    alignItems: 'center',      
    color: 'text.secondary',
    width: '100px',             
    height: '10px',    
    },
    textLink :{
      color: 'success.light',
      fontWeight: 700,
      textDecoration: 'underline',
    }

}