import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullscreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.primary[600],
  message = 'Loading...',
  fullscreen = true
}) => {
  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      <ActivityIndicator size={size} color={color} />
      {!!message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  message: {
    marginTop: 12,
    color: colors.gray[600],
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default LoadingSpinner;
