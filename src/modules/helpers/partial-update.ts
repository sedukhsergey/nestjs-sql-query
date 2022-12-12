export const partialUpdate = (entity, dto) => {
  for (const k in dto) {
    if (dto.hasOwnProperty(k) && dto[k] !== undefined) entity[k] = dto[k];
  }
  return entity;
};
