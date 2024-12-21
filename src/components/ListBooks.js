import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class ListBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/books")
      .then((response) => {
        if (response.data) {
          this.setState({ books: response.data });
        } else {
          console.error("Invalid data format", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  }
  deleteBook(id) {
    axios
      .delete(`http://localhost:4000/books/delete-book/${id}`)
      .then((res) => {
        console.log("Book successfully deleted!");
        this.setState({
          books: this.state.books.filter((book) => book._id !== id),
        });
      })
      .catch((error) => {
        console.error("There was an error deleting the book!", error);
      });
  }
  render() {
    const { books } = this.state;
    if (books.length === 0) {
      return <p>No books available.</p>;
    }
    return (
      <div className="books-list">
        <h1>Books List</h1>
        <Row>
          {books.map((book) => (
            <Col key={book._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={book.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Categories:</strong> {book.categories.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong> {book.status}
                  </Card.Text>
                  <Link
                    className="edit-link py-2"
                    to={`/edit-book/${book._id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => this.deleteBook(book._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default ListBooks;
