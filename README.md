# SmartBiz – Smart Buying Assistant

A simple web app that helps small Indian shopkeepers decide **what to buy first** when their restocking budget is limited.

## Features
- Dashboard: total products, low-stock alerts, near-expiry alerts, buying budget
- Inventory: add/edit/delete products, search, sort and filters
- Receive Stock: enter a supplier bill (or try the demo bill), review and confirm before stock is updated; duplicate imports are blocked
- Buying Recommendations: priority, quantity, unit price, total cost and remaining budget
- Reports and CSV export, CSV bulk import
- English, Hindi and Marathi
- Data is saved in the browser (localStorage)

## How to run
Keep the three files in the same folder and open `index.html` in Chrome. No installation needed.

## Files
| File | Language | Purpose |
|---|---|---|
| `index.html` | HTML | Page structure |
| `style.css` | CSS | Design and layout |
| `script.js` | JavaScript | All logic (recommendations, supplier bill, translations, navigation, CSV) |

## Notes
- Reading a bill from a photo (OCR) needs an internet connection the first time; results must always be checked and confirmed by the user.
- Built with AI assistance (Claude by Anthropic).
