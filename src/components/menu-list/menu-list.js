import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux'; // связываем menuList с redux
import WithRestoService from '../hoc'; // записываем данные из компонента в наш state
import {menuLoaded} from '../../actions';

import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res));
    }

    render() {
        const {menuItems} = this.props;

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return <MenuListItem key={menuItem.id} menuItem={menuItem} />
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return { // получили данные из state
        menuItems: state.menu
    }
}

const mapDispatchToProps = {
    menuLoaded
};


export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(MenuList));