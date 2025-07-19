import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TowingRequest } from '../types';
import { colors } from '../styles/colors';
import StatusBadge from './StatusBadge';

interface RequestCardProps {
  request: TowingRequest;
  onPress: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyBorderColor = () => {
    const now = new Date();
    const requestTime = new Date(request.created_at);
    const diffInHours = (now.getTime() - requestTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours > 2) return colors.red[500];
    if (diffInHours > 1) return colors.orange[500];
    return colors.blue[500];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { borderLeftColor: getUrgencyBorderColor() }]}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.customerName}>{request.customer_name}</Text>
          <Text style={styles.requestId}>Request #{request.id}</Text>
        </View>
        <StatusBadge status={request.status} />
      </View>

      {/* Location */}
      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Feather name="map-pin" size={16} color={colors.gray[700]} style={styles.icon} />
          <Text style={styles.location} numberOfLines={2}>
            {request.location}
          </Text>
        </View>
      </View>

      {/* Note */}
      {request.note && (
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Feather name="edit-3" size={16} color={colors.gray[700]} style={styles.icon} />
            <Text style={styles.note} numberOfLines={2}>
              {request.note}
            </Text>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Feather name="clock" size={16} color={colors.gray[500]} style={styles.icon} />
          <Text style={styles.timestamp}>{formatDate(request.created_at)}</Text>
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.viewDetails}>View Details</Text>
          <MaterialIcons name="arrow-forward-ios" size={14} color={colors.primary[600]} style={{ marginLeft: 6 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[900],
  },
  requestId: {
    fontSize: 13,
    color: colors.gray[500],
    marginTop: 2,
  },
  section: {
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  location: {
    flex: 1,
    fontSize: 15,
    color: colors.gray[800],
    lineHeight: 20,
  },
  note: {
    flex: 1,
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 13,
    color: colors.gray[500],
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    fontSize: 14,
    color: colors.primary[600],
    fontWeight: '500',
  },
});

export default RequestCard;
