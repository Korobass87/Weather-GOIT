import quotes from "../json/quotes.json"

export default function fetchRandomQuote() {
  // const quotes = require('../json/quotes.json');
  const quoteContainer = document.querySelector('.quote');
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteContainer.innerHTML = `
  <span class="quote__text">
  ${quote.q}
  </span>
  <span class="quote__author">
  ${quote.a}
  </span>
  `;
  return quote;
}
