import React from 'react';
import './categories-list.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component';
const CategoriesList = ({ categories }) => {
  return(
    <div className="categories-container">
      {categories.map((category) => (      
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>);
}
export default CategoriesList;