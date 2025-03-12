import { useParams } from "react-router-dom";
import "./category.styles.scss";
import React from "react";
import {  useState,Fragment } from "react";
import ProductCard from "../../components/product-card/product-card";
import {gql, useQuery, useMutation} from "@apollo/client";

const GET_CATEGORY = gql`
  query ($title: String) {
    getCollectionsByTitle(title: $title) {
      title
      id
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const SET_CATEGORY = gql`
  mutation ($category: category!){
    addCategory(category: $category){
      id
      title
      items{
        id
        name
        price
        imageUrl
      }
    }
  }`
const Category = () => {
  const { category } = useParams();
  // const [addCategory, {loading, error, data} ] = useMutation(SET_CATEGORY);
const {loading, error, data} = useQuery(GET_CATEGORY, {
variables:{
  title: category
},
})
console.log(data);
React.useEffect(()=>{
if(data){
  const {getCollectionsByTitle:{items}} = data;
  setProducts(items);
}
}, [data, category])
  const [products, setProducts] = useState([]);

  return (
    <Fragment>
    <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
    <div className="category-container-body">
      {products&&products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </Fragment>
  );
};
export default Category;
