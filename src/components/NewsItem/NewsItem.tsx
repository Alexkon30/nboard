import { INewsItem } from '../../types';
import moment from 'moment';
import { useSettingsStore } from '../../store';
import { shallow } from 'zustand/shallow';
import { Link } from 'react-router-dom';

type Props = {
  item: INewsItem;
};

export const NewsItem = ({ item }: Props) => {
  const date = moment(item.publishedAt).format('DD.MM.YY HH:mm')
  const { showTitles, showDescriptions, showDates } =
    useSettingsStore(
      (state) => ({
        showTitles: state.showTitles,
        showDescriptions: state.showDescriptions,
        showDates: state.showDates
      }),
      shallow
    );

  return (
    <tr>
      {showDates && <td>{date}</td>}
      <td>
        {showTitles && <h5>{item.title}</h5>}
        {showDescriptions && <div>{item.description}</div>}
        <Link to={`articles/${item.id}`}>Read more...</Link>
      </td>
    </tr>
  );
};
