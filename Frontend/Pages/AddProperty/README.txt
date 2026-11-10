# CODE DX — Add Property page

## Run the page
1. Extract the project folder.
2. Open `index.html` in your browser, or open the folder in VS Code and use the Live Server extension.
3. Keep the `css` and `js` folders in the same structure as shown.

## Files
- `index.html`: page structure and form fields.
- `css/style.css`: layout, colors, spacing, and responsive design.
- `js/script.js`: automatic capacity calculation, image upload/preview, validation, and demo publish behavior.

## Connect to the backend
The Publish button currently validates the form and logs a property object in the browser console. Replace the demo section in `js/script.js` with a `fetch()` request to your team's API endpoint when the backend is ready.

Note: this is a front-end implementation. It does not save property data to a server yet.
