
import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

interface ITableCellRowStyled {
    fontSize?: string,
}

export const TableCellRowStyled = styled(TableCell)((props: ITableCellRowStyled) => ({
height: '60px', 
// backgroundColor: 'white',
'&.MuiTableCell-root': { 
    fontSize: props.fontSize || '1rem', 
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif'
}

}));