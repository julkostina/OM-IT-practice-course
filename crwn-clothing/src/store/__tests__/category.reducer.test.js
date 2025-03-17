import { categoriesReducer, CATEGORIES_INITIAL_STATE } from "../categories/category.reducer";
import { FetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "../categories/category.action"; 

describe('Categories reducer tests', () => {
    test('fetchCategoriesStart', ()=>{
        const expectedState  ={
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, FetchCategoriesStart())).toEqual(expectedState)
    })
    test('fetchCategoriesSuccess', ()=>{
        const mockData = [
            {
                title: 'mens',
                items: [
                  { id: 1, name: 'Product 1' },
                  { id: 2, name: 'Product 2' },
                ],
              },
        ]
        const expectedState  ={
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData))).toEqual(expectedState)
    })
    test('fetchCategoriesFailed', ()=>{
        const mockError  =new Error('Error fetching categories');
        const expectedState  ={
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            error: mockError
        }
        expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError))).toEqual(expectedState)
    })
}) 