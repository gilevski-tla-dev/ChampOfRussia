// Пример структуры данных, которую ты получаешь
export interface ILeader {
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
}

export interface IRegionRepresentation {
  contacts: string;
  id: number;
  name: string;
  photo_url: string;
  type: string;
}

export interface IRegion {
  representation: IRegionRepresentation;
  leader: ILeader;
}

export interface IFederalDistrictData {
  name: string;
  regions: IRegion[];
}
