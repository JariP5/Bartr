import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserDataType, UserType } from '../Types/User';

export type UserContextType = {
    user: UserType | undefined;
    logoutUser: () => void;
    updateUser: (userId: string) => void;
    fetchUser: (userId: string) => void;
}

export const UserContext = createContext<UserContextType>({
    user: undefined,
    logoutUser: () => {},
    updateUser: () => {},
    fetchUser: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    checkLoginStatusAndFetchUser();
  }, []);

  const checkLoginStatusAndFetchUser = async () => {
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        
        // Check if the user token is present to determine if the user is logged in
        if (userToken) {
          fetchUser(userToken);
        }
    } catch (error) {
      console.error('Error retrieving favorites from AsyncStorage:', error);
    }
  };

  const fetchUser = async (userId: string) => {
    try {
        const userDoc = await firestore().collection('user').doc(userId).get()
        if (userDoc.exists) {
            const userData = userDoc.data() as UserDataType;
            setUser({ id: userId, data: userData});
        } else {
            console.log('Document does not exist');
        }
    } catch (error) {
        console.error('Error querying user documents:', error);
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(undefined);
  };

  const updateUser = async () => {
    
  };

  return (
    <UserContext.Provider value={{ user, logoutUser, updateUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
