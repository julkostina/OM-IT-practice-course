import {BackgroundImage, Body, DirectoryItemContainer} from'./directory-item.sytyles'
import { useNavigate } from 'react-router-dom';
const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
      <DirectoryItemContainer onclick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl}
        />
        <Body>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    );
  };
  
  export default DirectoryItem;