const createResponse = (data?: object[] | object, message?: string, status?: number) => {
  const response = { status, message, data };
  return response;
};

export default createResponse;
