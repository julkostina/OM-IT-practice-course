import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.action";
import {Routes, Route} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
           const getCategoryMap = async () => {
           const categoriesArray= await getCategoriesAndDocuments('categories');
           console.log(categoriesArray);
           dispatch(setCategories(categoriesArray))
           }
           getCategoryMap();
  
      }, []);
  return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category />}/>
        </Routes>
  );
};

export default Shop;
