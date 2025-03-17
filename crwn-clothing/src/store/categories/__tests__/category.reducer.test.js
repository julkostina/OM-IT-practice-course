import { categoriesReducer, CATEGORIES_INITIAL_STATE } from "../category.reducer";
import { FetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSuccess } from "../category.action";

describe('Categories reducer tests', () => {
    test('FetchCategoriesStart',()=>{
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, FetchCategoriesStart())).toEqual(expectedState)
    })
    test('fetchCategoriesSuccess',()=>{
        const mockCategories = [
            {
                title: 'mens',
                items: [
                    { id: 1, name: 'Product 1' },
                    { id: 2, name: 'Product 2' },
                ],
            },
        ]
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockCategories
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockCategories))).toEqual(expectedState)
    })
    test('fetchCategoriesFailed',()=>{
        const mockError = new Error('Error fetching categories')
        const expectedState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState)
    })
});