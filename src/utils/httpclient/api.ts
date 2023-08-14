import axios from 'axios';

const api = async (
  method: any,
  url: string,
  customHeaders: any,
  data: any,
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream',
  responseEncoding?: any,
) => {
  return new Promise(async (resolve, reject) => {
    axios({
      url,
      method,
      responseType: responseType,
      responseEncoding: responseEncoding,
      params: method === 'get' ? data : undefined,
      data: method !== 'get' ? data : undefined,
      timeout: 60000,
    })
      .then(
        response => {
          resolve(response.data);
        },
        async error => {
          const err = {...error};
          if (error?.response?.data) {
            reject({
              ...error.response.data,
              responseStatus: err.response?.status,
              status:
                error.response.data.status || error.response.data.statusCode,
            });
          } else {
            reject({
              apiError: true,
              code: 'API ERROR',
            });
          }
        },
      )
      .catch(error => {
        reject({
          serverError: true,
          code: 'SERVERERROR',
        });
        throw error;
      });
  });
};

export const apiManager = {
  get: (
    url: string,
    data?: any,
    customHeaders?: any,
    responseType?:
      | 'arraybuffer'
      | 'blob'
      | 'document'
      | 'json'
      | 'text'
      | 'stream',
    responseEncoding?: any,
  ) => api('get', url, customHeaders, data, responseType, responseEncoding),
  post: (url: string, data?: any, customHeaders?: any) => {
    return api('post', url, customHeaders, data, undefined, undefined);
  },
};
