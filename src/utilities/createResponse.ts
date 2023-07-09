const createResponse = (data: object[] | object, status?: number, message?: string) => {
  const response = { status, message, data };
  return response;
};

export default createResponse;
