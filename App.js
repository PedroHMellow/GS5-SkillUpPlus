import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal,
  StatusBar,
  Dimensions
} from 'react-native';

import { 
  Menu, 
  X, 
  User, 
  BookOpen, 
  BarChart3, 
  Award, 
  Home, 
  LogOut, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Brain, 
  Heart, 
  Zap, 
  Target 
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// ==================== STORAGE SIMULATOR ====================
const storage = {
  data: {},
  getItem: (key) => storage.data[key] || null,
  setItem: (key, value) => { storage.data[key] = value; },
  removeItem: (key) => { delete storage.data[key]; }
};

// ==================== ICON COMPONENT ====================
const Icon = ({ name, size = 24, color = '#000', ...props }) => {
  const icons = {
    Menu, X, User, BookOpen, BarChart3, Award, Home, LogOut, ChevronRight,
    CheckCircle, Clock, TrendingUp, Brain, Heart, Zap, Target
  };
  
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent size={size} color={color} {...props} /> : null;
};

// ==================== MIND CARE LOGO COMPONENT ====================
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

// ==================== LOGIN SCREEN ====================
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#64748b"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#64748b"
            secureTextEntry
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
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

// ==================== HOME SCREEN ====================
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {user.name}! 👋</Text>
        <Text style={styles.subtitle}>Cuide da sua mente enquanto aprende</Text>
      </View>

      {/* Stats Cards */}
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

      {/* Area Picker */}
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

      {/* Courses */}
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
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill,
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

// ==================== COURSES SCREEN ====================
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo de Cursos</Text>
        <Text style={styles.subtitle}>Cuide da mente enquanto se desenvolve</Text>
      </View>

      {/* Filter Tabs */}
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

      {/* Courses Grid */}
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

// ==================== PROGRESS SCREEN ====================
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Seu Progresso</Text>
        <Text style={styles.subtitle}>Acompanhe sua evolução e bem-estar</Text>
      </View>

      {/* Weekly Chart */}
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

      {/* Skills Progress */}
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

      {/* Achievements */}
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

// ==================== ASSESSMENT SCREEN ====================
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
      <ScrollView style={styles.container} contentContainerStyle={styles.assessmentContent}>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.assessmentContent}>
      <View style={styles.assessmentHeader}>
        <View style={styles.progressHeader}>
          <Text style={styles.assessmentTitle}>Autoavaliação de Bem-estar</Text>
          <Text style={styles.questionCount}>
            {currentQuestion + 1} de {questions.length}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
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

// ==================== PROFILE SCREEN ====================
const ProfileScreen = ({ user, onLogout }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.profileContent}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Cursos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156h</Text>
            <Text style={styles.statLabel}>Estudadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Certificados</Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Configurações</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Editar Perfil</Text>
          <Icon name="ChevronRight" size={20} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Preferências de Notificação</Text>
          <Icon name="ChevronRight" size={20} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Privacidade e Dados</Text>
          <Icon name="ChevronRight" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Icon name="LogOut" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// ==================== MAIN APP + NAV ====================
export default function App() {
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
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Icon name="Menu" size={24} color="#fff" />
        </TouchableOpacity>
        <MindCareLogo size="small" />
        <View style={styles.topBarSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
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

      {/* Drawer */}
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

// ==================== STYLES ====================
const styles = StyleSheet.create({
  // App Container
  appContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  mainContent: {
    flex: 1,
  },
  
  // Top Bar
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

  // Bottom Navigation
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

  // Drawer
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

  // Logo Styles
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

  // Login Screen
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#f87171',
    fontSize: 12,
    marginTop: 4,
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

  // Common Container Styles
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },

  // Home Screen Styles
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
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },

  // Courses Screen Styles
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

  // Progress Screen Styles
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

  // Assessment Screen Styles
  assessmentContent: {
    padding: 16,
    flexGrow: 1,
  },
  assessmentHeader: {
    marginBottom: 24,
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

  // Profile Screen Styles
  profileContent: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#64748b',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  statItem: {
    alignItems: 'center',
  },

  settingsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
