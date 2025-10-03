import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ---------- Dashboard Screen ----------
function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>IoT Dashboard</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Living Room Thermostat */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Thermostat')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Living Room Thermostat</Text>
            <Icon name="thermometer-outline" size={20} color="#ccc" />
          </View>
          <Text style={styles.mainValue}>21°C</Text>
          <Text style={styles.subText}>Humidity: 45%</Text>
        </TouchableOpacity>

        {/* Kitchen Lights */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('KitchenLights')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Kitchen Lights</Text>
            <Icon name="bulb-outline" size={20} color="#ccc" />
          </View>
          <Text style={styles.mainValue}>On</Text>
          <Text style={styles.subText}>Brightness: 80%</Text>
        </TouchableOpacity>

        {/* Security Camera */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('SecurityCamera')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Security Camera</Text>
            <Icon name="videocam-outline" size={20} color="#ccc" />
          </View>
          <Text style={styles.mainValue}>Online</Text>
          <Text style={styles.subText}>Live Feed</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ---------- Detail Screens ----------
function ThermostatScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Living Room Thermostat</Text>
      <Text style={styles.detailText}>Current Temperature: 21°C</Text>
      <Text style={styles.detailText}>Humidity: 45%</Text>
    </View>
  );
}

function KitchenLightsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Kitchen Lights</Text>
      <Text style={styles.detailText}>Status: On</Text>
      <Text style={styles.detailText}>Brightness: 80%</Text>
    </View>
  );
}

function SecurityCameraScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Security Camera</Text>
      <Text style={styles.detailText}>Status: Online</Text>
      <Text style={styles.detailText}>Mode: Live Feed Active</Text>
    </View>
  );
}

// ---------- Profile Screen ----------
function ProfileScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.profileScroll}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {/* User Details */}
      <Text style={styles.profileName}>Madhura</Text>
      <Text style={styles.profileEmail}>madhura@20</Text>

      {/* Extra Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>+91 9876543210</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoValue}>123, Green Street, Sadalga</Text>
      </View>

      {/* Settings Section */}
      <Text style={styles.sectionHeader}>Settings</Text>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Icon name="lock-closed-outline" size={22} color="#38bdf8" />
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Icon name="notifications-outline" size={22} color="#38bdf8" />
        <Text style={styles.settingText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('Logout')}
      >
        <Icon name="log-out-outline" size={22} color="#f87171" />
        <Text style={[styles.settingText, { color: '#f87171' }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------- Profile Sub Screens ----------
function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    alert('Password updated successfully!');
  };

  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Old Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.updateButtonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Notifications</Text>
      <Text style={styles.detailText}>
        Manage your notification preferences here.
      </Text>
    </View>
  );
}

function LogoutScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.detailTitle}>Logout</Text>
      <Text style={styles.detailText}>You have been logged out.</Text>
    </View>
  );
}

// ---------- Stack Navigator for Home Tab ----------
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'IoT Dashboard' }}
      />
      <Stack.Screen
        name="Thermostat"
        component={ThermostatScreen}
        options={{ title: 'Thermostat Details' }}
      />
      <Stack.Screen
        name="KitchenLights"
        component={KitchenLightsScreen}
        options={{ title: 'Kitchen Lights Details' }}
      />
      <Stack.Screen
        name="SecurityCamera"
        component={SecurityCameraScreen}
        options={{ title: 'Security Camera Details' }}
      />
    </Stack.Navigator>
  );
}

// ---------- Stack Navigator for Profile Tab ----------
function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1e293b' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'My Profile' }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ title: 'Logout' }}
      />
    </Stack.Navigator>
  );
}

// ---------- Main App with Bottom Tabs ----------
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#1e293b', borderTopWidth: 0 },
          tabBarActiveTintColor: '#38bdf8',
          tabBarInactiveTintColor: '#94a3b8',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  center: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  detailTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailText: {
    color: '#38bdf8',
    fontSize: 18,
    marginTop: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileEmail: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#1e293b',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  profileScroll: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  sectionHeader: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#38bdf8',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
