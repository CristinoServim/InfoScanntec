import { Icon, Avatar, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import logo from '../../../assets/imgs/logo copy.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';

interface IListItemLinkProps {
    to: string;
    icon: any;
    label: string;
    onClick: (() => void) | undefined;
}

interface IMenuLateralProps {
    children: React.ReactNode
};

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon sx={{ color: 'white' }}>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} sx={{ color: 'white' }} />
        </ListItemButton>

    )
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { limparUsuario } = useAuth();

    const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
            {isDrawerOpen &&
                <>
                    <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen} >
                        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" bgcolor='green'>

                            <Box
                                width="100%"
                                height={theme.spacing(20)}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                marginTop={2}
                            >
                                <Avatar
                                    sx={{ height: theme.spacing(12), width: theme.spacing(12), marginBottom: 1 }}
                                    src={logo}
                                />
                                <Typography color={'white'} fontSize={22} textAlign="center" marginBottom={1}>
                                    InfoScanntech
                                </Typography>
                            </Box>


                            <Divider color='white' />

                            <Box flex={1} >
                                <List component="nav">
                                    {drawerOptions.map(drawerOption => (
                                        <ListItemLink
                                            to={drawerOption.path}
                                            key={drawerOption.path}
                                            icon={drawerOption.icon}
                                            label={drawerOption.label}
                                            onClick={smDown ? toggleDrawerOpen : undefined}
                                        />
                                    ))}
                                </List>

                            </Box>

                            <Box>
                                <List component="nav">
                                    <ListItemButton onClick={() => { limparUsuario(); toggleDrawerOpen(); navigate('/login') }}>
                                        <ListItemIcon sx={{ color: 'red' }}>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" sx={{ color: 'red' }} />
                                    </ListItemButton>
                                </List>
                            </Box>

                        </Box>
                    </Drawer>
                </>
            }

            <Box height="100vh" marginLeft={smDown || !isDrawerOpen ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};