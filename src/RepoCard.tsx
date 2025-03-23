import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";

export interface Repo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  return (
    <Card sx={{ maxWidth: 250, m: 2, p: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={repo.owner.avatar_url}
        alt={repo.owner.login}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {repo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {repo.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Language: {repo.language || "N/A"}
        </Typography>
        <Typography display="flex" alignItems="center" mt={1}>
          <StarIcon fontSize="small" sx={{ mr: 0.5 }} /> {repo.stargazers_count}
          <ForkRightIcon fontSize="small" sx={{ ml: 2, mr: 0.5 }} />{" "}
          {repo.forks_count}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={repo.html_url}
          target="_blank"
          variant="contained"
        >
          View Repo
        </Button>
      </CardActions>
    </Card>
  );
};

export default RepoCard;
