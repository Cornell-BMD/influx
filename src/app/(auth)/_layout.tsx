import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  //We need check if doctor or patient and route automatically to that page
  if (session) {
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}