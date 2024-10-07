import { Style } from '@/types/Style.type'



export const style: Style = {
  box: {
    p: 4,
    gap: 3,
    borderRadius: 2.5,
    bgcolor: 'background.default',
    mx: 'auto',
    border: 1,
    borderColor: 'divider',
  },
  stack :{ 
     borderRadius: 3, p: 4 
  },
  grid: {
   my : 2
  },
  text : {
    mt : 2,
    fontWeight: '600'
  },
  button :{
    display:"flex",
    justifyContent:"end",
    gap:2,
  }


}