export as namespace realm

export namespace realm {

  export interface Meta {
      created_at: Date;
      updated_at: Date;
  }

  export interface Data {
      id: string;
      name: string;
      meta: Meta;
      type: string;
  }

  export interface Links {
      self: string;
  }

  export interface RealmsBase {
      data: Data;
      links: Links;
  }

}
