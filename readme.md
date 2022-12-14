<h1>SCHOOL OF JAVA - Book Sharing Spring Application

<h2>A simple Spring application that manages book sharing between users.

<h2>Futures<br><br>

- Users can create an account with their data
- Users can add books
- Users can add books in their wishlist
- Users can rent books from eachother
- Users can manage who rents from them
- Users can manage when must return books
- Users can get a list of available books, also searching by title or author
- Users can extend their renting with one week
- Application can manage same book added, and merging into one entity
- Application can manage already rented books.

<br><br>

<h2>Changelog<br><br>

[14/07]<br><br>

- Fixed renting period extend
- Entity services will return ResponseEntity for implementing better handling to avoid 500 server error
- Handling for field validation, returning to user which field is incorrect
- Swagger UI documentation available at http://localhost:8080/swagger.html
- Started to work at password hashing using Spring Security
- Find by id handling for empty case 
- Minor fixes over existent code
- Added README.md for a consistent changelog

<br><br>
<h2>Currently working<br><br>

- Researching Spring Security for password hashing, authentication and authorization
- Researching React for implementing UI (for beggin will be just a simple UI that shows tables/ inserts users/ books/ etc.
- Researching exceptions handling
- Researching unit test
