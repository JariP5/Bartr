import { View } from "@gluestack-ui/themed";
import React from "react";
import { AdminContext } from "../../Context/Admin";
import AdminTopTab from '../../Navigation/TopTab/Admin';
import RenderContentBasedOnContext from "../BasedOn/Context";
import useAdmin from "./useAdmin";


function Admin() {
    const {
      contextValue
    } = useAdmin();
  
    return(
      <AdminContext.Provider value={contextValue}>
        <RenderContentBasedOnContext
          content={AdminContent}
          contextComponent={AdminContext}
        />
      </AdminContext.Provider>
    );
}
  
export function AdminContent() {
    return (
        <View flex={1}>
            <AdminTopTab />
        </View>
    );  
}

export default Admin;