import React, { SetStateAction } from 'react';
export interface ColumnsProps {
  title: string;
  dataIndex: string;
  key: string;
  checked?: boolean;
  render?: (data:string) => React.JSX.Element;
}

export interface ArticleData {
  title: string;
  publishedAt: string;
  description: string;
  id: string;
}

export interface AppContextProps {
  columns:ColumnsProps[];
  setColumns: React.Dispatch<SetStateAction<ColumnsProps[]>>;
  data: ArticleData[];
  setData: React.Dispatch<SetStateAction<ArticleData[]>>;
  filter: Record<string, string>;
  setFilter:React.Dispatch<SetStateAction<Record<string, string>>>;
  filteredData: ArticleData[];
}

export interface ArticleApi {
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  urlToImage: string;
  url: string;
}

export interface NewsTableProps {
  data: ArticleData[] | [];
}