import enMessages from './messages/en.json';
import plMessages from './messages/pl.json';

//https://stackoverflow.com/questions/45783677/react-intl-accessing-nested-messages
function flattenMessages(nestedMessages: any, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages: any, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }
    return messages;
  }, {});
}

export const messages = {
  en: flattenMessages( enMessages),
  pl: flattenMessages(plMessages),
};
