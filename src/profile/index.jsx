import Header from "@/components/Header";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import MyListing from "./components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Inbox from "./components/Inbox";
function Profile() {
  const location = useLocation();
  const initialTab = location.state?.tab || "my-listing";
  const [tab, setTab] = React.useState(initialTab);
  return (
    <div>
      <Header />
      <div className="page-container">
        <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="my-listing">Ogłoszenia</TabsTrigger>
            <TabsTrigger value="inbox">Wiadomości</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>
          <TabsContent value="my-listing">
            <MyListing />
          </TabsContent>
          <TabsContent value="inbox">
            <Inbox />
          </TabsContent>
          <TabsContent value="profile">Profile Tab</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default Profile;
