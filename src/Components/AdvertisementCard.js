import React from 'react';
import placeholder from '../images/placeholder.png'

class AdvertisementCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      (this.props.type === "feed") ? 
        <div id={this.props.adv.id} className='card-adv'>
          <img src={placeholder} alt='Imagem do livro anunciado' className="card-adv__book-image" />
          <div className='card-adv__book-info col'>
            <h2 className='title'>{this.props.adv.book_title}</h2>
            <p className='author'> <b>Autor:</b> {this.props.adv.book_author}</p>
            <p className='publication'> <b>Editora:</b> {this.props.adv.book_publication}</p>
            <p className='comment'> <b>Comentário do Usuário:</b> {this.props.adv.comment}</p>
          </div>
          <div className='card-adv__user-info'>
            <p className='created-at'> <b>Criado às:</b> {this.props.adv.created_at} </p>
            <p className='username'> <b>Por:</b> {this.props.adv.user.username}</p>
            <button className="btn btn-blue">Ofertar</button>
          </div>
        </div> 
      :
      <div id={this.props.adv.id} className='card-adv'>
        <div className='card-adv__book-info row'>
          <h2 className='title'>{this.props.adv.book_title}</h2>
          <p className='author'> <b>Autor:</b> {this.props.adv.book_author}</p>
          <p className='publication'> <b>Editora:</b> {this.props.adv.book_publication}</p>
          <p className='comment'> <b>Comentário:</b> {this.props.adv.comment}</p>
        </div>
        <div className='card-adv__user-info'>
          <p className='created-at'> <b>Criado às:</b> {this.props.adv.created_at} </p>
          <p className='status'> <b>Status:</b> {this.props.adv.status} </p>
          <button className="btn btn-blue">Editar</button>
        </div>
      </div> 
    )
  };
}

export default AdvertisementCard;