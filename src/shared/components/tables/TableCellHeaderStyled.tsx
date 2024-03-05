import styled from "@emotion/styled";
import { TableCell } from "@mui/material";
import { VerdeEscuro } from "../../../assets/colors/CoresPadroes";

interface ITableCellHeaderStyled {
    fontSize?: string,
    backgroundcolor?:string,
    fontColor?:string,
}

export const TableCellHeaderStyled = styled(TableCell)((props: ITableCellHeaderStyled) => ({
    fontSize: props.fontSize || '17px', 
    fontFamily: 'Poppins, sans-serif' , 
    fontWeight: 'bold', 
    backgroundColor: props.backgroundcolor || VerdeEscuro, 
    paddingTop: '20px', 
    paddingBottom: '20px', 
    color: props.fontColor || 'white', 
    whiteSpace: 'nowrap',
}));