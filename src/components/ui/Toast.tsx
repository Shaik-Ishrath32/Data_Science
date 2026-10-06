import { Toaster as HotToaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#131F35',
          color: '#F4F7FF',
          border: '1px solid #3D4A66',
          borderRadius: '8px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#36C995',
            secondary: '#F4F7FF',
          },
        },
        error: {
          iconTheme: {
            primary: '#FF7185',
            secondary: '#F4F7FF',
          },
        },
      }}
    />
  );
}
