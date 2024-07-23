import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { Fragment, useEffect, useState } from "react";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SouthIcon from '@mui/icons-material/South';
import { AzulPadrao, AmareloIntermediario, VermelhoPadrao, VerdeClaro } from "../../../assets/colors/CoresPadroes";
import { TableCellHeaderStyled } from "./TableCellHeaderStyled";
import { TableCellRowStyled } from "./TableCellRowStyled";
import { ConvertToDataString } from "../../../functions/ConvertToDataString";
import { dtFinalFiterAtom, dtInicialFilterAtom, enviosFilterAtom, lojaCodigoFilterAtom, statusFilterAtom } from "../../../recoil/envios/enviosAtom";
import { TextFieldDate } from "../textfield/TextFieldDate";
import { TextFieldNumber } from "../textfield/TextFieldNumber";
import { ButtonGeneric } from "../button/ButtonGeneric";
import CircularProgress from '@mui/material/CircularProgress';
import { reenviar } from "../../../recoil/envios/enviosActions";
import { useDialogConfirm } from "../dialogs/DialogProviderConfirm";
import { useDialogSucess } from "../dialogs/DialogProviderSucess";
import { useAuth } from "../../contexts/AuthContext";
import { getData } from "../../../functions/GetDataHora";


interface ITableEnvios {
    columns: readonly ITablePaginatedColumn[],
    selectorRecoil: any,
    item: any,
    setItem: any,
    titleToolbar?: string,
}

export type MaskType = "CNPJ" | "CEP" | "FONE" | "CPF" | "DECIMAL" | "DATE" | undefined;

export interface ITablePaginatedColumn {
    iconColumn?: boolean;
    mask?: string;
    field: any;
    subField?: any;
    subSubField?: any
    label: string;
    align?: string;
    width?: string;
    enableOrder?: boolean;
    checkColumn?: boolean;
    deleteFunction?: any;
}

export default function TableEnvios(props: ITableEnvios) {
    const { usuarioLogado } = useAuth();

    const { columns, selectorRecoil, item, setItem, titleToolbar } = props;
    const [tamanhoLista, setTamanhoLista] = useState(0)

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const [filterAtom, setFilterAtom] = useRecoilState(enviosFilterAtom)
    const [filtersInitialized, setFiltersInitialized] = useState(false)

    useEffect(() => {
        const dataAtual = getData()
        setFilterAtom({
            dataInicial: dataAtual,
            dataFinal: dataAtual,
            status: 'N',
            lojCnpj: usuarioLogado?.loj_cnpj || ''
        });
        setFiltersInitialized(true)
    }, [usuarioLogado, setFilterAtom])

    return (
        <>

            <Paper sx={{ width: '100%', boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999' }}>
                {filtersInitialized &&
                    <>
                        <TablePaginatedToolBar titleToolbar={titleToolbar} setFilterAtom={setFilterAtom} usuarioLogado={usuarioLogado} />
                        <TableContainer sx={{ height: 480, padding: 0, paddingTop: 0, }}>
                            <Table stickyHeader>
                                <TablePaginatedHeader columns={columns} />
                                <TablePaginatedBody usuarioLogado={usuarioLogado} status={filterAtom.status} selectorRecoil={selectorRecoil} columns={columns} item={item} setItem={setItem} setTamanhoLista={setTamanhoLista} page={page} rowsPerPage={rowsPerPage} />
                            </Table>
                        </TableContainer>
                        <TablePaginatedPagination tamanhoLista={tamanhoLista} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />
                    </>
                }
            </Paper>

        </>
    );
}

interface ITablePaginatedToolBar {
    titleToolbar?: string,
    setFilterAtom: any,
    usuarioLogado: any
}

function TablePaginatedToolBar(props: ITablePaginatedToolBar) {

    const { titleToolbar, setFilterAtom, usuarioLogado } = props;

    const [status, setStatus] = useRecoilState<any>(statusFilterAtom);
    const [dtInicial, setDtInicial] = useRecoilState<any>(dtInicialFilterAtom);
    const [dtFinal, setDtFinal] = useRecoilState<any>(dtFinalFiterAtom);
    const [lojaCodigo, setLojaCodigo] = useRecoilState<any>(lojaCodigoFilterAtom);

    const dataAtual = getData()

    useEffect(() => {
        if(status === 'Enviados'){
            setDtInicial(dataAtual)
            setDtFinal(dataAtual)
        }
    }, [status])

    const handleStatus = (event: any) => {
        setStatus(event.target.value);
    };

    const handleDtInicial = (event: any) => {
        setDtInicial(event.target.value);
    };

    const handleDtFinal = (event: any) => {
        setDtFinal(event.target.value);
    };

    const handleLoja = (event: any) => {
        setLojaCodigo(event.target.value);
    };

    const filtrar = () => {
        setFilterAtom({ dataInicial: dtInicial, dataFinal: dtFinal, status: status === 'Enviados' ? 'S' : 'N', lojCnpj: usuarioLogado?.loj_cnpj })
    }

    return (
        <Toolbar>
            <Grid container direction='row' spacing={2} sx={{ paddingBottom: 2, paddingTop: 2 }}>
                <Grid item xs={12} md={status === 'Não enviados' ? 6 : 3} lg={status === 'Não enviados' ? 6 : 3} xl={status === 'Não enviados' ? 6 : 3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            id="demo-simple-select-outlined-label"
                            sx={{ color: AzulPadrao, '.Mui-focused': { color: AzulPadrao }, fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem' }}
                        >
                            Loja
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={lojaCodigo}
                            onChange={handleLoja}
                            label="Loja"
                            sx={{
                                fontSize: 16,
                                textAlign: 'center',
                                color: AzulPadrao,
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: AzulPadrao,
                                },
                                '& .MuiSvgIcon-root': {
                                    color: AzulPadrao,
                                }
                            }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={status === 'Não enviados' ? 6 : 3} lg={status === 'Não enviados' ? 6 : 3} xl={status === 'Não enviados' ? 6 : 3}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            id="demo-simple-select-outlined-label"
                            sx={{ color: AzulPadrao, '.Mui-focused': { color: AzulPadrao }, fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem' }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleStatus}
                            label="Status"
                            sx={{
                                fontSize: 16,
                                textAlign: 'center',
                                color: AzulPadrao,
                                fontWeight: 'bold',
                                fontFamily: 'Poppins, sans-serif',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: AzulPadrao,
                                },
                                '& .MuiSvgIcon-root': {
                                    color: AzulPadrao,
                                }
                            }}
                        >
                            <MenuItem value={'Enviados'}>Enviados</MenuItem>
                            <MenuItem value={'Não enviados'}>Não Enviados</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {status === 'Enviados' &&
                    <>
                        <Grid item xs={12} md={3} lg={3} xl={3}>
                            <TextFieldDate label={"Dt. Inicial"} value={dtInicial} onChange={handleDtInicial} />
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} xl={3}>
                            <TextFieldDate label={"Dt. Inicial"} value={dtFinal} onChange={handleDtFinal} />
                        </Grid>
                    </>
                }
                <Grid item xs={12} md={12} lg={12} xl={12}>
                    <ButtonGeneric title={'Buscar'} typeStyle={"liquidar"} fullWidth onClick={filtrar} />
                </Grid>
            </Grid>
        </Toolbar>
    )

}

interface TableHeaderProps {
    columns: readonly ITablePaginatedColumn[];
}

function TablePaginatedHeader(props: TableHeaderProps) {

    const { columns } = props;

    const [orderBy, setOrderBy] = useState<any>('')

    const [order, setOrder] = useState<any>('ASC')

    return (
        <TableHead>
            <TableRow>
                {columns.map((headCell: any, index: any) => (
                    <TableCellHeaderStyled sortDirection={orderBy.charAt(0).toLowerCase() + orderBy.slice(1) === headCell.field ? order.toLowerCase() : false} key={index} align={headCell.align ? headCell.align : "left"} width={headCell.width}>
                        {headCell.enableOrder === true ?
                            <TableSortLabel
                                active={orderBy.charAt(0).toLowerCase() + orderBy.slice(1) === headCell.field}
                                direction={orderBy.charAt(0).toLowerCase() + orderBy.slice(1) === headCell.field ? order.toLowerCase() : 'asc'}
                                style={{
                                    color: orderBy.charAt(0).toLowerCase() + orderBy.slice(1) === headCell.field ? AmareloIntermediario : 'inherit', // Define a cor do texto
                                }}
                                onClick={() => {
                                    setOrderBy(headCell.field.charAt(0).toUpperCase() + headCell.field.slice(1))

                                    if (order.toUpperCase() === "ASC") {
                                        setOrder("DESC")
                                    } else {
                                        setOrder("ASC")
                                    }
                                }}
                                IconComponent={(props) => (
                                    <SouthIcon
                                        {...props}
                                        style={{
                                            color: orderBy.charAt(0).toLowerCase() + orderBy.slice(1) === headCell.field ? AmareloIntermediario : 'inherit', // Define a cor do ícone
                                        }}
                                    />
                                )}>{headCell.label}
                            </TableSortLabel>
                            :
                            headCell.label
                        }

                    </TableCellHeaderStyled>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface ITablePaginatedBody {
    columns: readonly ITablePaginatedColumn[];
    item: any;
    setItem: any;
    setTamanhoLista: any;
    page: any,
    rowsPerPage: any,
    selectorRecoil: any,
    status: any,
    usuarioLogado: any,
}

function TablePaginatedBody(props: ITablePaginatedBody) {

    const { columns, item, setItem, setTamanhoLista, page, rowsPerPage, selectorRecoil, status, usuarioLogado } = props;

    const { state, contents: lista } = useRecoilValueLoadable<any>(selectorRecoil);
    console.log(lista)
    const [listaPaginada, setListaPaginada] = useState([])
    const refreshEnvios = useRecoilRefresher_UNSTABLE(selectorRecoil)

    const showDialogConfirm = useDialogConfirm()
    const showDialogSucess = useDialogSucess()

    useEffect(() => {
        if (state === 'hasValue' && lista?.length > 0) {
            // Calcula o índice do primeiro e do último item da página atual
            const indexOfLastItem = (page + 1) * rowsPerPage;
            const indexOfFirstItem = indexOfLastItem - rowsPerPage;
            // Filtra os contents para exibir apenas os itens da página atual

            setListaPaginada(lista.slice(indexOfFirstItem, indexOfLastItem))
            setTamanhoLista(lista.length)
        }
        else {
            setListaPaginada([])
        }
    }, [setTamanhoLista, state, lista, page, rowsPerPage])

    const reenviarNaoEnviados = async () => {
        const confirm = await showDialogConfirm({
            headerMessage: 'Tem certeza que deseja enviar?'
        })
        if (confirm) {
            const caixas = Array.from(new Set(lista.map((saida: any) => saida.USU_CODIGO)) as Set<number>).sort((a, b) => a - b);

            console.log(caixas);
            const res: any = await reenviar(usuarioLogado.iap_codempresaapi, usuarioLogado.iap_local, usuarioLogado.iap_usuario, usuarioLogado.iap_senha, usuarioLogado.loj_cnpj, caixas)
            if (res.status === 200) {
                await showDialogSucess({
                    headerMessage: 'Itens enviados com sucesso!'
                })
            }
            refreshEnvios()
        }

    }

    return (
        <>
            <TableBody>
                {state === 'loading' ?
                    (
                        <TableRow>
                            <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            </TableCell>
                        </TableRow>
                    )
                    : listaPaginada.length > 0 ?
                        (
                            <>
                                {status === 'N' &&

                                    <TableRow>
                                        <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                                            <Box>
                                                <ButtonGeneric title={'Enviar'} typeStyle="gravar" fullWidth onClick={reenviarNaoEnviados} />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                }
                                {listaPaginada.map((row: any, index: any) => (
                                    <Fragment key={index}>
                                        <TablePaginatedRow columns={columns} row={row} item={item} setItem={setItem} />
                                    </Fragment>
                                ))}
                            </>
                        )
                        :
                        (
                            <TableRow>
                                <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
                                    <Typography>Sua consulta não retornou nenhum registro.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
            </TableBody>

        </>

    )

}

interface ITablePaginatedRow {
    row: any,
    columns: any,
    item: any,
    setItem: any
}

function TablePaginatedRow(props: ITablePaginatedRow) {

    const { row, columns, item, setItem } = props;

    var fontColor: string | undefined = undefined;

    switch (row['situacao']) {
        case "CANCELADO":
        case false:
            fontColor = VermelhoPadrao;
            break;
        case "BAIXADO":
        case "LIQUIDADO":
            fontColor = AzulPadrao;
            break;
    }

    return (
        <TableRow
            hover
            className='table-row'
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            {columns.map((column: any, index: any) => {
                if (column.mask === 'data') {
                    return <TableCellRowStyled style={{ whiteSpace: 'nowrap', backgroundColor: 'transparent', color: fontColor, padding: '10px 16px' }} key={index} align={column.align ? column.align : 'left'} scope='row' >{ConvertToDataString(row[column.field])}</TableCellRowStyled>

                }
                else {
                    return <TableCellRowStyled style={{ whiteSpace: 'nowrap', backgroundColor: 'transparent', color: fontColor, padding: '10px 16px' }} key={index} align={column.align ? column.align : 'left'} scope='row' >{row[column.field]}</TableCellRowStyled>
                }
            })}
        </TableRow>
    )
}

interface ITablePaginationGeneric {
    tamanhoLista: any;
    page: any,
    setPage: any,
    rowsPerPage: any,
    setRowsPerPage: any
}

function TablePaginatedPagination(props: ITablePaginationGeneric) {

    const { tamanhoLista, page, setPage, rowsPerPage, setRowsPerPage } = props;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={tamanhoLista}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={'Itens por pagina:'}
            page={page > tamanhoLista ? 0 : page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginatedPaginationActions}
            labelDisplayedRows={({ from, count }) => {
                const totalPages = Math.ceil(count / rowsPerPage);
                const currentPage = Math.floor(from / rowsPerPage) + 1;
                return `${currentPage} de ${totalPages}`;
            }
            }
            sx={{
                ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                    fontWeight: "bold",
                    color: "green",
                    marginTop: '0.8rem',
                },
                ".MuiTablePagination-displayedRows": {
                    marginTop: '1rem',
                    fontWeight: 'bold'
                },
                ".MuiTablePagination-selectLabel, .MuiTablePagination-input, .MuiSelect-select": {
                    fontWeight: 'bold'
                },
            }}
        />
    )
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginatedPaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
