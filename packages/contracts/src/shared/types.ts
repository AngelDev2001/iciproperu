export type ISODateString = string;

export interface DefaultFirestoreProps {
  createdAt: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString;
  isDeleted: boolean;
}
