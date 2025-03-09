import CategoryPreview from "../../components/category-preview/category-preview.component";
import { Fragment } from "react";
import {selectCategoriesMap, selectCategoriesIsLoading} from '../../store/categories/category.selector';
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {
        isLoading?<Spinner/>:Object.keys(categoriesMap).map(title => 
          <Fragment>
              {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />;
              })}
          </Fragment>
        )
      }
    </Fragment>
  );
};

export default CategoriesPreview;
