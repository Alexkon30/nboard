import ToolsIcon from '@rsuite/icons/Tools';
import { IconButton, ButtonToolbar, Toggle } from 'rsuite';
import { useSettingsStore } from '../../store';
import { shallow } from 'zustand/shallow';
import classes from './Toolbar.module.scss';


export function Toolbar() {
  const { showSettings, showTitles, showDescriptions, showDates, toggleSettings, toggleTitles, toggleDescriptions, toggleDates } =
    useSettingsStore(
      (state) => ({
        showSettings: state.showSettings,
        showTitles: state.showTitles,
        showDescriptions: state.showDescriptions,
        showDates: state.showDates,
        toggleSettings: state.toggleSettings,
        toggleTitles: state.toggleTitles,
        toggleDescriptions: state.toggleDescriptions,
        toggleDates: state.toggleDates
      }),
      shallow
    );

  return (
    <>
      <ButtonToolbar className={classes.toolbar}>
        <IconButton icon={<ToolsIcon />} onClick={toggleSettings} />
        {showSettings && (
          <>
            <label>Dates: </label>
            <Toggle onClick={toggleDates} checked={showDates}/>
            <label>Titles: </label>
            <Toggle onClick={toggleTitles} checked={showTitles}/>
            <label>Descriptions: </label>
            <Toggle onClick={toggleDescriptions} checked={showDescriptions}/>
          </>
        )}
      </ButtonToolbar>
    </>
  );
}
