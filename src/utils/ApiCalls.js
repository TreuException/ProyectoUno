import {apiProperties} from './properties';

export const getListPlacesByTypeId = async (data, id) => {
  console.log(data);
  console.log(id);

  try {
    const urlFinal = data.urlBase + data.endPoint.listPlacesByTypeId + id;

    console.log('url final: ' + urlFinal);

    return await fetch(urlFinal)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getListType = async (data) => {
  try {
    const urlFinal = data.urlBase + data.endPoint.listTypePlaces;

    console.log('url final: ' + urlFinal);

    return await fetch(urlFinal)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
