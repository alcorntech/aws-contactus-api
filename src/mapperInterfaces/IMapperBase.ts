export interface IMapperBase<M, D> {
  modelToDto(model: M): Promise<D>;

  dtoToModel(dto: D): Promise<M>;
}
