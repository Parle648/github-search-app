import { Octokit } from "octokit";
import { ITEMS_PER_PAGE } from "../const/numbers";

const octokit = new Octokit({
  auth: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`,
});

const asyncSearchRequest = async (q: string, page = 1) => {
  try {
    return await octokit.request("GET /search/repositories", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q,
      per_page: ITEMS_PER_PAGE,
      page,
    });
  } catch (error) {
    console.error(error);
  }
};

export default asyncSearchRequest;
