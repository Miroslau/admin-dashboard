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
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
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
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={typographyStyle}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={handleNavigate?.bind(this, lcText)}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? // @ts-ignore
                              theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? // @ts-ignore
                              theme.palette.primary[600]
                            : // @ts-ignore
                              theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? // @ts-ignore
                                theme.palette.primary[600]
                              : // @ts-ignore
                                theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
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
