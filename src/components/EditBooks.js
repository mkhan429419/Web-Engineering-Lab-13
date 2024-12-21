import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isbn: "",
      pageCount: "",
      publishedDate: "",
      thumbnailUrl: "",
      shortDescription: "",
      longDescription: "",
      status: "PUBLISH",
      authors: "",
      categories: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const bookId = this.props.match.params.id;
    axios
      .get(`http://localhost:4000/books/edit-book/${bookId}`)
      .then((response) => {
        const book = response.data;
        this.setState({
          title: book.title,
          isbn: book.isbn,
          pageCount: book.pageCount,
          publishedDate: book.publishedDate,
          thumbnailUrl: book.thumbnailUrl,
          shortDescription: book.shortDescription,
          longDescription: book.longDescription,
          status: book.status,
          authors: book.authors.join(", "),
          categories: book.categories.join(", "),
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the book data!", error);
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const bookId = this.props.match.params.id;
    const updatedBook = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: this.state.pageCount,
      publishedDate: this.state.publishedDate,
      thumbnailUrl: this.state.thumbnailUrl,
      shortDescription: this.state.shortDescription,
      longDescription: this.state.longDescription,
      status: this.state.status,
      authors: this.state.authors.split(",").map((author) => author.trim()),
      categories: this.state.categories
        .split(",")
        .map((category) => category.trim()),
    };
    axios
      .put(`http://localhost:4000/books/update-book/${bookId}`, updatedBook)
      .then((res) => {
        console.log("Book successfully updated:", res.data);
        this.props.history.push("/books-list");
      })
      .catch((err) => {
        console.error("Error updating the book:", err);
      });
  }
  render() {
    return (
      <div className="form-wrapper">
        <h2>Edit Book</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              name="isbn"
              value={this.state.isbn}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="PageCount">
            <Form.Label>Page Count</Form.Label>
            <Form.Control
              type="number"
              name="pageCount"
              value={this.state.pageCount}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="PublishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              name="publishedDate"
              value={this.state.publishedDate}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ThumbnailUrl">
            <Form.Label>Thumbnail URL</Form.Label>
            <Form.Control
              type="text"
              name="thumbnailUrl"
              value={this.state.thumbnailUrl}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ShortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="shortDescription"
              value={this.state.shortDescription}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="LongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="longDescription"
              value={this.state.longDescription}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
            >
              <option value="PUBLISH">PUBLISH</option>
              <option value="DRAFT">DRAFT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="Authors">
            <Form.Label>Authors (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="authors"
              value={this.state.authors}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Categories">
            <Form.Label>Categories (comma separated)</Form.Label>
            <Form.Control
              type="text"
              name="categories"
              value={this.state.categories}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Book
          </Button>
        </Form>
      </div>
    );
  }
}
