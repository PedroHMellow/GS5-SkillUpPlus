import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Modal, ScrollView, Text, Dimensions } from 'react-native';
import storage from './utils/storage';
import Icon from './components/Icon';
import MindCareLogo from './components/Logo';
import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import CoursesScreen from './pages/CoursesScreen';
import ProgressScreen from './pages/ProgressScreen';
import AssessmentScreen from './pages/AssessmentScreen';
import ProfileScreen from './pages/ProfileScreen';

const { width } = Dimensions.get('window');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const savedEmail = storage.getItem('userEmail');
    const savedName = storage.getItem('userName');
    if (savedEmail && savedName) {
      setUser({ email: savedEmail, name: savedName });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    storage.removeItem('userEmail');
    storage.removeItem('userName');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentScreen('home');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'home', label: 'Início', icon: 'Home' },
    { id: 'courses', label: 'Cursos', icon: 'BookOpen' },
    { id: 'progress', label: 'Progresso', icon: 'BarChart3' },
    { id: 'assessment', label: 'Autoavaliação', icon: 'Target' },
    { id: 'profile', label: 'Perfil', icon: 'User' },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen user={user} />;
      case 'courses':
        return <CoursesScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'assessment':
        return <AssessmentScreen />;
      case 'profile':
        return <ProfileScreen user={user} onLogout={handleLogout} />;
      default:
        return <HomeScreen user={user} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Icon name="Menu" size={24} color="#fff" />
        </TouchableOpacity>
        <MindCareLogo size="small" />
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.mainContent}>
        {renderScreen()}
      </View>

      <View style={styles.bottomNav}>
        {navItems.slice(0, 4).map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.bottomNavItem,
              currentScreen === item.id && styles.bottomNavItemActive
            ]}
            onPress={() => setCurrentScreen(item.id)}
          >
            <Icon
              name={item.icon}
              size={20}
              color={currentScreen === item.id ? '#3b82f6' : '#64748b'}
            />
            <Text style={[
              styles.bottomNavText,
              currentScreen === item.id && styles.bottomNavTextActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={drawerOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <MindCareLogo />
              <TouchableOpacity onPress={() => setDrawerOpen(false)}>
                <Icon name="X" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.drawerContent}>
              {navItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.drawerItem,
                    currentScreen === item.id && styles.drawerItemActive
                  ]}
                  onPress={() => {
                    setCurrentScreen(item.id);
                    setDrawerOpen(false);
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={20}
                    color={currentScreen === item.id ? '#fff' : '#64748b'}
                  />
                  <Text style={[
                    styles.drawerItemText,
                    currentScreen === item.id && styles.drawerItemTextActive
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.drawerLogout}
              onPress={handleLogout}
            >
              <Icon name="LogOut" size={20} color="#ef4444" />
              <Text style={styles.drawerLogoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  mainContent: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  topBarSpacer: {
    width: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingBottom: 8,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  bottomNavText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNavTextActive: {
    color: '#3b82f6',
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#1e293b',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  drawerContent: {
    flex: 1,
    padding: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  drawerItemActive: {
    backgroundColor: '#3b82f6',
  },
  drawerItemText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  drawerItemTextActive: {
    color: '#fff',
  },
  drawerLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  drawerLogoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

registerRootComponent(App);
