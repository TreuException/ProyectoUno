export const apiProperties = {

  urlBase: 'http://192.243.96.143:7612',
  //urlBase: 'http://192.168.0.6:7612', //Desarrollo
  //urlPhotoServer: 'http://192.168.0.6:8080/',  //Desarrollo
  urlPhotoServer: 'http://192.243.96.143/',
  endPoint: {
    listTypePlaces: '/listAllTypePlaces',
    listPlacesByTypeId: '/listPlacesByTypeId/',
    listCommentsByPlaces: '/listCommentsByPlaces/',
    saveNewComments: '/saveNewComments'
  },
  typePlacesSelect: '',
  placeSelect: ''
};


export const ID_TYPE_PLACER = {
  ERROR: 0,
	PLACES: 1,
	BEACHES: 2,
  RESTAURANT: 3,
}