import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />   {/* ✅ Now inside Router */}
      <AppRoutes />
    </>
  );
}

export default App;