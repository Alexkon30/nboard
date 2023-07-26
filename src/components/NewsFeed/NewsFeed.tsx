import { useMemo, useState } from 'react';
import { NewsItem } from '..';
import { useNewsStore, useSettingsStore } from '../../store';
import { OrderBy, Nullable, SearchMode } from '../../types';
import SortDownIcon from '@rsuite/icons/SortDown';
import SortUpIcon from '@rsuite/icons/SortUp';
import SearchIcon from '@rsuite/icons/Search';
import { Input, InputGroup, Loader, Message } from 'rsuite';
import classes from './NewsFeed.module.scss';
import CloseIcon from '@rsuite/icons/Close';
import { shallow } from 'zustand/shallow';


export const NewsFeed = () => {
  const {news, isLoading, isError, errorMessage, clearError} = useNewsStore((state) => ({
    news: state.news,
    isLoading: state.isLoading,
    isError: state.isError,
    errorMessage: state.errorMessage,
    clearError: state.clearError
  }), shallow);
  const showDates = useSettingsStore((state) => state.showDates);
  const [mode, setMode] = useState<SearchMode>('default');
  const [orderBy, setOrderBy] = useState<Nullable<OrderBy>>(null);
  const [sortBy, setSortBy] = useState<string>('');

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSortBy((e.target as HTMLInputElement).value);
  };

  const showSearchInput = () => {
    setMode('search');
  };

  const hideSearchInput = () => {
    setMode('default');
    setSortBy('');
  };

  const filteredNews = useMemo(() => {
    let filter = [...news];

    if (orderBy !== null) {
      switch (orderBy) {
        case 'asc':
          filter.sort((a, b) => {
            return new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1;
          });
          break;
        case 'desc':
          filter.sort((a, b) => {
            return new Date(a.publishedAt) > new Date(b.publishedAt) ? 1 : -1;
          });
          break;
        default:
          break;
      }
    }

    if (sortBy !== '') {
      filter = filter.filter((item) =>
        item.title.toLowerCase().includes(sortBy.toLowerCase())
      );
    }

    return filter;
  }, [news, orderBy, sortBy]);

  const toggleOrderBy = () => {
    setOrderBy((prev) => (prev === (null || 'desc') ? 'asc' : 'desc'));
  };

  const onClose = () => {
    clearError()
  }

  if (isLoading) {
    return <div className={classes.loader}>
      <Loader size='md'/>
    </div>
  }

  if (isError) {
    return <Message type="error" closable onClose={onClose}>{errorMessage}</Message>
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          {showDates && (
            <th onClick={toggleOrderBy} className={classes.order}>
              <span>Published at</span>
              {(orderBy === null || orderBy === 'asc') && (
                <SortUpIcon height='1.5em' width='1.5em' />
              )}
              {orderBy === 'desc' && (
                <SortDownIcon height='1.5em' width='1.5em' />
              )}
            </th>
          )}
          <th>
            {mode === 'default' ? (
              <>
                <span className={classes.title}>Articles</span>
                <span className={classes.search}>
                  <SearchIcon
                    height='1.5em'
                    width='1.5em'
                    onClick={showSearchInput}
                  />
                </span>
              </>
            ) : (
              <>
                <InputGroup inside>
                  <Input
                    placeholder='looking for..'
                    onPressEnter={handleEnter}
                  />
                  <InputGroup.Button onClick={hideSearchInput}>
                    <CloseIcon />
                  </InputGroup.Button>
                </InputGroup>
              </>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredNews.map((item) => (
          <NewsItem item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};
