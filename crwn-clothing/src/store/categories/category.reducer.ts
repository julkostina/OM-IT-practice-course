import { Category } from "./category.types";
import { AnyAction } from "redux";
import { fetchCategoriesSuccess, fetchCategoriesFailed, fetchCategoriesStart, FetchCategoriesStart} from './category.action';
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
} 
export const CATEGORIES_INITIAL_STATE:CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState=> {
   if(FetchCategoriesStart.match(action)){
    return {...state, isLoading: true}
   }
   if(fetchCategoriesSuccess.match(action)){
    return {...state, categories: action.payload, isLoading: false}
   }
    if(fetchCategoriesFailed.match(action)){
      return {...state, error: action.payload, isLoading: false}
    }
  return state;
};
