import {BackgroundImage, Body, DirectoryItemContainer} from'./directory-item.sytyles'
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { DirectoryCategory } from '../categories-list/categories-list.component';
type DirectoryItemProps = {
  category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
      <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage imageurl={imageUrl}
        />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    );
  };
  
  export default DirectoryItem;