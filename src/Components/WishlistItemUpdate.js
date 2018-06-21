import React from 'react';

class WishlistItemUpdate extends React.Component {
    constructor(){
      super();
      this.id = null;
      this.state = {
        book_title: '',
        book_author: '',
        book_publication: '',
        wishlist_id: null,
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
      this.state.wishlist_id = this.props.match.match.params.wishlistId;        
      this.id = this.props.match.match.params.wishlistItemId;
      return(
        <section id="header">
          <div className="section-wrapper-form">
            <span className="wishlistItem-title">Create Wishlist Item</span>
            <form className="wishlistItem-form" onSubmit={(e) => this.props.handleWishlistItemUpdate(e, this.state, this.id)}>
              <input
                className="input"
                type="text"
                name="book_title"
                placeholder="Title"
                value={this.state.book_title}
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="text"
                name="book_author"
                placeholder="Author"
                value={this.state.book_author}
                onChange={this.handleChange}
              />
              <input
                className="input"
                type="text"
                name="book_publication"
                placeholder="Publishing Company"
                value={this.state.book_publication}
                onChange={this.handleChange}
              />
              <div className="button-container">
                <button className="form-button">Create WishItem!</button>                            
              </div>
            </form>
          </div>
        </section>
      );
    }        
}

export default WishlistItemUpdate;