// src/components/MenuLayout.tsx
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Added missing import
import SearchIcon from "@mui/icons-material/Search"; // Added missing import
import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { Router } from "@toolpad/core/AppProvider"; // Added type import
import { AppProvider } from "@toolpad/core/AppProvider"; // Corrected Router import
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { DemoProvider } from "@toolpad/core/internal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UserProfileMenu from "../app-perfil/UserProfileMenu"; // Importing UserMenu component

import React from "react";
import LogoLight from "../../../assets/logo.svg";
import LogoDark from "../../../assets/logoDark.svg";
import { NAVIGATION, demoTheme } from "./MenuLayoutConstants";



// Custom App Title Component
export function CustomAppTitle() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark-logo" : "light-logo"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={isDark ? LogoLight : LogoDark}
            alt="Logo"
            style={{ height: 48, transition: "height 0.3s ease" }}
          />
        </motion.div>
      </AnimatePresence>

      <Typography variant="h6" fontWeight="bold">
        PANEL ADMINISTRATIVO
      </Typography>

      <Tooltip title="Sistema activo y conectado">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <CheckCircleIcon color="success" fontSize="medium" />
        </motion.div>
      </Tooltip>
    </Stack>
  );
}

// Enhanced Search Component
export function ToolbarActionsSearch() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {searchOpen ? (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 300 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TextField
            autoFocus
            label="Buscar en el sistema..."
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              mr: 1,
              "& .MuiInputBase-root": {
                borderRadius: 4,
                bgcolor: "background.paper",
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setSearchOpen(false)} size="small">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </motion.div>
      ) : (
        <Tooltip title="Buscar" enterDelay={300}>
          <IconButton onClick={() => setSearchOpen(true)} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Menú completo de perfil de usuario */}
      {/* TODO: Replace this mock user with the actual user object from your authentication context or state */}
      <UserProfileMenu
        user={{
          name: "Julio César",
          lastName: "Bustamante",
          email: "julio@example.com",
          photo: "https://i.pravatar.cc/150?img=8",
        }}
      />

      <ThemeSwitcher />
    </Stack>
  );
}

// Sidebar Footer with Animation
export function SidebarFooter({ mini }: { mini: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Typography variant="caption" sx={{ m: 1, opacity: 0.75 }}>
        {mini ? "©" : `© ${new Date().getFullYear()} Sistema Administrativo`}
      </Typography>
    </motion.div>
  );
}

// Main App Menu Component
export function AppMenu({
  children,
  window,
}: {
  children: React.ReactNode;
  window?: () => Window;
}) {
  const location = useLocation();
  const navigate = useNavigate();

   const audioRef = useRef<HTMLAudioElement>(null);

  const router: Router = React.useMemo(
    () => ({
      pathname: location.pathname,
      navigate: (to: string | URL) => {
        if (typeof to === "string") {
          navigate(to);
        } else {
          // Handle URL objects
          navigate(to.toString());
        }
      },
      searchParams: new URLSearchParams(location.search),
    }),
    [location, navigate]
  );
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.2;
      audio.play().catch(() => {
        console.warn("El navegador ha bloqueado la reproducción automática.");
      });
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <DemoProvider window={window?.()}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={window?.()}
      >
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          {children}
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
