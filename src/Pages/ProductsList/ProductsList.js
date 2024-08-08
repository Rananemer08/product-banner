import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Products from "../../Components/Products";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin: 20px;
  text-align: center;
  margin-top: -4px;
  margin-bottom:80px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
    font-size: 14px;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 20px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 95%;
    font-size: 14px;
  }
`;

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState("newest");

  const staticProducts = [
    { id: 1, title: "Elegant White Shirt", price: 120, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/2c/P00799937.jpg"], bestSeller: true, createdAt: new Date('2024-01-01'), category: 'clothes', tag: 'Sale' },
    { id: 2, title: "Classic Black Pants", price: 150, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/e2/P00936512.jpg"], bestSeller: false, createdAt: new Date('2024-02-01'), category: 'clothes', tag: 'Out of Stock' },
    { id: 3, title: "Stylish Shoes", price: 200, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/19/P00681172.jpg"], bestSeller: true, createdAt: new Date('2024-03-01'), category: 'shoes' },
    { id: 4, title: "Casual Blue Jeans", price: 80, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/c3/P00741441.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 5, title: "Fancy Bag", price: 90, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/88/P00897574.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'accessories', tag: 'Sale' },
    { id: 6, title: "Fancy Red Dress", price: 170, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/39/P00959166.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 7, title: "Gavin Blazer", price: 140, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/29/P00966672.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes', tag: 'Out of Stock' },
    { id: 8, title: "Soft Demi faux clutch", price: 210, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/8a/P00947098.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'accessories' },
    { id: 9, title: "Jealousy cotton velvet blazer", price: 3000, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/4b/P00958494.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 10, title: "Dior Eyewear", price: 3200, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/d9/P00976870.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'accessories' },
    { id: 11, title: "Classy Valentino Bag", price: 100, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/84/P00939856.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'accessories' },
    { id: 12, title: "Khaite Bag", price: 3000, images: ["https://img.mytheresa.com/1094/1238/100/jpeg/catalog/product/d2/P00940056.jpg"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'accessories' },
    { id: 13, title: "Livia Fit & Flare Dress", price: 860, images: ["https://n.nordstrommedia.com/id/sr3/2360177d-5fd5-498f-9f92-a5a284f0465e.jpeg?crop=pad&w=780&h=1196"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 14, title: "T-shirt Maxi Dress", price: 200, images: ["//media.nastygal.com/i/nastygal/bgg22642_black_xl?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 15, title: "Basic Black T-shirt", price: 60, images: ["//media.nastygal.com/i/nastygal/bgg22637_black_xl?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'clothes' },
    { id: 16, title: "Flatbet Sandals", price: 60, images: ["//media.nastygal.com/i/nastygal/bgg23542_black_xl?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'shoes', tag: 'Sale' },
    { id: 17, title: "Flower Heels", price: 180, images: ["//media.nastygal.com/i/nastygal/bgg20824_pink_xl/female-pink-satin-oversized-flower-strappy-heels/?w=1070&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'shoes' },
    { id: 18, title: "Faux Leather Sandals", price: 98, images: ["//media.nastygal.com/i/nastygal/bgg22959_white_xl/female-white-faux-leather-woven-sandals/?w=1070&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"], bestSeller: false, createdAt: new Date('2024-04-01'), category: 'shoes' },
  ];

  useEffect(() => {
    setProducts(staticProducts);
    setFilteredProducts(staticProducts);
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      results = results.filter((product) => product.category === category);
    }

    setFilteredProducts(results);
  }, [searchTerm, category, products]);

  useEffect(() => {
    let sortedProducts = [...filteredProducts];

    if (sort === "newest") {
      sortedProducts.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(sortedProducts);
  }, [sort]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container>
      <Title>Products</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Search By Name:</FilterText>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Filter>
        <Filter>
          <FilterText>Filter By Category:</FilterText>
          <Select value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="clothes">Clothes</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
            <option value="az">Alphabetical (A to Z)</option>
            <option value="za">Alphabetical (Z to A)</option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products products={filteredProducts} />
    </Container>
  );
};

export default ProductList;
