import { createContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
export const CategoriesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(COLLECTIONS);
  console.log(data);
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
