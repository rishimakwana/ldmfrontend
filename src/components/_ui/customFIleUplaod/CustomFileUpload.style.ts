import { Style } from '@/types/Style.type'



export const style: Style = {
  field :{
    border: "2px dashed #ccc",
    borderRadius: 2,
    p: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    textAlign: "center",
    cursor: "pointer",
    "&:hover": { borderColor: "primary.main" },
  }


}