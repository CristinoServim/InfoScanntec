import { Avatar, Divider, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SyncIcon from '@mui/icons-material/Sync';
import { useDrawerContext } from '../../contexts';



interface IMenuLateralProps {
    children: React.ReactNode
}


export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center" bgcolor='#2E8B57'>
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://static.wixstatic.com/media/97349f_a4abdfe6f4384c2884ae2228ad3528b9~mv2.png/v1/fill/w_60,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Cabe%C3%A7alhoSIte_fw.png"
                        />
                    </Box>

                    <Divider />

                    <Box flex={1} bgcolor='#F0FFF0'>
                        <List component="nav">
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: '#2E8B57' }} />
                                </ListItemIcon>
                                <ListItemText primary="Página inicial" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsIcon sx={{ color: '#2E8B57' }} />
                                </ListItemIcon>
                                <ListItemText primary="Configuração" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SyncIcon sx={{ color: '#2E8B57' }} />
                                </ListItemIcon>
                                <ListItemText primary="Sincronização" />
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};