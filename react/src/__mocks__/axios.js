// export default {
//   get: jest.fn().mockResolvedValue({ data: {} })
// };

const mockNoop = () => new Promise(() => {});

export default {
  get: jest.fn().mockResolvedValue({ data: {} }),
  default: mockNoop,
  post: mockNoop,
  put: mockNoop,
  delete: mockNoop,
  patch: mockNoop,
};
