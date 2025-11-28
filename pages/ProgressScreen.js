import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Icon from '../components/Icon';

const ProgressScreen = () => {
  const weeklyData = [
    { day: 'Seg', hours: 2.5, mood: '😊' },
    { day: 'Ter', hours: 3, mood: '😄' },
    { day: 'Qua', hours: 1.5, mood: '😌' },
    { day: 'Qui', hours: 4, mood: '😊' },
    { day: 'Sex', hours: 2, mood: '😴' },
    { day: 'Sáb', hours: 3.5, mood: '😄' },
    { day: 'Dom', hours: 1, mood: '😌' },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const skills = [
    { name: 'Gestão de Estresse', level: 85, category: 'Bem-estar' },
    { name: 'Mindfulness', level: 75, category: 'Bem-estar' },
    { name: 'Inteligência Artificial', level: 65, category: 'Tecnologia' },
    { name: 'Liderança Empática', level: 70, category: 'Gestão' },
    { name: 'Comunicação Efetiva', level: 80, category: 'Soft Skills' },
  ];

  const achievements = [
    { icon: '🎯', title: 'Mindful Week', desc: '7 dias de práticas de mindfulness' },
    { icon: '🏆', title: 'Equilíbrio Total', desc: 'Completou 5 cursos de bem-estar' },
    { icon: '⚡', title: 'Foco Máximo', desc: '20h de estudo em uma semana' },
    { icon: '🌟', title: 'Bem-estar Contínuo', desc: '30 dias sequenciais de prática' },
  ];

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={GlobalStyles.content}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Seu Progresso</Text>
        <Text style={GlobalStyles.subtitle}>Acompanhe sua evolução e bem-estar</Text>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Horas de Estudo e Bem-estar</Text>
        <View style={styles.chartContainer}>
          {weeklyData.map((data, index) => (
            <View key={data.day} style={styles.chartColumn}>
              <View style={styles.chartBarContainer}>
                <View
                  style={[
                    styles.chartBar,
                    { height: `${(data.hours / maxHours) * 80}%` }
                  ]}
                />
              </View>
              <Text style={styles.chartMood}>{data.mood}</Text>
              <Text style={styles.chartDay}>{data.day}</Text>
              <Text style={styles.chartHours}>{data.hours}h</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.skillsCard}>
        <Text style={styles.skillsTitle}>Suas Habilidades</Text>
        <View style={styles.skillsList}>
          {skills.map((skill, idx) => (
            <View key={idx} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <View>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillCategory}>{skill.category}</Text>
                </View>
                <Text style={styles.skillPercent}>{skill.level}%</Text>
              </View>
              <View style={styles.skillBar}>
                <View
                  style={[
                    styles.skillProgress,
                    { width: `${skill.level}%` }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.achievementsCard}>
        <Text style={styles.achievementsTitle}>Conquistas MindCare</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((ach, idx) => (
            <View key={idx} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{ach.icon}</Text>
              <Text style={styles.achievementTitle}>{ach.title}</Text>
              <Text style={styles.achievementDesc}>{ach.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingHorizontal: 8,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    height: 120,
    width: 20,
    backgroundColor: '#334155',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  chartBar: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    minHeight: 8,
  },
  chartMood: {
    fontSize: 20,
    marginBottom: 4,
  },
  chartDay: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  chartHours: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '600',
  },
  skillsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  skillsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  skillsList: {
    gap: 16,
  },
  skillItem: {
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  skillCategory: {
    fontSize: 12,
    color: '#64748b',
  },
  skillPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  skillBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  achievementsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  achievementsGrid: {
    gap: 12,
  },
  achievementItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default ProgressScreen;
