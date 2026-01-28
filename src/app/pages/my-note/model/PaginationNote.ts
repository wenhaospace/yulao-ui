import { Note } from "./Note";

export interface PaginationNote {
  pageNum: number;
  pageSize: number; 
  total: number; 
  list: Note[];

}