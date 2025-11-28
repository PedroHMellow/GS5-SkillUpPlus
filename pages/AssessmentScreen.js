import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import GlobalStyles from '../styles/GlobalStyles';

const AssessmentScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Como você avalia seu nível de estresse no trabalho atualmente?',
      options: ['Muito baixo', 'Baixo', 'Moderado', 'Alto', 'Muito alto'],
      category: 'bem-estar'
    },
    {
      id: 2,
      question: 'Com que frequência você pratica atividades para relaxar?',
      options: ['Diariamente', 'Algumas vezes na semana', 'Raramente', 'Quase nunca', 'Nunca'],
      category: 'bem-estar'
    },
    {
      id: 3,
      question: 'Qual seu interesse em aprender sobre mindfulness e meditação?',
      options: ['Muito interessado', 'Interessado', 'Neutro', 'Pouco interessado', 'Nada interessado'],
      category: 'aprendizado'
    },
    {
      id: 4,
      question: 'Como você avalia seu equilíbrio entre vida pessoal e profissional?',
      options: ['Excelente', 'Bom', 'Regular', 'Ruim', 'Muito ruim'],
      category: 'bem-estar'
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendations = () => {
    const recs = [];

    if (answers[0] === 'Alto' || answers[0] === 'Muito alto') {
      recs.push({
        title: 'Gestão de Estresse',
        priority: 'alta',
        icon: '💆',
        description: 'Técnicas comprovadas para reduzir o estresse no trabalho'
      });
    }

    if (answers[1] === 'Raramente' || answers[1] === 'Quase nunca' || answers[1] === 'Nunca') {
      recs.push({
        title: 'Mindfulness Diário',
        priority: 'alta',
        icon: '🧘',
        description: 'Pratique mindfulness todos os dias para melhorar seu bem-estar'
      });
    }

    if (answers[2] === 'Muito interessado' || answers[2] === 'Interessado') {
      recs.push({
        title: 'Meditação Guiada',
        priority: 'média',
        icon: '😌',
        description: 'Aprenda técnicas de meditação para acalmar a mente'
      });
    }

    if (answers[3] === 'Ruim' || answers[3] === 'Muito ruim') {
      recs.push({
        title: 'Equilíbrio Vida-Trabalho',
        priority: 'alta',
        icon: '⚖️',
        description: 'Estratégias para melhorar seu equilíbrio pessoal e profissional'
      });
    }

    if (recs.length === 0) {
      recs.push(
        {
          title: 'Mindfulness Básico',
          priority: 'média',
          icon: '🧠',
          description: 'Fundamentos do mindfulness para iniciantes'
        },
        {
          title: 'Autocuidado Digital',
          priority: 'média',
          icon: '📱',
          description: 'Como usar a tecnologia a favor do seu bem-estar'
        }
      );
    }

    return recs;
  };

  if (showResults) {
    const recommendations = getRecommendations();
    return (
      <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.assessmentContent}>
        <View style={styles.resultsHeader}>
          <View style={styles.successIcon}>
            <Icon name="CheckCircle" size={48} color="#10b981" />
          </View>
          <Text style={styles.resultsTitle}>Autoavaliação Completa!</Text>
          <Text style={styles.resultsSubtitle}>Recomendações personalizadas para você</Text>
        </View>

        <View style={styles.recommendationsList}>
          {recommendations.map((rec, idx) => (
            <View key={idx} style={styles.recommendationCard}>
              <View style={styles.recommendationHeader}>
                <Text style={styles.recommendationIcon}>{rec.icon}</Text>
                <View style={styles.recommendationText}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <Text style={styles.recommendationDesc}>{rec.description}</Text>
                </View>
                <View style={[
                  styles.priorityBadge,
                  rec.priority === 'alta' ? styles.priorityHigh : styles.priorityMedium
                ]}>
                  <Text style={styles.priorityText}>
                    {rec.priority === 'alta' ? 'Alta' : 'Média'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewCourseButton}>
                <Text style={styles.viewCourseText}>Ver Curso</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
          }}
        >
          <Text style={styles.retryButtonText}>Refazer Avaliação</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.assessmentContent}>
      <View style={styles.assessmentHeader}>
        <View style={styles.progressHeader}>
          <Text style={styles.assessmentTitle}>Autoavaliação de Bem-estar</Text>
          <Text style={styles.questionCount}>
            {currentQuestion + 1} de {questions.length}
          </Text>
        </View>
        <View style={GlobalStyles.progressBar}>
          <View
            style={[
              GlobalStyles.progressFill,
              { width: `${progress}%` }
            ]}
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.optionsList}>
          {question.options.map((option, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  assessmentContent: {
    padding: 16,
    flexGrow: 1,
  },
  assessmentHeader: {
    marginBottom: 24,
  },
  progressHeader: {
    marginBottom: 12,
  },
  assessmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  questionCount: {
    color: '#64748b',
    fontSize: 14,
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsList: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#475569',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  recommendationsList: {
    gap: 16,
    marginBottom: 32,
  },
  recommendationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  recommendationDesc: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  priorityHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  priorityMedium: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewCourseButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  viewCourseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#374151',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AssessmentScreen;
