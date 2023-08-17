//error msg
export const ERROR_NEW_KEYWORD_MISSING = 'Error: missing new keyword';
export const ERROR_API_CALL = 'Error: Api call';

//state property names
const PROPERTIES = {
  ID: 'id',
  TITLE: 'title',
  CONTENT: 'content',
  DOCUMENTS: 'documents',
};

const { ID, TITLE, CONTENT, DOCUMENTS } = PROPERTIES;

// functions that check if state has the property
export const hasNewTarget = (target: object) => (target ? true : false);

export const hasId = (state: object) =>
  Object.prototype.hasOwnProperty.call(state, ID);

export const hasTitle = (state: object) =>
  Object.prototype.hasOwnProperty.call(state, TITLE);

export const hasContent = (state: object) =>
  Object.prototype.hasOwnProperty.call(state, CONTENT);

export const hasDocuments = (state: object) =>
  Object.prototype.hasOwnProperty.call(state, DOCUMENTS);

// functions that check it is array
export const isValidArray = (arr: object) => arr && Array.isArray(arr);
