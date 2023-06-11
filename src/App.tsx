import "./App.css";
import Age from "./components/Age";
import DateForm from "./components/DateForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <main className="container">
        <DateForm />
        <Age />
      </main>
      <Footer />
    </div>
  );
}

export default App;
