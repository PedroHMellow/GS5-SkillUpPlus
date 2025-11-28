import React from 'react';
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

const Icon = ({ name, size = 24, color = '#000', ...props }) => {
  const icons = {
    Menu, X, User, BookOpen, BarChart3, Award, Home, LogOut, ChevronRight,
    CheckCircle, Clock, TrendingUp, Brain, Heart, Zap, Target
  };

  const IconComponent = icons[name];
  return IconComponent ? <IconComponent size={size} color={color} {...props} /> : null;
};

export default Icon;