import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import GlobalStyles from '../styles/GlobalStyles';

const HomeScreen = ({ user }) => {
  const [selectedArea, setSelectedArea] = useState('Saúde Mental');

  const areas = [
    'Saúde Mental',
    'IA e Tecnologia',
    'Gestão de Pessoas',
    'Sustentabilidade',
    'Comunicação'
  ];

  const courses = [
    { id: 1, title: 'Mindfulness no Trabalho', progress: 65, hours: '12h', level: 'Intermediário', category: 'Saúde Mental' },
    { id: 2, title: 'Gestão de Estresse Profissional', progress: 40, hours: '8h', level: 'Básico', category: 'Saúde Mental' },
    { id: 3, title: 'Prevenção de Burnout', progress: 80, hours: '6h', level: 'Básico', category: 'Saúde Mental' },
    { id: 4, title: 'IA Generativa Aplicada', progress: 20, hours: '10h', level: 'Intermediário', category: 'IA e Tecnologia' },
  ];

  const stats = {
    coursesCompleted: 8,
    hoursLearned: 42,
    skillsAcquired: 12,
    weekStreak: 7
  };

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={GlobalStyles.content}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Olá, {user.name}! 👋</Text>
        <Text style={GlobalStyles.subtitle}>Cuide da sua mente enquanto aprende</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#2563eb' }]}>
            <View style={styles.statHeader}>
              <Icon name="Award" size={32} color="#fff" />
              <Icon name="TrendingUp" size={20} color="#bfdbfe" />
            </View>
            <Text style={styles.statNumber}>{stats.coursesCompleted}</Text>
            <Text style={styles.statLabel}>Cursos Concluídos</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#0891b2' }]}>
            <Icon name="Clock" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.hoursLearned}h</Text>
            <Text style={styles.statLabel}>Horas de Estudo</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#7c3aed' }]}>
            <Icon name="Brain" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.skillsAcquired}</Text>
            <Text style={styles.statLabel}>Habilidades</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#059669' }]}>
            <Icon name="Zap" size={32} color="#fff" />
            <Text style={styles.statNumber}>{stats.weekStreak} dias</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Área de Interesse</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pickerScroll}>
          <View style={styles.picker}>
            {areas.map((area) => (
              <TouchableOpacity
                key={area}
                style={[
                  styles.pickerOption,
                  selectedArea === area && styles.pickerOptionSelected
                ]}
                onPress={() => setSelectedArea(area)}
              >
                <Text style={[
                  styles.pickerOptionText,
                  selectedArea === area && styles.pickerOptionTextSelected
                ]}>
                  {area}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seus Cursos em Andamento</Text>
        <View style={styles.coursesGrid}>
          {courses.map(course => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <View style={styles.courseHeader}>
                <View style={[
                  styles.courseCategory,
                  course.category === 'Saúde Mental' && styles.categoryMentalHealth
                ]}>
                  <Text style={styles.courseCategoryText}>{course.category}</Text>
                </View>
                <Icon name="ChevronRight" size={20} color="#64748b" />
              </View>

              <Text style={styles.courseTitle}>{course.title}</Text>

              <View style={styles.courseMeta}>
                <View style={styles.courseMetaItem}>
                  <Icon name="Clock" size={16} color="#64748b" />
                  <Text style={styles.courseMetaText}>{course.hours}</Text>
                </View>
                <Text style={styles.courseLevel}>{course.level}</Text>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progresso</Text>
                  <Text style={styles.progressPercent}>{course.progress}%</Text>
                </View>
                <View style={GlobalStyles.progressBar}>
                  <View
                    style={[
                      GlobalStyles.progressFill,
                      { width: `${course.progress}%` }
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statsScroll: {
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    width: 160,
    padding: 20,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#e2e8f0',
  },
  pickerContainer: {
    marginBottom: 24,
  },
  pickerLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  pickerScroll: {
    marginBottom: 8,
  },
  picker: {
    flexDirection: 'row',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pickerOptionSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  pickerOptionText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  pickerOptionTextSelected: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  coursesGrid: {
    gap: 12,
  },
  courseCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseCategory: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryMentalHealth: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  courseCategoryText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  courseMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseMetaText: {
    color: '#64748b',
    fontSize: 14,
  },
  courseLevel: {
    color: '#64748b',
    fontSize: 14,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  progressPercent: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
