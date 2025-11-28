import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';

const MindCareLogo = ({ size = 'large' }) => {
  const isSmall = size === 'small';

  return (
    <View style={isSmall ? styles.logoSmall : styles.logoContainer}>
      <View style={isSmall ? styles.logoIconSmall : styles.logoIcon}>
        <Icon name="Brain" size={isSmall ? 24 : 32} color="#3b82f6" />
      </View>
      <View style={isSmall ? styles.logoTextSmall : styles.logoText}>
        <Text style={isSmall ? styles.logoTitleSmall : styles.logoTitle}>SkillUpPlus +230</Text>
        {!isSmall && (
          <Text style={styles.logoSubtitle}>Cuidando da Mente que Inova</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  logoSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  logoSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIconSmall: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTextSmall: {
    alignItems: 'flex-start',
  },
  logoTitleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MindCareLogo;