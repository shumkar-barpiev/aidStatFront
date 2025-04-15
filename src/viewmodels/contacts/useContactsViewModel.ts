import { useEffect } from "react";
import { useContactsStore } from "@/stores/contacts/contacts.ts";

const UseContactsViewModel = () => {
  const contactsStore = useContactsStore();

  useEffect(() => {
    contactsStore.fetchContacts();
  }, []);

  return {};
};

export default UseContactsViewModel;
