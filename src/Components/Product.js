import React from 'react';
import styled from 'styled-components';

const ProductContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 40px;
  width: 100%;
  max-width: 240px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 180px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

const ProductTag = styled.div`
  padding: 5px 10px;
  color: white;
  background-color: ${props => (props.tag === 'Sale' ? 'red' : 'black')};
  border-radius: 5px;
  margin-top: 10px;
  text-align: center;
`;

const Product = ({ item }) => {
  if (!item || !item.images || !item.images.length) {
    return null; // Handle missing data
  }

  return (
    <ProductContainer>
      <ProductImage src={item.images[0]} alt={item.title} />
      {item.tag && (
        <ProductTag tag={item.tag}>
          {item.tag}
        </ProductTag>
      )}
      <ProductTitle>{item.title}</ProductTitle>
      <ProductPrice>$ {item.price}</ProductPrice>
    </ProductContainer>
  );
};

export default Product;
