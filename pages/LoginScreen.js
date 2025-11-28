import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import storage from '../utils/storage';
import Icon from '../components/Icon';
import MindCareLogo from '../components/Logo';
import GlobalStyles from '../styles/GlobalStyles';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedEmail = storage.getItem('savedEmail');
    const savedPassword = storage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      if (rememberMe) {
        storage.setItem('savedEmail', email);
        storage.setItem('savedPassword', password);
      } else {
        storage.removeItem('savedEmail');
        storage.removeItem('savedPassword');
      }
      storage.setItem('userEmail', email);
      storage.setItem('userName', email.split('@')[0]);
      onLogin({ email, name: email.split('@')[0] });
    }
  };

  return (
    <ScrollView style={styles.loginContainer} contentContainerStyle={styles.loginContent}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.loginHeader}>
        <MindCareLogo />
        <Text style={styles.loginSubtitle}>Requalificação com foco em bem-estar</Text>
      </View>

      <View style={styles.loginForm}>
        <View style={GlobalStyles.inputContainer}>
          <Text style={GlobalStyles.inputLabel}>Email</Text>
          <TextInput
            style={GlobalStyles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={GlobalStyles.errorText}>{errors.email}</Text>}
        </View>

        <View style={GlobalStyles.inputContainer}>
          <Text style={GlobalStyles.inputLabel}>Senha</Text>
          <TextInput
            style={GlobalStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry
          />
          {errors.password && <Text style={GlobalStyles.errorText}>{errors.password}</Text>}
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Icon name="CheckCircle" size={16} color="#3b82f6" />}
          </View>
          <Text style={styles.checkboxLabel}>Lembrar meus dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>
            Não tem conta? <Text style={styles.createAccountHighlight}>Criar agora</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loginContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  loginForm: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#475569',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#475569',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#3b82f6',
  },
  checkboxLabel: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButton: {
    alignItems: 'center',
  },
  createAccountText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  createAccountHighlight: {
    color: '#60a5fa',
  },
});

export default LoginScreen;
