import { createContext, useState, useEffect } from "react";
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({}); 
    const value = { categoriesMap }; 
    useEffect(() => {
         const getCategoryMap = async () => {
         const categoryMap= await getCategoriesAndDocuments();
         console.log(categoryMap);
         setCategoriesMap(categoryMap)
         }
         getCategoryMap()

    }, []);
  return (
    <CategoriesContext.Provider value={ value }>
      {children}
    </CategoriesContext.Provider>
  );
} 