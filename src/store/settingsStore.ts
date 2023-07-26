import {create} from 'zustand'

interface SettingsStore {
  showSettings: boolean // настройка доступности редактирования заголовков
  showTitles: boolean
  showDescriptions: boolean
  showDates: boolean
  toggleSettings: () => void
  toggleTitles: () => void
  toggleDescriptions: () => void
  toggleDates: () => void
}

export const useSettingsStore = create<SettingsStore>()(set => ({
  showSettings: false,
  showTitles: true,
  showDescriptions: true,
  showDates: true,
  toggleSettings: () => set(state => ({...state, showSettings: !state.showSettings})),
  toggleTitles: () => set(state => ({...state, showTitles: !state.showTitles})),
  toggleDescriptions: () => set(state => ({...state, showDescriptions: !state.showDescriptions})),
  toggleDates: () => set(state => ({...state, showDates: !state.showDates}))
}))
