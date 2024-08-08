import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px;
    justify-content: center;
  }
`;

const Products = ({ products }) => {
  return (
    <Container>
      {products.length > 0 ? (
        products.map((item) => (
          <Product item={item} key={item.id} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </Container>
  );
};

export default Products;
