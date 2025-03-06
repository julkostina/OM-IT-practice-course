import React from 'react';
import {CategoryBodyContainer, BackgroundImage, CategoriesContainer, CategoryContainer } from'./categories-list.styles'
import DirectoryItem from '../directory-item/directory-item.component';
const categories = [
  {
    title: 'Hats',
    id: 1,
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route:'shop/hats'
  },
  {
    title: 'Jackets',
    id: 2,
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route:'shop/jackets'
  },
  {
    title: 'Sneakers',
    id: 3,
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers'
  },
  {
    title: 'Womens',
    id: 4,
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    title: 'Mens',
    id: 5,
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png', 
    route: 'shop/mens'
  },
]

const CategoriesList = () => {
  return(
    <CategoriesContainer>
      {categories.map((category) => (      
        <DirectoryItem key={category.id} category={category} />
      ))}
    </CategoriesContainer>);
}
export default CategoriesList;