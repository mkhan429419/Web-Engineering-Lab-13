import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateBook extends Component {
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const book = {
      title: this.state.title,
      isbn: this.state.isbn,
      pageCount: this.state.pageCount,
      publishedDate: this.state.publishedDate,
      thumbnailUrl: this.state.thumbnailUrl,
      shortDescription: this.state.shortDescription,
      longDescription: this.state.longDescription,
      status: this.state.status,
      authors: this.state.authors.split(","), // Convert string to array
      categories: this.state.categories.split(","), // Convert string to array
    };

    axios
      .post("http://localhost:4000/books/create-book", book)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    this.setState({
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
    });

    this.props.history.push("/book-list");
  }

  render() {
    return (
      <div className="form-wrapper">
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
          {/* Add other form fields similarly */}
          <Button variant="primary" type="submit">
            Create Book
          </Button>
        </Form>
      </div>
    );
  }
}
