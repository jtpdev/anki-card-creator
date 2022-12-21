import fetch from 'node-fetch';

// import processHtml from './lib/process-html.js';
import processHtml from './lib/manage-html.js';
import validateLanguage from './lib/validate-language.js';
/**
 * Gets the result for the given word
 * @param  {String} word Word to be searched
 * @param  {String} from from language, default en
 * @param  {String} to   to language, default es
 * @return {Object}      Object with the word data
 */

export default async (word, from = 'en', to = 'pt') => {
  validateLanguage(from)
  validateLanguage(to)
  // Set the url
  var url = `http://www.wordreference.com/${from}${to}/${word.trim()}`
  // Make the request
  const response = await fetch(url)
  var html = await response.text();
  // Process the HTML
  return processHtml(html)
}