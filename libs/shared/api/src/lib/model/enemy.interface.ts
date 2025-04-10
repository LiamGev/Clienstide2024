// import { Url } from "url";

export interface Enemy {
    _id?: string;
    name: string;
    type: string;
    health: number; 
    damage: number;
    class: string; 
    // imageurl: Url;
  }