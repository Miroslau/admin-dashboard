import React, { FC, useState } from "react";
import { Products } from "../../../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";

const Product: FC<Products> = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIxExpanded] = useState(false);

  // @ts-ignore
  const typographyColor = theme.palette.secondary[700];
  // @ts-ignore
  const typographyColorFourHundred = theme.palette.secondary[400];

  return (
    <Card
      sx={{
        backgroundImage: "none",
        // @ts-ignore
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={typographyColor} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ pb: "1.5rem" }} color={typographyColorFourHundred}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          size="small"
          onClick={setIxExpanded.bind(this, !isExpanded)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          // @ts-ignore
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          {/*<Typography>*/}
          {/*  Yearly Sales This Year: {stat.yearlySalesTotal}*/}
          {/*</Typography>*/}
          {/*<Typography>*/}
          {/*  Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}*/}
          {/*</Typography>*/}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
