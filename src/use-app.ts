import { useRef, useState } from "react";
import asyncSearchRequest from "./api/github-api";
import { ITEMS_PER_PAGE } from "./const/numbers";
import { Card } from "./models/props";

const useApp = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const value = e.target.value;

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setSearchString(value);
      try {
        const response = await asyncSearchRequest(value);
        setCards(response?.data.items as Card[]);
        setNumberOfPages(
          Math.round(
            response?.data.total_count
              ? response.data.total_count / ITEMS_PER_PAGE
              : 1
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setIsLoading(true);
    setSearchString(searchString);
    try {
      const response = await asyncSearchRequest(searchString, page);
      setCards(response?.data.items as Card[]);
      setNumberOfPages(
        Math.round(
          response?.data.total_count
            ? response.data.total_count / ITEMS_PER_PAGE
            : 1
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cards,
    numberOfPages,
    isLoading,
    handleSearch,
    handlePageChange,
  };
};

export default useApp;
