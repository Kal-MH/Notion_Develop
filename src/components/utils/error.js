// import { PROPERTIES } from "./constants.js";

//state properties
const PROPERTIES = {
  ID: 'id',
  TITLE: 'title',
  CONTENT: 'content',
  DOCUMENTS: 'documents',
};

const { ID, TITLE, CONTENT, DOCUMENTS } = PROPERTIES;

//properties
export const hasNewTarget = (target) => (target ? true : false);

export const hasId = (state) => Object.prototype.hasOwnProperty.call(state, ID);

export const hasTitle = (state) =>
  Object.prototype.hasOwnProperty.call(state, TITLE);

export const hasContent = (state) =>
  Object.prototype.hasOwnProperty.call(state, CONTENT);

export const hasDocuments = (state) =>
  Object.prototype.hasOwnProperty.call(state, DOCUMENTS);

//type
export const isValidArray = (arr) => arr && Array.isArray(arr);
