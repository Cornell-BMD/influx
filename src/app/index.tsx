import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, isDoctor: isAdmin } = useAuth();

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  // if (!isDoctor) {
  //   return <Redirect href={'/patientView'} />;
  // }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/sign-up"} asChild>
        <Button text="Create New Account" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Log In" />
      </Link>
      <Link href={"/(patientView)"} asChild>
        <Button text="(for devs) patient view" />
      </Link>
      <Link href={"/(doctorView)"} asChild>
        <Button text="(for devs) doctor view" />
      </Link>

      {/* <Button onPress={() => supabase.auth.signOut()} text="Sign out" /> */}
    </View>
  );
};

export default index;

// // screens/login/index.tsx
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Link } from 'expo-router';

// const LoginScreen = () => {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push('/verification/LoginScreen');
//   };

//   const handleSignUp = () => {
//     router.push('/verification/SignUpScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Login" onPress={handleLogin} />
//       <Button title="SignUp" onPress={handleSignUp} />
//       <Link href="/patientView">Navigate to PatientView</Link>
//       <Link href="/doctorView">Navigate to DoctorView</Link>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 32,
//     marginBottom: 20,
//   },
// });

// export default LoginScreen;
