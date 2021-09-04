import {apiProperties} from './properties';

export const getListPlacesByTypeId = async (data, id) => {
  console.log(data);
  console.log(id);

  const urlBase = data.urlBase;
  const ApiEndPoint = data.endPoint.listPlacesByTypeId;
  const response = await fetch(urlBase + ApiEndPoint);
  console.log(response);
  return response;
};
