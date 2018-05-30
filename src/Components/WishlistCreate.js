import React from 'react';
import {Link} from 'react-router-dom';

class WishlistCreate extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            description: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        });
    }

    render(){
        return(
            <section id="header">
                <div className="section-wrapper-form">
                    <span className="wishlist-title">Create Wishlist</span>
                    <form className="wishlist-form" onSubmit={(e) => this.props.handleWishlistSubmit(e, this.state)}>
                        <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <input
                            className="input"
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                        <div className="button-container">
                            <button className="form-button"><Link to="/wishlists">Create!</Link></button>                            
                        </div>
                    </form>
                </div>
            </section>
        );
    }        
}

export default WishlistCreate;