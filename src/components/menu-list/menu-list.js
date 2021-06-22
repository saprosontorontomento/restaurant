import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux'; // связываем menuList с redux
import WithRestoService from '../hoc'; // записываем данные из компонента в наш state
import { menuLoaded, menuRequested, menuError, addedToCart } from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(error => this.props.menuError())

        }

    render() {
        const {menuItems, loading, error, addedToCart} = this.props;

        if (error) {
            return <Error/>
        }

        if (loading) {
            return <Spinner/>
        }

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem 
                                key={menuItem.id} 
                                menuItem={menuItem}
                                onAddToCart={() => addedToCart(menuItem.id)} />
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return { // получили данные из state
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};


export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(MenuList));