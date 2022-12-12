import React, { FC, SyntheticEvent, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../flex-between/flex-between";
import { useDispatch } from "react-redux";
import { setMode } from "../../../store/state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { User } from "../../../types";

const appBarPropertyStyle = {
  position: "static",
  background: "none",
  boxShadow: "none",
};

const toolBarPropertyStyle = {
  justifyContent: "space-between",
};

const darkModeOutlinedStile = {
  fontSize: "25px",
};

const buttonStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textTransform: "none",
  gap: "1rem",
};

interface NavBarProps {
  isSideBarOpen?: boolean;
  user: User | undefined;
  setIsSideBarOpen?: (isSideBarOpen: boolean) => void;
}
const NavBar: FC<NavBarProps> = ({ isSideBarOpen, setIsSideBarOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null
  );

  const isOpen = Boolean(anchorEl);

  const handleMode = () => dispatch(setMode());

  const handleClick = (event: SyntheticEvent): void =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  // @ts-ignore
  const textStyle = { color: theme.palette.secondary[200] };
  // @ts-ignore
  const nameStyle = { color: theme.palette.secondary[100] };

  const ArrowDropDownOutlinedStyle = {
    // @ts-ignore
    color: theme.palette.secondary[300],
    fontSize: "25px",
  };

  return (
    <AppBar sx={appBarPropertyStyle}>
      <Toolbar sx={toolBarPropertyStyle}>
        <FlexBetween>
          <IconButton onClick={setIsSideBarOpen?.bind(this, !isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            // @ts-ignore
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3em"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          <IconButton onClick={handleMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={darkModeOutlinedStile} />
            ) : (
              <LightModeOutlined sx={darkModeOutlinedStile} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={darkModeOutlinedStile} />
          </IconButton>
          <FlexBetween>
            <Button sx={buttonStyle} onClick={handleClick}>
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={nameStyle}>
                  {user?.name}
                </Typography>
                <Typography fontSize="0.75rem" sx={textStyle}>
                  {user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined sx={ArrowDropDownOutlinedStyle} />
            </Button>
            <Menu
              open={isOpen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
