import Header from "./Header";
import Footer from "./Footer";
import MainLayer from "./MainLayer";

function MainFrame() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <MainLayer />
            <Footer />
        </div>
    )
}

export default MainFrame;