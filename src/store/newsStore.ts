import { create } from 'zustand';
import { INewsItem, Nullable } from '../types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const apiKey = '06a67e6f3c9d48cb9b2b18b3162f03f1';

interface NewsStore {
  currentArticle: Nullable<INewsItem>;
  news: INewsItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  setCurrentArticle: (article: INewsItem) => void;
  fetchNews: () => void;
  getItemById: (id: string) => INewsItem | undefined
  setError: (message: string) => void
  clearError: () => void
}

export const useNewsStore = create<NewsStore>()((set, get) => ({
  news: [],
  isLoading: false,
  isError: false,
  errorMessage: 'Error on data fetching',
  currentArticle: null,
  setCurrentArticle: (article: INewsItem) =>
    set((state) => ({ ...state, currentArticle: article })),
  fetchNews: async () => {
    set((state) => ({ ...state, isLoading: true }));
    setTimeout(() => {
      axios
        .get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey
          }
        })
        .then((response) => {
          if (response.data.status === 'ok') {
            const articles = response.data.articles as INewsItem[];
            articles.forEach((item) => (item.id = uuidv4()));
            set((state) => ({ ...state, news: articles }));
          }
        })
        .catch(() => {
          set((state) => ({ ...state, isError: true, errorMessage: 'Error on data fetching' }));
        })
        .finally(() => {
          set((state) => ({ ...state, isLoading: false }));
        });
    }, 2000);
  },
  getItemById: (id: string) => {
    return get().news.find(elem => elem.id === id)
  },
  setError: (message: string) => 
    set(state => ({...state, isError: true, errorMessage: message})),
  clearError: () => set(state => ({...state, isError: false, errorMessage: ''}))
}));
