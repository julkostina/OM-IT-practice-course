dbMock = [
    'dog.com',
    'cheesepuff.com',
    'disney.com',
    'dogpictures.com'
]

const {googleSearch} = require('./script');
it('this is a test', () => {
    expect(googleSearch('testtest', dbMock)).toEqual([])
    expect(googleSearch('dog', dbMock)).toEqual(['dog.com','dogpictures.com'])

});