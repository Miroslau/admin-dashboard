import React, { FC } from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  // @ts-ignore
  const titleColor = theme.palette.secondary[100];
  // @ts-ignore
  const subTitleColor = theme.palette.secondary[300];

  return (
    <Box>
      <Typography
        variant="h2"
        color={titleColor}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={subTitleColor}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
