import React, { FC } from "react";
import { Navigaion, navItems } from "../side-bar/constants";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronRightOutlined } from "@mui/icons-material";

interface ListProps {
  items: Navigaion[];
  listStyle?: {};
  handleNavigate?: (text: string) => void;
  typographyStyle?: {};
  activeItem?: string;
}

const CustomList: FC<ListProps> = ({
  items,
  listStyle,
  handleNavigate,
  typographyStyle,
  activeItem,
}) => {
  const theme = useTheme();
  return (
    <List sx={listStyle}>
      {items.map(({ text, icon }) => {
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
                  activeItem === lcText
                    ? // @ts-ignore
                      theme.palette.secondary[300]
                    : "transparent",
                color:
                  activeItem === lcText
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
                    activeItem === lcText
                      ? // @ts-ignore
                        theme.palette.primary[600]
                      : // @ts-ignore
                        theme.palette.secondary[200],
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
              {activeItem === lcText && (
                <ChevronRightOutlined sx={{ ml: "auto" }} />
              )}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
