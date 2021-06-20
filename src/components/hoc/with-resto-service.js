import React from 'react';
import RestoServiceContext from '../resto-service-context';
// сервис принимает какой-то другой компонент
const WithRestoService = () => (Wrapped) => { // обозвали Wrapped
    return (props) => { // в него передаются пропсы
        return ( // рендерим такую структуру, где прячем consumer
            <RestoServiceContext.Consumer>
                {
                    (RestoService) => {
                        return <Wrapped {...props} RestoService={RestoService} />
                    }
                }
            </RestoServiceContext.Consumer>
        )
    }
};

export default WithRestoService;