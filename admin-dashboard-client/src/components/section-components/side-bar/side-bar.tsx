import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../flex-between/flex-between";
import profileImage from "assets/profile.jpeg";
import { navItems } from "./constants";
import { User } from "../../../types";
import CustomList from "../list/list";
interface SideBarProps {
  isNonMobile?: boolean;
  drawerWidth?: string;
  isSideBarOpen?: boolean;
  user: User | undefined;
  setIsSideBarOpen?: (isSideBarOpen: boolean) => void;
}

const SideBar: FC<SideBarProps> = ({
  isNonMobile,
  drawerWidth,
  user,
  isSideBarOpen,
  setIsSideBarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [isMouseOnIdeBar, setMouseOnSideBar] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const drawerStyle = {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      // @ts-ignore
      color: theme.palette.secondary[200],
      // @ts-ignore
      backgroundColor: theme.palette.background.alt,
      boxSizing: "border-box",
      borderWidth: isNonMobile ? 0 : "2px",
      width: drawerWidth,
    },
  };

  const settingOutlineStyle = {
    // @ts-ignore
    color: theme.palette.secondary[300],
    fontSize: "25px",
  };

  const typographyStyle = {
    m: "2.25rem 0 1rem 3rem",
  };

  const sideBarStyleWithoutScroll = {
    maxHeight: "calc(100% - 179px)",
    "& ::-webkit-scrollbar": {
      display: "none",
    },
  };

  const sideBarStyleWithScroll = {
    maxHeight: "calc(100% - 179px)",
    "& ::-webkit-scrollbar": {
      width: "4px",
    },
  };

  // @ts-ignore
  const textStyle = { color: theme.palette.secondary[200] };
  // @ts-ignore
  const nameStyle = { color: theme.palette.secondary[100] };

  const handleNavigate = (text: string) => {
    navigate(`/${text}`);
    setActive(text);
  };

  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={setIsSideBarOpen?.bind(this, false)}
          variant="persistent"
          anchor="left"
          sx={drawerStyle}
        >
          <Box width="100%" p="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  ECOMVISION
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton
                  onClick={setIsSideBarOpen?.bind(this, !isSideBarOpen)}
                >
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <Box
            width="100%"
            sx={
              isMouseOnIdeBar
                ? sideBarStyleWithScroll
                : sideBarStyleWithoutScroll
            }
            onMouseEnter={setMouseOnSideBar.bind(this, true)}
            onMouseLeave={setMouseOnSideBar.bind(this, false)}
          >
            <CustomList
              items={navItems}
              activeItem={active}
              handleNavigate={handleNavigate}
              listStyle={{
                width: "100%",
                position: "relative",
                overflow: "auto",
                maxHeight: "100%",
                paddingBottom: "50px !important",
              }}
              typographyStyle={typographyStyle}
            />
          </Box>
          <Box width="100%">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="0.5rem"
              p="1.5rem 2rem 2rem 2.5rem"
            >
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
                <Typography fontWeight="bold" fontSize="0.9rem" sx={nameStyle}>
                  {user?.name}
                </Typography>
                <Typography fontSize="0.8rem" sx={textStyle}>
                  {user?.occupation}
                </Typography>
              </Box>
              <SettingsOutlined sx={settingOutlineStyle} />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
