import React from 'react';
import DeliveryDetails from './DeliveryDetailsComponent';
import ShippingDetails from './ShippingDetailsComponent';

var BookStore = React.createClass({
    getInitialState() {
        return ({currentStep: 1, formValues: {}, cartTimeout: 60 * 1});
    },

    updateFormData(formData) {
        var formValues = Object.assign({}, this.state.formValues, formData);
        var nextStep = this.state.currentStep + 1;
        this.setState({currentStep: nextStep, formValues: formValues});
    },

		updateCartTimeout(timeout){
       this.setState({cartTimeout: timeout});
		},

		alertCartTimeout(){
       this.setState({currentStep: 10});
		},

    render() {
        switch (this.state.currentStep) {
            case 1:
                return <BookList updateFormData={this.updateFormData}/>;
            case 2:
                return <ShippingDetails updateFormData={this.updateFormData}
																				cartTimeout={this.state.cartTimeout}
																				updateCartTimeout={this.updateCartTimeout}
																				alertCartTimeout={this.alertCartTimeout}
																				/>;
            case 3:
                return <DeliveryDetails updateFormData={this.updateFormData}
																				cartTimeout={this.state.cartTimeout}
																				updateCartTimeout={this.updateCartTimeout}
																				alertCartTimeout={this.alertCartTimeout}
																				/>;
            case 4:
                return <Confirmation data={this.state.formValues} updateFormData={this.updateFormData}/>;
            case 5:
                return <Success data={this.state.formValues}/>;
						case 10:
       			 /* Handle the case of Cart timeout */
           			return <div><h2>Your cart timed out, Please try again!</h2></div>;
            default:
                return <BookList updateFormData={this.updateFormData}/>;

        }
    }
});

var BookList = React.createClass({

    getInitialState() {
        return ({
            books: [
                {
                    id: 1,
                    name: 'Zero to One',
                    author: 'Peter Thiel'
                }, {
                    id: 2,
                    name: 'Monk who sold his Ferrari',
                    author: 'Robin Sharma'
                }, {
                    id: 3,
                    name: 'Wings of Fire',
                    author: 'A.P.J. Abdul Kalam'
                }
            ],
            selectedBooks: []
        })
    },

    _renderBook(book) {
        return (
            <div key={book.id} className="checkbox">
                <label>
                    <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks}/> {book.name}
                    -- {book.author}
                </label>
            </div>
        );

    },
    render() {
        var errorMessage = this._renderError();
        return (
            <div>
                <h1>Chose Book from store</h1>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    {this.state.books.map((book) => {
                        return this._renderBook(book);
                    })}
                    <input type="submit" className="btn btn-success"/>
                </form>
            </div>
        );
    },

    handleSelectedBooks(event) {
        var selectedBooks = this.state.selectedBooks;
        var index = selectedBooks.indexOf(event.target.value);
        console.log(event.target.value);
        if (event.target.checked) {
            if (index === -1) {
                selectedBooks.push(event.target.value);
            } else {
                selectedBooks.splice(index, 1);
            }
            this.setState({selectedBooks: selectedBooks});
        }

    },

    _renderError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            );
        }
    },

    handleSubmit(event) {
        console.log("sel " + this.state.selectedBooks.length);
        event.preventDefault();
        if (this.state.selectedBooks.length === 0) {
            this.setState({error: 'Please choose at least one book to continue'});
        } else {
            this.setState({error: false});
            this.props.updateFormData({selectedBooks: this.state.selectedBooks});
        }
    }

});

var Confirmation = React.createClass({

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.props.data);
    },

    render() {
        return (
            <div>
                <h1>Are you sure you want to submit the data?</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <strong>Full Name</strong>
                        : {this.props.data.fullName}
                    </div><br/>
                    <div>
                        <strong>Contact Number</strong>
                        : {this.props.data.contactNumber}
                        ￼</div><br/>
                    <div>
                        <strong>Shipping Address</strong>
                        : {this.props.data.shippingAddress}
                    </div><br/>
                    <div>
                        <strong>Selected books</strong>
                        : {this.props.data.selectedBooks.join(", ")}
                    </div><br/>
                    <button className="btn btn-success">
                        Place order
                    </button>
                </form>
            </div>
        );
    }
});

var Success = React.createClass({
    render() {
        var numberOfDays = "1 to 2 ";
        if (this.props.data.deliveryOption === 'Normal') {
            numberOfDays = "3 to 4 ";
        }
        return (
            <div>
                <h2>
                    Thank you for shopping with us {this.props.data.fullName}.
                </h2>
                <h4>
                    You will soon get {this.props.data.selectedBooks.join(", ")}
                    at {this.props.data.shippingAddress}
                    in approrximately {numberOfDays}
                    days.
                </h4>
            </div>
        );
    }
});

export default BookStore;
