import "./App.css";
import Layout from "./components/Layout/Layout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Layout />
            </DndProvider>
        </div>
    );
}

export default App;
