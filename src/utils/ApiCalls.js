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
    console.log(e);
    throw error;
  }
};
