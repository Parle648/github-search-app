import { InputAdornment, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import Loader from "./components/Loader";
import CardsList from "./components/CardsList";
import useApp from "./use-app";

function App() {
  const { cards, numberOfPages, isLoading, handleSearch, handlePageChange } =
    useApp();

  return (
    <>
      {isLoading && <Loader />}
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <CardsList cards={cards} />
      <div className="flex justify-center">
        <Pagination
          count={numberOfPages}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default App;
