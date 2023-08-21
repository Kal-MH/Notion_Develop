export type DocumentType = {
  id: number;
  title: string;
  documents: DocumentType[];
};

export type DocumentListType = DocumentType[];

export type responseCreatedNewDocumentType = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StorageDocumentType = {
  [id: number]: boolean;
};
