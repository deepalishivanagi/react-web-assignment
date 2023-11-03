import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Components/HomeScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducer/Reducer';

const store = createStore(rootReducer);

function AppRouter() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                </Routes>
            </Router>
        </Provider>
    )
}
export default AppRouter;