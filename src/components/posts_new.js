import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;

        const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

        return (
            <div className={className}>
                <label htmlFor="title">{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit (values) {
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button className="btn btn-primary" type="submit">Submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(values);
    const errors = {};

    // if (!Object.keys(values).length)
    // {
    //     return errors;
    // }

    // Validate the inputs from 'values'

    if (!values.title || !values.title.trim().length) {
        errors.title = "Enter a title."
    }
    // if (!values.title.length < 3) {
    //     errors.title = "Title must be at least 3 characters."
    // }
    if (!values.content || !values.content.trim().length) {
        errors.content = "Enter some Content please."
    }
    if (!values.categories || !values.categories.trim().length) {
        errors.categories = "Enter some Categories."
    }

    // If errors is empty, the form is fine to submit,
    // If errors has *any* properties, redux form assumes form is invalid.

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);
