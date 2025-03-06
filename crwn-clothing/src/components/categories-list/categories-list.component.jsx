import React from 'react';
import {CategoryBodyContainer, BackgroundImage, CategoriesContainer, CategoryContainer } from'./categories-list.styles'
import DirectoryItem from '../directory-item/directory-item.component';
const CategoriesList = ({ categories }) => {
  return(
    <CategoriesContainer>
      {categories.map((category) => (      
        <DirectoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>);
}
export default CategoriesList;