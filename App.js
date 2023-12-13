import { StatusBar } from 'expo-status-bar';
import "./api/interceptors"
import SelectRoute from './SelectRoute';
import FlashMessage from "react-native-flash-message";
import { GeneralProvider } from './hooks/General';
import { ModalProvider } from './hooks/Modal';

export default function App() {
  return (
    <GeneralProvider>
      <ModalProvider>
        <SelectRoute />
        <StatusBar translucent={false} backgroundColor="#ffffff" />
        <FlashMessage />
      </ModalProvider>
    </GeneralProvider>
  );
}