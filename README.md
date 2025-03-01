# My Book Review Website

Welcome to my personal book review website! 📚✨ Here, I share the books I've read, along with my thoughts, ratings, and key takeaways. The website provides a cozy, space-themed experience to make reading and exploring books more enjoyable. 🚀🌌


## Preview

Here are some preview images of the site:

Home page : ![](public/assets/images/home.png)
Add book page : ![](public/assets/images/add.png)
Notes page :  ![](public/assets/images/notes.png)

## Features

- 📖 **Book Listings**: View a collection of books I’ve read, along with their details like title, ISBN number, and cover images.
- ⭐ **Ratings & Reviews**: Each book is rated on a scale of 1 to 5 based on how much I liked and recommend it. The ratings are purely my personal opinion.
- 📝 **Notes & Key Points**: Highlighted key points that stood out to me while reading.
- 🔍 **Sorting & Filtering**: Books can be sorted by **Title, Rating, or Date Read** to help you find the ones you’re interested in.
- ➕ **Add & Edit Books**: Easily add new books and update existing entries as I continue reading.
- 📷 **Book Covers**: Integrated with the [Open Library API](https://openlibrary.org/dev/docs/api/covers) to fetch book covers for a visually appealing experience.
- 🎨 **Cozy Space-Themed UI**: The website features a calming space-themed background for a soothing reading experience.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templating
- **Backend**: Node.js with Express
- **API Integration**: Open Library API (fetched using Axios)
- **Database**: PostgreSQL

## Possible Enhancements

- 📊 **More Sorting & Filtering Options**
- 🎙️ **Audio Reviews / Summaries**
- 📅 **Reading Progress Tracker**
- 📚 **Book Recommendations Based on Interests**

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/coderPriyanshu007/My-Books-Library.git
   ```
2. Navigate to the project folder:
   ```sh
   cd My-Books-Library
   ```
3. Install dependencies:
   ```sh
   npm i
   ```
4. Start the server:
   ```sh
   node index.js
   ```

## Database Setup

1. **Create Database**: Open pgAdmin and create a new PostgreSQL database.
2. **Modify Database Connection**: Update the database configuration in `index.js` to match your PostgreSQL credentials.
3. **Create Tables**: Run the SQL queries from `queries.sql` to create the necessary tables in your database.

## Contribution

This is a personal project, but if you have any ideas or suggestions, feel free to open an issue or contribute! 😊

## License

This project is open-source and available under the MIT License.

---

Happy Reading! 🚀📖

