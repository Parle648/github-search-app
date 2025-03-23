import { InputAdornment, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { Octokit } from "octokit";
import { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import CardsList from "./components/CardsList";
import { Repo } from "./RepoCard";

const octokit = new Octokit({
  auth: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`,
});

interface Card extends Repo {
  id: number;
}

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const asyncSearchRequest = async (q: string, page = 1) => {
    try {
      const response = await octokit.request("GET /search/repositories", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        q,
        per_page: 12,
        page,
      });
      setCards(response.data.items as Card[]);
      setNumberOfPages(Math.round(response.data.total_count / 12));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const value = e.target.value;

    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);
      setSearchString(value);
      asyncSearchRequest(value);
    }, 2000);
  };

  useEffect(() => {
    asyncSearchRequest("");
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onChange={handleChange}
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
          onChange={(_: React.ChangeEvent<unknown>, page: number) => {
            setIsLoading(true);
            asyncSearchRequest(searchString, page);
          }}
        />
      </div>
    </>
  );
}

export default App;
