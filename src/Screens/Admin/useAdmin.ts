import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { AdminContextType } from '../../Types/Context';
import { UserDataType, UserStatusType, UserType } from '../../Types/User';


const useAdmin = () => {
    const [users, setUsers] = useState<UserType[]>([]);
  
    useEffect(() => {
        fetchUsers();
    }, []); 

    const fetchUsers = async () => {
        try {
            const querySnapshot = await firestore()
            .collection('user') 
            .get();

            const fetchedUsers: UserType[] = [];

            querySnapshot.forEach((documentSnapshot) => {
                const fetchedUser = documentSnapshot.data() as UserDataType;
                fetchedUsers.push({id: documentSnapshot.id, data: fetchedUser});
            });

            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error querying user documents:', error);
        }
    };

    const updateUserStatus = (userId: string, status: UserStatusType) => {
        // Find the index of the offer with the given ID
        const index = users.findIndex((user) => user.id === userId);
      
        if (index !== -1) {
          // Create a copy of the offer at the found index with updated status and modified date
          const updatedUser: UserType = {
            ...users[index],
            data: {
              ...users[index].data,
              status: status
            },
          };
      
          // Create a new array with the updated offer
          const updatedUsers: UserType[] = [...users];
          updatedUsers[index] = updatedUser;
      
          // Update state with the new array
          setUsers(updatedUsers);
        }
    };

    const contextValue: AdminContextType = {
        users: users, 
        fetchUsers: fetchUsers,
        updateUserStatus: updateUserStatus
    }


    return {
        contextValue
    }
};

export default useAdmin;