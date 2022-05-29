import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
  users: any[];
  currentUser: string | null;
  token: string | null;

  setToken: (token: string) => void;
  setUsers: (users: any[]) => void;
  setCurrentUser: (userId: string, token: string) => void;
  clearCurrentUser: () => void;
};

const useUserStore = create<UserStore>(set => ({
  users: [],
  currentUser: null,
  token: null,

  setToken: (token: string) => set(state => ({...state, token})),
  setUsers: (users: any[]) => {
    AsyncStorage.setItem('users', JSON.stringify(users));
    set(state => ({...state, users}));
  },
  setCurrentUser: (userId: string, token: string) => {
    set(state => ({...state, currentUser: userId, token}));
  },
  clearCurrentUser: () => {
    set(state => ({...state, currentUser: null, token: null}));
  },
}));

export default useUserStore;
