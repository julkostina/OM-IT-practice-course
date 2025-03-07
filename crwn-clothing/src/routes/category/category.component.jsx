import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { useState, useEffect,Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  console.log('render/re-rendering category component');
  useEffect(() => {
    console.log('effect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
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
