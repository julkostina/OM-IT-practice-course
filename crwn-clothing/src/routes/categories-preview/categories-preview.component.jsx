import CategoryPreview from "../../components/category-preview/category-preview.component";
import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const {categoriesMap, loading} = useContext(CategoriesContext);
  return (
    <Fragment>
      {loading? <Spinner/>: Object.keys(categoriesMap).map(title => 
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
              const products = categoriesMap[title];
              return <CategoryPreview key={title} title={title} products={products} />;
            })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
