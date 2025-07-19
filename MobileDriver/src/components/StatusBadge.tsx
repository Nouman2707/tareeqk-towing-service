import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';

interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: colors.yellow[800],
          backgroundColor: colors.yellow[100],
          borderColor: colors.yellow[200],
          text: 'Pending',
          icon: <Feather name="clock" size={14} color={colors.yellow[800]} />,
        };
      case 'accepted':
        return {
          color: colors.blue[800],
          backgroundColor: colors.blue[100],
          borderColor: colors.blue[200],
          text: 'Accepted',
          icon: <Feather name="check-circle" size={14} color={colors.blue[800]} />,
        };
      case 'in_progress':
        return {
          color: colors.orange[800],
          backgroundColor: colors.orange[100],
          borderColor: colors.orange[200],
          text: 'In Progress',
          icon: <Feather name="refresh-ccw" size={14} color={colors.orange[800]} />,
        };
      case 'completed':
        return {
          color: colors.green[800],
          backgroundColor: colors.green[100],
          borderColor: colors.green[200],
          text: 'Completed',
          icon: <Feather name="check-circle" size={14} color={colors.green[800]} />,
        };
      case 'cancelled':
        return {
          color: colors.red[800],
          backgroundColor: colors.red[100],
          borderColor: colors.red[200],
          text: 'Cancelled',
          icon: <MaterialCommunityIcons name="close-circle" size={14} color={colors.red[800]} />,
        };
      default:
        return {
          color: colors.gray[800],
          backgroundColor: colors.gray[100],
          borderColor: colors.gray[200],
          text: status,
          icon: <Feather name="info" size={14} color={colors.gray[800]} />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
      ]}
    >
      <View style={styles.icon}>{config.icon}</View>
      <Text style={[styles.text, { color: config.color }]}>{config.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
    marginTop: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatusBadge;
