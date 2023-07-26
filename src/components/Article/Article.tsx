import moment from 'moment';
import { INewsItem } from '../../types';
import classes from './Article.module.scss'

type Props = {
  article: INewsItem;
};

export const Article = ({ article }: Props) => {
  return (
    <div className={classes.article}>
      <div className={classes.title}>{article.title}</div>
      <div className={classes.content}>{article.content}</div>
      <div className={classes.footer}>
        <span>{moment(article.publishedAt).format('DD.MM.YYYY')}</span>
        <span>{article.author}</span>
      </div>
    </div>
  );
};
