import { Route, Routes } from 'react-router-dom';
import { NotFound, PrintMenu, Settings, Wizard } from './pages';

const RouteSwitcher = ({ collections }: any) => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Wizard collections={collections} />} />
            <Route path="/print" element={<PrintMenu collections={collections} doPrint={false} />} />
            <Route path="/settings" element={<Settings />} />

        </Routes>
    );
};

export default RouteSwitcher;