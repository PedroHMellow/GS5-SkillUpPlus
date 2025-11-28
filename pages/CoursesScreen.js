import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import GlobalStyles from '../styles/GlobalStyles';

const CoursesScreen = () => {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Saúde Mental', 'IA e Tecnologia', 'Gestão', 'Soft Skills'];

  const allCourses = [
    {
      id: 1,
      title: 'Mindfulness e Meditação',
      category: 'Saúde Mental',
      duration: '8h',
      students: 1543,
      rating: 4.9,
      description: 'Técnicas de mindfulness para reduzir estresse e ansiedade',
      icon: '🧘'
    },
    {
      id: 2,
      title: 'Gestão de Estresse Profissional',
      category: 'Saúde Mental',
      duration: '6h',
      students: 2832,
      rating: 4.8,
      description: 'Estratégias para gerenciar pressão no ambiente de trabalho',
      icon: '💆'
    },
    {
      id: 3,
      title: 'Inteligência Emocional',
      category: 'Soft Skills',
      duration: '10h',
      students: 3241,
      rating: 4.7,
      description: 'Desenvolva sua inteligência emocional para melhores relações',
      icon: '❤️'
    },
    {
      id: 4,
      title: 'IA Generativa Aplicada',
      category: 'IA e Tecnologia',
      duration: '12h',
      students: 4123,
      rating: 4.9,
      description: 'Aprenda a usar IA generativa no seu trabalho',
      icon: '🤖'
    },
    {
      id: 5,
      title: 'Liderança Consciente',
      category: 'Gestão',
      duration: '8h',
      students: 1654,
      rating: 4.8,
      description: 'Liderança com foco em bem-estar da equipe',
      icon: '👔'
    },
    {
      id: 6,
      title: 'Prevenção ao Burnout',
      category: 'Saúde Mental',
      duration: '5h',
      students: 3876,
      rating: 4.9,
      description: 'Identifique e previna a síndrome de burnout',
      icon: '🔥'
    },
  ];

  const filteredCourses = filter === 'Todos'
    ? allCourses
    : allCourses.filter(c => c.category === filter);

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={GlobalStyles.content}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.title}>Catálogo de Cursos</Text>
        <Text style={GlobalStyles.subtitle}>Cuide da mente enquanto se desenvolve</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <View style={styles.filterContainer}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterTab,
                filter === cat && styles.filterTabActive
              ]}
              onPress={() => setFilter(cat)}
            >
              <Text style={[
                styles.filterTabText,
                filter === cat && styles.filterTabTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.coursesGridFull}>
        {filteredCourses.map(course => (
          <TouchableOpacity key={course.id} style={styles.courseCardFull}>
            <View style={styles.courseIconContainer}>
              <Text style={styles.courseIcon}>{course.icon}</Text>
            </View>

            <View style={styles.courseInfo}>
              <View style={styles.courseCategorySmall}>
                <Text style={styles.courseCategoryText}>{course.category}</Text>
              </View>

              <Text style={styles.courseTitleFull}>{course.title}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>

              <View style={styles.courseMetaFull}>
                <View style={styles.courseMetaItem}>
                  <Icon name="Clock" size={16} color="#64748b" />
                  <Text style={styles.courseMetaText}>{course.duration}</Text>
                </View>
                <View style={styles.courseMetaItem}>
                  <Text style={styles.courseRating}>⭐ {course.rating}</Text>
                </View>
              </View>

              <Text style={styles.courseStudents}>
                {course.students.toLocaleString()} alunos
              </Text>
            </View>

            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterScroll: {
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterTabActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterTabText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  coursesGridFull: {
    gap: 12,
  },
  courseCardFull: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  courseIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseIcon: {
    fontSize: 24,
  },
  courseInfo: {
    flex: 1,
  },
  courseCategorySmall: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  courseCategoryText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '600',
  },
  courseTitleFull: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  courseDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
    lineHeight: 20,
  },
  courseMetaFull: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 4,
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
  courseRating: {
    color: '#64748b',
    fontSize: 14,
  },
  courseStudents: {
    fontSize: 12,
    color: '#64748b',
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CoursesScreen;
