import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  useMediaQuery,
  Popover,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

interface LayoutProps {
  children: React.ReactNode; // Conteúdo principal da página
  onLogout: () => void; // Função de logout
}

const drawerWidth = 240;

export const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null); // Âncora para o menu
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Opção selecionada

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>, option: string) => {
    setMenuAnchor(event.currentTarget); // Define o elemento que abriu o menu
    setSelectedOption(option); // Salva a opção selecionada
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null); // Fecha o menu
    setSelectedOption(null); // Reseta a opção selecionada
  };

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? "auto" : drawerWidth,
        backgroundColor: "primary.main",
        color: "#fff",
        height: "100%",
        overflow: "hidden", // Remove a rolagem horizontal
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItem button onClick={(e) => handleOptionClick(e, "Opção 1")}>
          <ListItemText primary="Opção 1" />
        </ListItem>
        <ListItem button onClick={(e) => handleOptionClick(e, "Opção 2")}>
          <ListItemText primary="Opção 2" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "primary.main",
              color: "#fff",
              overflow: "hidden", // Evita barras desnecessárias
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* AppBar no Mobile */}
      {isMobile && (
        <Toolbar
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            zIndex: theme.zIndex.drawer + 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Button variant="contained" color="error" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      )}

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centraliza o conteúdo
        }}
      >
        {isMobile && <Toolbar />} {/* Espaço para compensar o AppBar */}
        {children}
      </Box>

      {/* Botão de Logout no Desktop */}
      {!isMobile && (
        <Box
          sx={{
            position: "fixed", // Fixa o botão no canto superior direito
            top: 16,
            right: 16,
          }}
        >
          <Button variant="contained" color="error" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      )}

      {/* Menu de Contexto */}
      <Popover
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            {selectedOption}
          </Typography>
          <Button variant="text" onClick={handleCloseMenu}>
            Ação 1
          </Button>
          <Button variant="text" onClick={handleCloseMenu}>
            Ação 2
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};
