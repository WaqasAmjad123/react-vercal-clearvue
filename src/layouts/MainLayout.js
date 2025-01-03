import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  Badge,
  Tooltip,
  ListItemButton
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Assignment,
  Business,
  Assessment,
  AccountCircle,
  Settings,
  Logout,
  Notifications,
  Mail,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DRAWER_WIDTH = 280;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Customers', icon: <People />, path: '/customers' },
    { text: 'Projects', icon: <Assignment />, path: '/projects' },
    { text: 'Suppliers', icon: <Business />, path: '/suppliers' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' }
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <img 
          src="/logo.png" 
          alt="ClearVue" 
          style={{ height: 40, width: 'auto' }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}
        >
          ClearVue
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isActive}
              sx={{
                my: 0.5,
                borderRadius: 2,
                color: isActive ? theme.palette.primary.main : 'text.primary',
                backgroundColor: isActive ? `${theme.palette.primary.main}15` : 'transparent',
                '&:hover': {
                  backgroundColor: isActive 
                    ? `${theme.palette.primary.main}25`
                    : `${theme.palette.primary.main}10`,
                },
                '& .MuiListItemIcon-root': {
                  color: isActive ? theme.palette.primary.main : 'text.secondary',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400
                }}
              />
              {isActive && <ChevronRight color="primary" />}
            </ListItemButton>
          );
        })}
      </List>

      {/* User Profile Section */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              width: 40,
              height: 40
            }}
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.username || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
          '& .MuiToolbar-root': {
            minHeight: '70px',
            padding: '0 24px',
          },
          '& .MuiAvatar-root': {
            width: 40,
            height: 40,
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }
          }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}15`
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Project Name Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1
          }}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  letterSpacing: '0.5px',
                  lineHeight: 1.2
                }}
              >
                ClearVue
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'block',
                  letterSpacing: '0.5px'
                }}
              >
                Solar Energy Management
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Tooltip title="Account settings">
            <IconButton 
              onClick={handleProfileMenuOpen}
              sx={{ 
                p: 0,
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <Avatar>
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 220,
                mt: 1.5,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}15`
                  }
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.username || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email || 'user@example.com'}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <Settings fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Settings" 
                primaryTypographyProps={{
                  fontSize: '0.9rem'
                }}
              />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  color: theme.palette.error.main
                }}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH,
              borderRight: 'none',
              bgcolor: 'background.paper'
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH,
              borderRight: 'none',
              bgcolor: 'background.paper',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          marginTop: '64px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 