import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "../../components/section-components/header/Header";
import { useGetProductsQuery } from "../../store/state/api/api";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import Product from "./product/Product";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box p="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          pt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Modal>
          <Loader />
        </Modal>
      )}
    </Box>
  );
};

export default Products;
