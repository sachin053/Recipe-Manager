Recipe Manager – README

A simple and clean Recipe Manager web app built using HTML, CSS, JavaScript and LocalStorage.
No backend, no database — everything runs inside the browser.

🚀 How to Run the App

Running the project is very easy:

1. Download or clone the project

git clone https://github.com/sachin053/Recipe-Manager.git

2. Open the folder in VS Code
3. Run using Live Server

Right-click index.html
Click “Open with Live Server”
The app will open in your browser

Data Structure in LocalStorage
All recipes are stored in the browser’s localStorage under the key:
Each recipe is saved as an object like this:
{
  "id": 1,
  "name": "Paneer Butter Masala",
  "description": "Rich and creamy paneer curry.",
  "img": "image-url",
  "prepTime": 30,
  "difficulty": "Medium",
  "ingredients": ["Paneer", "Tomatoes", "Cream"],
  "steps": ["Make gravy", "Add paneer", "Add cream & serve"]
}

The structure is:
| Key           | Type   | Description               |
| ------------- | ------ | ------------------------- |
| `id`          | number | Unique ID for each recipe |
| `name`        | string | Recipe title              |
| `description` | string | Short details             |
| `img`         | string | Image URL (optional)      |
| `prepTime`    | number | Minutes required          |
| `difficulty`  | string | Easy / Medium / Hard      |
| `ingredients` | array  | List of ingredients       |
| `steps`       | array  | Steps to cook             |
The app loads default recipes once, then any new recipes or edits are stored locally.

📝 Assumptions & Design Decisions
1. The app uses only LocalStorage

No backend, no database — so all saved recipes exist only in your browser.

2. Images are entered as URLs
Users can paste any online image link.
If the link is wrong, the browser shows a fallback.

3. Default recipes cannot be deleted
This is intentional so that the app always contains at least 8 demo recipes for testing.

4. Search is simple text matching
It checks only recipe name, not ingredients or description.

5. Filtering is client-side
Search, difficulty filter, and time filter are combined using JavaScript.

⚠️ Known Issues / Limitations

These are normal limitations for a LocalStorage-based frontend app:

1. Images load slower if URL is big or slow
Since images come from external websites, buffering may occur.

2. LocalStorage can be cleared
If someone clears browser data, all user-added recipes disappear.

3. No offline image support
Only online URLs. Local drive images won't show.

4. No backend sync
Your recipes stay only on your device.
Opening the site on another device will not show your recipes.

5. Browser-only environment
Some old browsers may not support features like:

flex

grid

localStorage

🎉 Conclusion

This Recipe Manager is a simple, clean, user-friendly project for showcasing:

✔ CRUD operations
✔ LocalStorage data persistence
✔ Filters (Search, Difficulty, Prep Time)
✔ Responsive UI
✔ Modal-based form handling

